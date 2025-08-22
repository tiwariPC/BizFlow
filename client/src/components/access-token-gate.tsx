import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Shield, Key, AlertCircle, CheckCircle } from 'lucide-react';

interface AccessTokenGateProps {
  module: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface AccessTokenData {
  id: string;
  modules: string[];
  permissions: any;
  expiresAt: string;
  usageCount: number;
  maxUsage: number | null;
}

export function AccessTokenGate({ module, children, fallback }: AccessTokenGateProps) {
  const [token, setToken] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [accessToken, setAccessToken] = useState<AccessTokenData | null>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const { toast } = useToast();

  const validateToken = async () => {
    if (!token.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an access token',
        variant: 'destructive',
      });
      return;
    }

    setIsValidating(true);
    try {
      const response = await apiRequest('POST', '/api/access-tokens/validate', {
        token: token.trim(),
        module,
      });

      const data = await response.json();

      if (data.success) {
        setAccessToken(data.accessToken);
        setHasAccess(true);
        toast({
          title: 'Access Granted',
          description: `You now have access to ${module.replace('_', ' ')}`,
        });
      } else {
        toast({
          title: 'Access Denied',
          description: 'Invalid or expired access token',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to validate access token',
        variant: 'destructive',
      });
    } finally {
      setIsValidating(false);
    }
  };

  const clearAccess = () => {
    setToken('');
    setAccessToken(null);
    setHasAccess(false);
    toast({
      title: 'Access Cleared',
      description: 'Access token has been cleared',
    });
  };

  if (hasAccess && accessToken) {
    return (
      <div>
        {/* Access Token Info Banner */}
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">
                    Access Granted - {module.replace('_', ' ')}
                  </h3>
                  <p className="text-sm text-green-700">
                    Token expires: {new Date(accessToken.expiresAt).toLocaleString()} |
                    Usage: {accessToken.usageCount}
                    {accessToken.maxUsage ? ` / ${accessToken.maxUsage}` : ''}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={clearAccess}
                className="border-green-300 text-green-700 hover:bg-green-100"
              >
                Clear Access
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Render the protected content */}
        {children}
      </div>
    );
  }

  // Show fallback or default access denied UI
  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-orange-200">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Access Required
            </CardTitle>
            <p className="text-gray-600">
              You need an access token to view the {module.replace('_', ' ')} module
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="access-token" className="text-sm font-medium">
                Access Token
              </Label>
              <div className="flex gap-2">
                <Input
                  id="access-token"
                  type="text"
                  placeholder="Enter your access token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && validateToken()}
                  className="flex-1"
                />
                <Button
                  onClick={validateToken}
                  disabled={isValidating}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isValidating ? 'Validating...' : 'Validate'}
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Key className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">How to get an access token</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Contact your administrator or organization owner</li>
                    <li>• They can create a temporary access token for you</li>
                    <li>• The token will have an expiration date and usage limits</li>
                    <li>• You can use the token to access this module temporarily</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-900 mb-1">Security Notice</h4>
                  <p className="text-sm text-orange-800">
                    Access tokens are temporary and should be kept secure. They will automatically
                    expire based on time or usage limits set by your administrator.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
