'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useLogin from '@/hooks/api/useLogin';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { mutate, isPending } = useLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    mutate(body, {
      onSuccess: () => {
        toast.success('Login successful!');
        reset();
        router.push('/dashboard');
      },
      onError: () => {
        toast.error('Login failed. Please try again.');
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl mx-4 bg-gradient-to-br from-white/20 via-white/3 to-white/8 border border-white/10 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden flex">
        {/* Left side: Branding */}
        <div className="flex-1 p-8 flex flex-col justify-center items-center text-center bg-gradient-to-br from-white/20 to-primary">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/10 mb-4">
            RAJIUL
          </h1>
          <p className="text-lg text-white/80">
            Welcome to our platform. Sign in to access your account and explore
            amazing features.
          </p>
        </div>

        {/* Right side: Form */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold bg-clip-text text-white mb-2">
            Welcome back
          </h2>
          <p className="text-sm text-muted-white/50 mb-6">
            Sign in to your account with email and password.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Enter a valid email',
                  },
                })}
                className="bg-white/5"
              />
              {errors.email && (
                <p className="text-xs text-pink-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' },
                })}
                className="bg-white/5"
              />
              {errors.password && (
                <p className="text-xs text-pink-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-secondary-300 to-primary text-white shadow-lg hover:shadow-xl transition-colors duration-300 ease-in-out"
              disabled={isPending}
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
