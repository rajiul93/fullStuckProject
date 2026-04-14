'use client';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/hooks/api/api-client';
import { LoginResponse } from '@/type/front/type';

interface LoginCredentials {
  email: string;
  password: string;
}

const loginFn = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const { email, password } = credentials;
  const res = await api.post<LoginResponse>('/api/auth/login', {
    email,
    password,
  });
  return res.data;
};

const useLogin = () => {
  return useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      console.log('Login successful:', data);
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
};

export default useLogin;
