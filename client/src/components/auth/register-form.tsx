import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, InsertUser } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authService } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mail, Chrome, Apple, Crown, Building, UserCheck, Info, Loader2 } from "lucide-react";

// OAuth API TypeScript declarations
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
          renderButton: (element: HTMLElement, config: any) => void;
        };
      };
    };
    AppleID: {
      auth: {
        init: (config: any) => void;
        signIn: () => Promise<any>;
        signOut: () => Promise<void>;
      };
    };
  }
}

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const { toast } = useToast();
  const [businessType, setBusinessType] = useState<"individual" | "startup" | "smb">("individual");
  const [selectedTier, setSelectedTier] = useState<"tier1" | "tier2" | "tier3">("tier2");

    // OAuth configuration
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "your-google-client-id";
  const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI || window.location.origin + "/auth/google/callback";
  const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID || "your-apple-client-id";
  const APPLE_REDIRECT_URI = import.meta.env.VITE_APPLE_REDIRECT_URI || window.location.origin + "/auth/apple/callback";

  // Check if OAuth providers are properly configured
  const isGoogleConfigured = GOOGLE_CLIENT_ID !== "your-google-client-id";
  const isAppleConfigured = APPLE_CLIENT_ID !== "your-apple-client-id";

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
      role: selectedTier,
      tier: selectedTier,
    },
  });

  // Initialize OAuth providers
  useEffect(() => {
    // Initialize Google Auth
    if (isGoogleConfigured) {
      const googleScript = document.createElement('script');
      googleScript.src = 'https://accounts.google.com/gsi/client';
      googleScript.async = true;
      googleScript.defer = true;
      googleScript.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleSignIn,
            auto_select: false,
            cancel_on_tap_outside: true,
            theme: 'outline',
            size: 'large',
            text: 'signin_with',
            shape: 'rectangular',
          });

          // Render the Google Sign-In button
          const buttonElement = document.getElementById('google-signin-button');
          if (buttonElement) {
            window.google.accounts.id.renderButton(buttonElement, {
              theme: 'outline',
              size: 'large',
              text: 'signin_with',
              shape: 'rectangular',
              width: '100%',
            });
          }
        }
      };
      document.head.appendChild(googleScript);
    }

    // Initialize Apple Sign-In
    if (isAppleConfigured) {
      const appleScript = document.createElement('script');
      appleScript.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
      appleScript.async = true;
      appleScript.defer = true;
      appleScript.onload = () => {
        if (window.AppleID) {
          window.AppleID.auth.init({
            clientId: APPLE_CLIENT_ID,
            scope: 'name email',
            redirectURI: APPLE_REDIRECT_URI,
            state: 'origin:web',
            usePopup: true,
          });
        }
      };
      document.head.appendChild(appleScript);
    }

    return () => {
      // Cleanup scripts
      const scripts = document.querySelectorAll('script[src*="google.com/gsi/client"], script[src*="appleid.cdn-apple.com"]');
      scripts.forEach(script => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      });
    };
  }, [selectedTier, isGoogleConfigured, isAppleConfigured]);

  // Handle Google Sign In
  const handleGoogleSignIn = async (response: any) => {
    if (response.credential) {
      setGoogleLoading(true);
      try {
        // Decode JWT token to get user info
        const payload = JSON.parse(atob(response.credential.split('.')[1]));

        // Create user data from Google response
        const googleUserData = {
          email: payload.email,
          fullName: payload.name,
          username: payload.email.split('@')[0], // Use email prefix as username
          role: selectedTier,
          tier: selectedTier,
          googleId: payload.sub,
          avatar: payload.picture,
        };

        // Send to backend for registration/login
        const authResponse = await handleGoogleAuth(googleUserData);

        if (authResponse.success) {
          // Store user data and redirect
          localStorage.setItem('biz_business_type', 'individual');
          localStorage.setItem('biz_business_tier', selectedTier);
          localStorage.setItem('biz_activated_modules', JSON.stringify(["Compliance", "Branding", "CRM"]));

          toast({
            title: "Google Signup Successful",
            description: `Welcome to BizHub, ${googleUserData.fullName}!`,
          });

          onSuccess();
          window.location.href = '/setup';
        }
      } catch (error: any) {
        toast({
          title: "Google Signup Failed",
          description: error.message || "Failed to sign up with Google",
          variant: "destructive",
        });
      } finally {
        setGoogleLoading(false);
      }
    }
  };

  // Handle Google Auth with backend
  const handleGoogleAuth = async (googleUserData: any) => {
    try {
      const response = await apiRequest("POST", "/api/auth/google", {
        googleToken: googleUserData.googleId,
        userData: googleUserData,
        selectedTier: selectedTier,
      });

      if (response.ok) {
        const authResponse = await response.json();
        authService.setAuth(authResponse);
        window.dispatchEvent(new Event('auth-change'));
        return { success: true, data: authResponse };
      } else {
        throw new Error("Google authentication failed");
      }
    } catch (error) {
      throw error;
    }
  };

  // Handle Apple Sign In
  const handleAppleSignIn = async () => {
    if (!window.AppleID) {
      toast({
        title: "Apple Sign-In Not Available",
        description: "Apple Sign-In is not properly configured",
        variant: "destructive",
      });
      return;
    }

    setAppleLoading(true);
    try {
      const response = await window.AppleID.auth.signIn();

      if (response.authorization) {
        // Create user data from Apple response
        const appleUserData = {
          email: response.user?.email || `apple_${Date.now()}@example.com`,
          fullName: `${response.user?.name?.firstName || ''} ${response.user?.name?.lastName || ''}`.trim() || 'Apple User',
          username: response.user?.email?.split('@')[0] || `apple_user_${Date.now()}`,
          role: selectedTier,
          tier: selectedTier,
          appleId: response.user?.sub || response.authorization.code,
          isPrivateEmail: response.user?.email?.includes('privaterelay.appleid.com') || false,
        };

        // Send to backend for registration/login
        const authResponse = await handleAppleAuth(appleUserData);

        if (authResponse.success) {
          // Store user data and redirect
          localStorage.setItem('biz_business_type', 'individual');
          localStorage.setItem('biz_business_tier', selectedTier);
          localStorage.setItem('biz_activated_modules', JSON.stringify(["Compliance", "Branding", "CRM"]));

          toast({
            title: "Apple Signup Successful",
            description: `Welcome to BizHub, ${appleUserData.fullName}!`,
          });

          onSuccess();
          window.location.href = '/setup';
        }
      }
    } catch (error: any) {
      toast({
        title: "Apple Signup Failed",
        description: error.message || "Failed to sign up with Apple",
        variant: "destructive",
      });
    } finally {
      setAppleLoading(false);
    }
  };

  // Handle Apple Auth with backend
  const handleAppleAuth = async (appleUserData: any) => {
    try {
      const response = await apiRequest("POST", "/api/auth/apple", {
        appleToken: appleUserData.appleId,
        userData: appleUserData,
        selectedTier: selectedTier,
      });

      if (response.ok) {
        const authResponse = await response.json();
        authService.setAuth(authResponse);
        window.dispatchEvent(new Event('auth-change'));
        return { success: true, data: authResponse };
      } else {
        throw new Error("Apple authentication failed");
      }
    } catch (error) {
      throw error;
    }
  };



  const handleOAuthCompletion = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    try {
      // Simulate OAuth flow
      toast({
        title: `${provider === 'google' ? 'Google' : 'Apple'} Signup`,
        description: `${provider === 'google' ? 'Google' : 'Apple'} OAuth integration would be implemented here`,
      });
      // For now, simulate success
      setTimeout(() => {
        localStorage.setItem('biz_business_type', 'individual');
        localStorage.setItem('biz_business_tier', selectedTier);
        localStorage.setItem('biz_activated_modules', JSON.stringify(["Compliance", "Branding", "CRM"]));
        onSuccess();
        window.location.href = '/setup';
      }, 1000);
    } catch (error: any) {
      toast({
        title: `${provider === 'google' ? 'Google' : 'Apple'} Signup Failed`,
        description: error.message || `Failed to sign up with ${provider === 'google' ? 'Google' : 'Apple'}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: InsertUser) => {
    setIsLoading(true);
    try {
      // Update the form data with the selected tier
      const formData = {
        ...data,
        role: selectedTier,
        tier: selectedTier,
      };

      const response = await apiRequest("POST", "/api/auth/register", formData);
      const authResponse = await response.json();

      authService.setAuth(authResponse);
      window.dispatchEvent(new Event('auth-change'));

      // persist selected business type and tier for onboarding
      localStorage.setItem('biz_business_type', businessType);
      localStorage.setItem('biz_business_tier', selectedTier);
      // mark recommended modules to pre-activate later if not already present
      if (!localStorage.getItem('biz_activated_modules')) {
        localStorage.setItem('biz_activated_modules', JSON.stringify(["Compliance", "Branding", "CRM"]));
      }

      toast({
        title: "Registration Successful",
        description: `Welcome to BizHub, ${authResponse.user.fullName}!`,
      });

      onSuccess();
      // Navigate to setup flow
      window.location.href = '/setup';
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



  if (showEmailForm) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign up with Email</CardTitle>
          <p className="text-center text-neutral-600">Complete your {selectedTier === "tier1" ? "admin" : selectedTier === "tier2" ? "organization" : "employee"} account</p>
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

            <div>
              <Label>Selected Role</Label>
              <div className="mt-2 p-3 bg-neutral-50 rounded-lg border">
                <div className="flex items-center gap-2">
                  {selectedTier === "tier1" && <Crown className="w-4 h-4 text-purple-600" />}
                  {selectedTier === "tier2" && <Building className="w-4 h-4 text-blue-600" />}
                  {selectedTier === "tier3" && <UserCheck className="w-4 h-4 text-green-600" />}
                  <span className="font-medium">
                    {selectedTier === "tier1" ? "Platform Administrator" :
                     selectedTier === "tier2" ? "Organization" : "Employee"}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 mt-1">
                  {selectedTier === "tier1" ? "Full platform control and management" :
                   selectedTier === "tier2" ? "Business organization management" :
                   "Individual employee access"}
                </p>
              </div>
            </div>

            {selectedTier === "tier2" && (
              <div>
                <Label>Type of Business</Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {([
                    { key: "individual", label: "Individual" },
                    { key: "startup", label: "Startup" },
                    { key: "smb", label: "SMB" },
                  ] as const).map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setBusinessType(opt.key)}
                      className={`text-sm rounded-md border px-3 py-2 transition-colors ${
                        businessType === opt.key
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                      }`}
                      data-testid={`business-type-${opt.key}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
            <button
              onClick={() => setShowEmailForm(false)}
              className="text-sm text-neutral-600 hover:text-neutral-800"
            >
              ← Back to role selection
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Join BizHub</CardTitle>
        <p className="text-center text-neutral-600">Choose your role to get started</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* OAuth Setup Notice */}
        {(!isGoogleConfigured || !isAppleConfigured) && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <Info className="w-4 h-4 inline mr-2" />
              To enable OAuth sign-in, create a <code className="bg-blue-100 px-1 rounded">.env</code> file in the client directory with your OAuth Client IDs using VITE_ prefix.
            </p>
          </div>
        )}

        {/* Tier 1 - Main Admin */}
        <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
          selectedTier === "tier1"
            ? 'border-purple-500 bg-purple-50'
            : 'border-neutral-200 hover:border-purple-300'
        }`} onClick={() => setSelectedTier("tier1")}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-neutral-900">Platform Administrator</h3>
              <p className="text-sm text-neutral-600">Full platform control and management</p>
            </div>
          </div>
          <div className="mt-3 text-xs text-neutral-500">
            <Info className="w-4 h-4 inline mr-1" />
            Manage entire platform, users, and organizations
          </div>
        </div>

        {/* Tier 2 - Organization */}
        <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
          selectedTier === "tier2"
            ? 'border-blue-500 bg-blue-50'
            : 'border-neutral-200 hover:border-blue-300'
        }`} onClick={() => setSelectedTier("tier2")}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-neutral-900">Organization</h3>
              <p className="text-sm text-neutral-600">Business organization management</p>
            </div>
          </div>
          <div className="mt-3 text-xs text-neutral-500">
            <Info className="w-4 h-4 inline mr-1" />
            Manage your business, employees, and services
          </div>
        </div>

        {/* Tier 3 - Employee */}
        <div className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
          selectedTier === "tier3"
            ? 'border-green-500 bg-green-50'
            : 'border-neutral-200 hover:border-green-300'
        }`} onClick={() => setSelectedTier("tier3")}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-neutral-900">Employee</h3>
              <p className="text-sm text-neutral-600">Individual employee access</p>
            </div>
          </div>
          <div className="mt-3 text-xs text-neutral-500">
            <Info className="w-4 h-4 inline mr-1" />
            Access assigned modules and personal workspace
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => setShowEmailForm(true)}
            className="w-full h-12 text-base"
            disabled={!selectedTier}
          >
            Continue with Email
          </Button>

          {/* OAuth options */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-neutral-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              {!isGoogleConfigured ? (
                <Button
                  variant="outline"
                  className="h-12 w-full"
                  disabled={true}
                  title="Google OAuth not configured. Please set REACT_APP_GOOGLE_CLIENT_ID in your .env file"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Google (Not Configured)
                </Button>
              ) : (
                <>
                  {googleLoading && (
                    <div className="absolute inset-0 bg-white/80 rounded-md flex items-center justify-center z-10">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  )}
                  <div
                    id="google-signin-button"
                    className={`h-12 ${!selectedTier ? 'opacity-50 pointer-events-none' : ''}`}
                  />
                </>
              )}
            </div>
            <div className="relative">
              {!isAppleConfigured ? (
                <Button
                  variant="outline"
                  className="h-12 w-full"
                  disabled={true}
                  title="Apple Sign-In not configured. Please set VITE_APPLE_CLIENT_ID in your .env file"
                >
                  <Apple className="w-5 h-5 mr-2" />
                  Apple (Not Configured)
                </Button>
              ) : (
                <>
                  {appleLoading && (
                    <div className="absolute inset-0 bg-white/80 rounded-md flex items-center justify-center z-10">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  )}
                  <Button
                    onClick={handleAppleSignIn}
                    disabled={appleLoading || !selectedTier}
                    variant="outline"
                    className="h-12 w-full"
                  >
                    <Apple className="w-5 h-5 mr-2" />
                    {appleLoading ? "Signing in..." : "Apple"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
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
