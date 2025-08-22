import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginCredentials } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { authService } from '@/lib/auth';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await apiRequest('POST', '/api/auth/login', data);
      const authResponse = await response.json();

      authService.setAuth(authResponse);
      window.dispatchEvent(new Event('auth-change'));

      toast({
        title: 'Login Successful',
        description: `Welcome back, ${authResponse.user.fullName}!`,
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.message || 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className='w-full max-w-md mx-auto shadow-lg border-2 border-neutral-200'>
      <CardHeader className='bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg'>
        <CardTitle className='text-2xl font-bold text-center'>Login to BizHub</CardTitle>
      </CardHeader>
      <CardContent className='p-6'>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Label htmlFor='username' className='text-neutral-800 font-semibold'>
              Username
            </Label>
            <Input
              id='username'
              {...form.register('username')}
              className='mt-1 border-2 border-neutral-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              data-testid='input-username'
            />
            {form.formState.errors.username && (
              <p className='text-sm text-red-600 mt-1 font-medium'>
                {form.formState.errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor='password' className='text-neutral-800 font-semibold'>
              Password
            </Label>
            <Input
              id='password'
              type='password'
              {...form.register('password')}
              className='mt-1 border-2 border-neutral-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              data-testid='input-password'
            />
            {form.formState.errors.password && (
              <p className='text-sm text-red-600 mt-1 font-medium'>
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg shadow-md'
            disabled={isLoading}
            data-testid='button-submit'
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-neutral-700'>
            Don't have an account?{' '}
            <button
              onClick={onSwitchToRegister}
              className='text-blue-600 hover:text-blue-800 font-semibold underline'
              data-testid='link-register'
            >
              Sign up here
            </button>
          </p>
        </div>

        <div className='mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg'>
          <p className='text-sm text-blue-800 font-semibold text-center mb-3'>Demo Credentials:</p>
          <div className='space-y-2'>
            <p className='text-sm text-blue-900 font-medium'>
              <strong>Platform Admin:</strong> username: admin, password: admin123
            </p>
            <p className='text-sm text-blue-900 font-medium'>
              <strong>Organization:</strong> username: techcorp, password: techcorp123
            </p>
            <p className='text-sm text-blue-900 font-medium'>
              <strong>Employee:</strong> username: employee, password: employee123
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
