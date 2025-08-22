import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertUserSchema, InsertUser } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { authService } from '@/lib/auth';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import {
  Mail,
  Chrome,
  Apple,
  Crown,
  Building,
  UserCheck,
  Info,
  Loader2,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  Globe,
  Users,
  CheckCircle
} from 'lucide-react';

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
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const [businessType, setBusinessType] = useState<'individual' | 'startup' | 'smb'>('individual');
  const [selectedTier, setSelectedTier] = useState<'tier1' | 'tier2' | 'tier3'>('tier2');

  // OAuth configuration
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-google-client-id';
  const GOOGLE_REDIRECT_URI =
    import.meta.env.VITE_GOOGLE_REDIRECT_URI || window.location.origin + '/auth/google/callback';
  const APPLE_CLIENT_ID = import.meta.env.VITE_APPLE_CLIENT_ID || 'your-apple-client-id';
  const APPLE_REDIRECT_URI =
    import.meta.env.VITE_APPLE_REDIRECT_URI || window.location.origin + '/auth/apple/callback';

  // Check if OAuth providers are properly configured
  const isGoogleConfigured = GOOGLE_CLIENT_ID !== 'your-google-client-id';
  const isAppleConfigured = APPLE_CLIENT_ID !== 'your-apple-client-id';

  const form = useForm<InsertUser>({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      fullName: '',
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
      appleScript.src =
        'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
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
      const scripts = document.querySelectorAll(
        'script[src*="google.com/gsi/client"], script[src*="appleid.cdn-apple.com"]',
      );
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
          localStorage.setItem(
            'biz_activated_modules',
            JSON.stringify(['Compliance', 'Branding', 'CRM']),
          );

          toast({
            title: 'Google Signup Successful',
            description: `Welcome to BizHub, ${googleUserData.fullName}!`,
          });

          onSuccess();
          window.location.href = '/setup';
        }
      } catch (error: any) {
        toast({
          title: 'Google Signup Failed',
          description: error.message || 'Failed to sign up with Google',
          variant: 'destructive',
        });
      } finally {
        setGoogleLoading(false);
      }
    }
  };

  // Handle Google Auth with backend
  const handleGoogleAuth = async (googleUserData: any) => {
    try {
      const response = await apiRequest('POST', '/api/auth/google', {
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
        throw new Error('Google authentication failed');
      }
    } catch (error) {
      throw error;
    }
  };

  // Handle Apple Sign In
  const handleAppleSignIn = async () => {
    if (!window.AppleID) {
      toast({
        title: 'Apple Sign-In Not Available',
        description: 'Apple Sign-In is not properly configured',
        variant: 'destructive',
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
          fullName:
            `${response.user?.name?.firstName || ''} ${response.user?.name?.lastName || ''}`.trim() ||
            'Apple User',
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
          localStorage.setItem(
            'biz_activated_modules',
            JSON.stringify(['Compliance', 'Branding', 'CRM']),
          );

          toast({
            title: 'Apple Signup Successful',
            description: `Welcome to BizHub, ${appleUserData.fullName}!`,
          });

          onSuccess();
          window.location.href = '/setup';
        }
      }
    } catch (error: any) {
      toast({
        title: 'Apple Signup Failed',
        description: error.message || 'Failed to sign up with Apple',
        variant: 'destructive',
      });
    } finally {
      setAppleLoading(false);
    }
  };

  // Handle Apple Auth with backend
  const handleAppleAuth = async (appleUserData: any) => {
    try {
      const response = await apiRequest('POST', '/api/auth/apple', {
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
        throw new Error('Apple authentication failed');
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
        localStorage.setItem(
          'biz_activated_modules',
          JSON.stringify(['Compliance', 'Branding', 'CRM']),
        );
        onSuccess();
        window.location.href = '/setup';
      }, 1000);
    } catch (error: any) {
      toast({
        title: `${provider === 'google' ? 'Google' : 'Apple'} Signup Failed`,
        description:
          error.message || `Failed to sign up with ${provider === 'google' ? 'Google' : 'Apple'}`,
        variant: 'destructive',
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

      const response = await apiRequest('POST', '/api/auth/register', formData);
      const authResponse = await response.json();

      authService.setAuth(authResponse);
      window.dispatchEvent(new Event('auth-change'));

      // persist selected business type and tier for onboarding
      localStorage.setItem('biz_business_type', businessType);
      localStorage.setItem('biz_business_tier', selectedTier);
      // mark recommended modules to pre-activate later if not already present
      if (!localStorage.getItem('biz_activated_modules')) {
        localStorage.setItem(
          'biz_activated_modules',
          JSON.stringify(['Compliance', 'Branding', 'CRM']),
        );
      }

      toast({
        title: 'Registration Successful',
        description: `Welcome to BizHub, ${authResponse.user.fullName}!`,
      });

      onSuccess();
      // Navigate to setup flow
      window.location.href = '/setup';
    } catch (error: any) {
      toast({
        title: 'Registration Failed',
        description: error.message || 'Failed to create account. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showEmailForm) {
    return (
      <div className="relative w-full max-w-md mx-auto">
        {/* Background gradient blur effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-3xl"></div>

        <Card className="relative w-full bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
          {/* Header with gradient */}
          <CardHeader className="relative p-8 pb-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Globe className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl font-black mb-2">Create Account</CardTitle>
              <p className="text-blue-100 font-medium">Complete your {selectedTier === 'tier1' ? 'admin' : selectedTier === 'tier2' ? 'organization' : 'employee'} account</p>
            </div>
          </CardHeader>

          <CardContent className="p-8 pt-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name field */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    {...form.register('fullName')}
                    className="h-12 pl-12 pr-4 bg-gray-50/50 border-2 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-xl transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your full name"
                    data-testid="input-fullname"
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {form.formState.errors.fullName && (
                  <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    {form.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    {...form.register('email')}
                    className="h-12 pl-12 pr-4 bg-gray-50/50 border-2 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-xl transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email"
                    data-testid="input-email"
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Username field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Username
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    {...form.register('username')}
                    className="h-12 pl-12 pr-4 bg-gray-50/50 border-2 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-xl transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Choose a username"
                    data-testid="input-username"
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {form.formState.errors.username && (
                  <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    {form.formState.errors.username.message}
                  </p>
                )}
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...form.register('password')}
                    className="h-12 pl-12 pr-12 bg-gray-50/50 border-2 border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 rounded-xl transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Create a password"
                    data-testid="input-password"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500 font-medium flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Selected Role Display */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">Selected Role</Label>
                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    {selectedTier === 'tier1' && <Crown className="w-5 h-5 text-purple-600" />}
                    {selectedTier === 'tier2' && <Building className="w-5 h-5 text-blue-600" />}
                    {selectedTier === 'tier3' && <UserCheck className="w-5 h-5 text-green-600" />}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {selectedTier === 'tier1' ? 'Platform Administrator' : selectedTier === 'tier2' ? 'Organization' : 'Employee'}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedTier === 'tier1' ? 'Full platform control and management' : selectedTier === 'tier2' ? 'Business organization management' : 'Individual employee access'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Type Selection for Tier 2 */}
              {selectedTier === 'tier2' && (
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">Type of Business</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { key: 'individual', label: 'Individual' },
                        { key: 'startup', label: 'Startup' },
                        { key: 'smb', label: 'SMB' },
                      ] as const
                    ).map(opt => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setBusinessType(opt.key)}
                        className={`text-sm rounded-xl border-2 px-3 py-2 transition-all duration-200 ${
                          businessType === opt.key
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                        data-testid={`business-type-${opt.key}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 group"
                disabled={isLoading}
                data-testid="button-submit"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Create Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </Button>
            </form>

            {/* Back button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowEmailForm(false)}
                className="text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                ← Back to role selection
              </button>
              <p className="text-xs text-gray-400 mt-2">
                Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> or click outside to close
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Background gradient blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-indigo-500/20 rounded-3xl blur-3xl"></div>

      <Card className="relative w-full bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
        {/* Header with gradient */}
        <CardHeader className="relative p-8 pb-6 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-black mb-2">Join BizHub</CardTitle>
            <p className="text-blue-100 font-medium">Choose your role to get started</p>
          </div>
        </CardHeader>

        <CardContent className="p-8 pt-6 space-y-6">
          {/* OAuth Setup Notice */}
          {(!isGoogleConfigured || !isAppleConfigured) && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  To enable OAuth sign-in, create a{' '}
                  <code className="bg-blue-100 px-1 rounded text-xs">.env</code> file in the client directory
                  with your OAuth Client IDs using VITE_ prefix.
                </p>
              </div>
            </div>
          )}

          {/* Role Selection Cards */}
          <div className="space-y-4">
            {/* Tier 1 - Main Admin */}
            <div
              className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
                selectedTier === 'tier1'
                  ? 'border-purple-500 bg-purple-50 shadow-lg'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
              }`}
              onClick={() => setSelectedTier('tier1')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  selectedTier === 'tier1' ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <Crown className={`w-7 h-7 ${selectedTier === 'tier1' ? 'text-purple-600' : 'text-gray-500'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Platform Administrator</h3>
                  <p className="text-sm text-gray-600 mb-2">Full platform control and management</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Info className="w-3 h-3" />
                    Manage entire platform, users, and organizations
                  </div>
                </div>
                {selectedTier === 'tier1' && (
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                )}
              </div>
            </div>

            {/* Tier 2 - Organization */}
            <div
              className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
                selectedTier === 'tier2'
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
              onClick={() => setSelectedTier('tier2')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  selectedTier === 'tier2' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Building className={`w-7 h-7 ${selectedTier === 'tier2' ? 'text-blue-600' : 'text-gray-500'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Organization</h3>
                  <p className="text-sm text-gray-600 mb-2">Business organization management</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Info className="w-3 h-3" />
                    Manage your business, employees, and services
                  </div>
                </div>
                {selectedTier === 'tier2' && (
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                )}
              </div>
            </div>

            {/* Tier 3 - Employee */}
            <div
              className={`border-2 rounded-2xl p-6 cursor-pointer transition-all duration-200 ${
                selectedTier === 'tier3'
                  ? 'border-green-500 bg-green-50 shadow-lg'
                  : 'border-gray-200 hover:border-green-300 hover:bg-green-50/50'
              }`}
              onClick={() => setSelectedTier('tier3')}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                  selectedTier === 'tier3' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <UserCheck className={`w-7 h-7 ${selectedTier === 'tier3' ? 'text-green-600' : 'text-gray-500'}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Employee</h3>
                  <p className="text-sm text-gray-600 mb-2">Individual employee access</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Info className="w-3 h-3" />
                    Access assigned modules and personal workspace
                  </div>
                </div>
                {selectedTier === 'tier3' && (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={() => setShowEmailForm(true)}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 group"
              disabled={!selectedTier}
            >
              <div className="flex items-center gap-2">
                Continue with Email
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Button>

            {/* OAuth options */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500 font-semibold">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                {!isGoogleConfigured ? (
                  <Button
                    variant="outline"
                    className="h-12 w-full border-2 border-gray-200 hover:border-gray-300 rounded-xl"
                    disabled={true}
                    title="Google OAuth not configured. Please set REACT_APP_GOOGLE_CLIENT_ID in your .env file"
                  >
                    <Chrome className="w-5 h-5 mr-2" />
                    Google (Not Configured)
                  </Button>
                ) : (
                  <>
                    {googleLoading && (
                      <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center z-10">
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
                    className="h-12 w-full border-2 border-gray-200 hover:border-gray-300 rounded-xl"
                    disabled={true}
                    title="Apple Sign-In not configured. Please set VITE_APPLE_CLIENT_ID in your .env file"
                  >
                    <Apple className="w-5 h-5 mr-2" />
                    Apple (Not Configured)
                  </Button>
                ) : (
                  <>
                    {appleLoading && (
                      <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center z-10">
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </div>
                    )}
                    <Button
                      onClick={handleAppleSignIn}
                      disabled={appleLoading || !selectedTier}
                      variant="outline"
                      className="h-12 w-full border-2 border-gray-200 hover:border-gray-300 rounded-xl"
                    >
                      <Apple className="w-5 h-5 mr-2" />
                      {appleLoading ? 'Signing in...' : 'Apple'}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Sign in link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
                data-testid="link-login"
              >
                Sign in here
              </button>
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> or click outside to close
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
