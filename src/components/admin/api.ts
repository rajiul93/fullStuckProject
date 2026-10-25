export async function adminApi<T = Record<string, unknown>>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: {
      ...(init?.body instanceof FormData
        ? {}
        : { 'Content-Type': 'application/json' }),
      ...init?.headers,
    },
    cache: 'no-store',
  });
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401 && !path.endsWith('/login'))
      window.location.assign('/admin/login');
    throw new Error(data.error || 'Request failed.');
  }
  return data as T;
}
