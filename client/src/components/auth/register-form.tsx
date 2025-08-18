import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, InsertUser } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authService } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
      role: "customer",
    },
  });

  const onSubmit = async (data: InsertUser) => {
    setIsLoading(true);
    try {
      const response = await apiRequest("POST", "/api/auth/register", data);
      const authResponse = await response.json();
      
      authService.setAuth(authResponse);
      window.dispatchEvent(new Event('auth-change'));
      
      toast({
        title: "Registration Successful",
        description: `Welcome to BizHub, ${authResponse.user.fullName}!`,
      });
      
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Join BizHub</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              {...form.register("fullName")}
              className="mt-1"
              data-testid="input-fullname"
            />
            {form.formState.errors.fullName && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              className="mt-1"
              data-testid="input-email"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          
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
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-neutral-600">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-primary hover:underline"
              data-testid="link-login"
            >
              Sign in here
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
