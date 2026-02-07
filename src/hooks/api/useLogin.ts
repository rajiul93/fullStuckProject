'use client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { publicAPI } from '.';
import { LoginResponse } from '@/type/front/type';

interface LoginCredentials {
  email: string;
  password: string;
}

const loginFn = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const { email, password } = credentials;
  const body = { email, password };

  try {
    const res = await publicAPI.post<LoginResponse>('/api/auth/login', body, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw new Error('Login failed');
  }
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
