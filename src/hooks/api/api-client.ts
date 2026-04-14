import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { config } from '@/config';

const AUTH_PATH_SNIPPETS = ['/api/auth/login', '/api/auth/register'] as const;

function isAuthRoute(url: string): boolean {
  return AUTH_PATH_SNIPPETS.some((s) => url.includes(s));
}

function shouldHandleUnauthorized(url: string): boolean {
  return !isAuthRoute(url);
}

/** These GETs are public; 401 must not trigger refresh + /login redirect (e.g. guest opens media page). */
function isPublicMediaGet(url: string, method: string | undefined): boolean {
  if ((method ?? 'get').toUpperCase() !== 'GET') return false;
  try {
    const pathname = url.includes('://')
      ? new URL(url).pathname
      : url.split('?')[0];
    if (pathname === '/api/media') return true;
    if (/^\/api\/media\/[a-f\d]{24}$/i.test(pathname)) return true;
  } catch {
    /* ignore */
  }
  return false;
}

/** Optional Bearer (e.g. future flows). httpOnly `auth_token` still sent via withCredentials. */
const OPTIONAL_BEARER_KEY = 'accessToken';

function refreshUrl(): string {
  const base = config.api.baseUrl;
  return base ? `${base}/api/auth/refresh` : '/api/auth/refresh';
}

/**
 * Call when you implement `POST /api/auth/refresh` (Set-Cookie).
 * Until then this fails and users are sent to `/login`.
 */
async function refreshSession(): Promise<boolean> {
  try {
    const res = await fetch(refreshUrl(), {
      method: 'POST',
      credentials: 'include',
      headers: { Accept: 'application/json' },
    });
    return res.ok;
  } catch {
    return false;
  }
}

function clearSessionAndRedirect() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(OPTIONAL_BEARER_KEY);
  } catch {
    /* ignore */
  }
  window.location.href = '/login';
}

type QueueItem = {
  resolve: (value: AxiosResponse) => void;
  reject: (error: unknown) => void;
  config: InternalAxiosRequestConfig & { _retry?: boolean };
};

function createApiClient(): AxiosInstance {
  let isRefreshing = false;
  let failedQueue: QueueItem[] = [];

  function processQueue(inst: AxiosInstance, error: unknown) {
    failedQueue.forEach((item) => {
      if (error) {
        item.reject(error);
      } else {
        inst.request(item.config).then(item.resolve).catch(item.reject);
      }
    });
    failedQueue = [];
  }

  const instance = axios.create({
    baseURL: config.api.baseUrl || undefined,
    timeout: 15_000,
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(
    (requestConfig) => {
      if (typeof FormData !== 'undefined' && requestConfig.data instanceof FormData) {
        requestConfig.headers.delete('Content-Type');
      }
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem(OPTIONAL_BEARER_KEY);
        if (token) {
          requestConfig.headers.Authorization = `Bearer ${token}`;
        }
      }
      return requestConfig;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as
        | (InternalAxiosRequestConfig & { _retry?: boolean })
        | undefined;

      if (
        error.response?.status !== 401 ||
        !originalRequest ||
        typeof window === 'undefined'
      ) {
        return Promise.reject(error);
      }

      const url = String(originalRequest.url ?? '');

      if (!shouldHandleUnauthorized(url)) {
        return Promise.reject(error);
      }

      if (isPublicMediaGet(url, originalRequest.method)) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        clearSessionAndRedirect();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const ok = await refreshSession();
        if (!ok) {
          processQueue(instance, error);
          clearSessionAndRedirect();
          return Promise.reject(error);
        }

        processQueue(instance, null);
        return instance.request(originalRequest);
      } catch (refreshError) {
        processQueue(instance, refreshError);
        clearSessionAndRedirect();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );

  return instance;
}

export const api = createApiClient();
