import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginCredentials } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authService } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/auth/login", data);
      const authResponse = await response.json();
      
      authService.setAuth(authResponse);
      window.dispatchEvent(new Event('auth-change'));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${authResponse.user.fullName}!`,
      });
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login to BizHub</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              {...form.register("username")}
              className="mt-1"
              data-testid="input-username"
            />
            {form.formState.errors.username && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...form.register("password")}
              className="mt-1"
              data-testid="input-password"
            />
            {form.formState.errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            data-testid="button-submit"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral-600">
            Don't have an account?{" "}
            <button
              onClick={onSwitchToRegister}
              className="text-primary hover:underline"
              data-testid="link-register"
            >
              Sign up here
            </button>
          </p>
        </div>
        
        <div className="mt-4 p-3 bg-neutral-50 rounded-lg">
          <p className="text-xs text-neutral-600 text-center mb-2">Demo Credentials:</p>
          <p className="text-xs text-neutral-700">
            <strong>Admin:</strong> username: admin, password: admin123
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
