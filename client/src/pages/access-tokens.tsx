import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/lib/auth';
import { apiRequest } from '@/lib/queryClient';
import {
  Plus,
  Clock,
  Users,
  Shield,
  Copy,
  Trash2,
  Eye,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { AVAILABLE_MODULES } from '@shared/schema';

interface AccessToken {
  id: string;
  token: string;
  modules: string[];
  permissions: any;
  expiresAt: string;
  usageCount: number;
  maxUsage: number | null;
  description: string | null;
  createdAt: string;
  lastUsedAt: string | null;
  isActive: boolean;
}

export default function AccessTokens() {
  const [tokens, setTokens] = useState<AccessToken[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();
  const user = authService.getUser();

  // Form state
  const [formData, setFormData] = useState({
    userId: '',
    modules: [] as string[],
    expiresAt: '',
    maxUsage: '',
    description: '',
  });

  useEffect(() => {
      if (user && (user.role === 'admin' || user.tier === 'tier1' || user.tier === 'tier2')) {
    fetchTokens();
  }
  }, [user]);

  const fetchTokens = async () => {
    setLoading(true);
    try {
      const response = await apiRequest('GET', '/api/access-tokens');
      const data = await response.json();
      setTokens(data.tokens || []);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch access tokens',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createToken = async () => {
    if (!formData.userId || formData.modules.length === 0 || !formData.expiresAt) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setCreating(true);
    try {
      const response = await apiRequest('POST', '/api/access-tokens', {
        userId: formData.userId,
        modules: formData.modules,
        expiresAt: new Date(formData.expiresAt).toISOString(),
        maxUsage: formData.maxUsage ? parseInt(formData.maxUsage) : undefined,
        description: formData.description || undefined,
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success',
          description: 'Access token created successfully',
        });
        setShowCreateForm(false);
        setFormData({
          userId: '',
          modules: [],
          expiresAt: '',
          maxUsage: '',
          description: '',
        });
        fetchTokens();
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create access token',
        variant: 'destructive',
      });
    } finally {
      setCreating(false);
    }
  };

  const revokeToken = async (tokenId: string) => {
    try {
      await apiRequest('DELETE', `/api/access-tokens/${tokenId}`);
      toast({
        title: 'Success',
        description: 'Access token revoked successfully',
      });
      fetchTokens();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to revoke access token',
        variant: 'destructive',
      });
    }
  };

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    toast({
      title: 'Copied',
      description: 'Access token copied to clipboard',
    });
  };

  const getStatusBadge = (token: AccessToken) => {
    const now = new Date();
    const expiresAt = new Date(token.expiresAt);

    if (!token.isActive) {
      return <Badge variant="destructive">Revoked</Badge>;
    }

    if (now > expiresAt) {
      return <Badge variant="destructive">Expired</Badge>;
    }

    if (token.maxUsage && token.usageCount >= token.maxUsage) {
      return <Badge variant="destructive">Usage Limit Reached</Badge>;
    }

    return <Badge variant="default">Active</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expires = new Date(expiresAt);
    const diff = expires.getTime() - now.getTime();

    if (diff <= 0) return 'Expired';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h remaining`;
    return 'Less than 1h remaining';
  };

  if (!user || (user.role !== 'admin' && user.tier !== 'tier1' && user.tier !== 'tier2')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Token Management</h1>
              <p className="text-gray-600">Create and manage temporary access tokens for users</p>
            </div>
            <Button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Token
            </Button>
          </div>
        </div>

        {/* Create Token Form */}
        {showCreateForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create Access Token
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="userId">User ID</Label>
                  <Input
                    id="userId"
                    value={formData.userId}
                    onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                    placeholder="Enter user ID"
                  />
                </div>
                <div>
                  <Label htmlFor="expiresAt">Expires At</Label>
                  <Input
                    id="expiresAt"
                    type="datetime-local"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label>Modules</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                  {AVAILABLE_MODULES.map((module) => (
                    <label key={module} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.modules.includes(module)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              modules: [...formData.modules, module],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              modules: formData.modules.filter((m) => m !== module),
                            });
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm capitalize">{module.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxUsage">Max Usage (Optional)</Label>
                  <Input
                    id="maxUsage"
                    type="number"
                    value={formData.maxUsage}
                    onChange={(e) => setFormData({ ...formData, maxUsage: e.target.value })}
                    placeholder="Leave empty for unlimited"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Reason for granting access"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={createToken}
                  disabled={creating}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {creating ? 'Creating...' : 'Create Token'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tokens List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading tokens...</p>
            </div>
          ) : tokens.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Access Tokens</h3>
                <p className="text-gray-600 mb-4">Create your first access token to get started.</p>
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Token
                </Button>
              </CardContent>
            </Card>
          ) : (
            tokens.map((token) => (
              <Card key={token.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(token)}
                        <span className="text-sm text-gray-500">
                          Created {formatDate(token.createdAt)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Token</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {token.token.substring(0, 8)}...
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToken(token.token)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">Modules</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {token.modules.map((module) => (
                              <Badge key={module} variant="secondary" className="text-xs">
                                {module.replace('_', ' ')}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">Usage</Label>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-sm">
                              {token.usageCount}
                              {token.maxUsage ? ` / ${token.maxUsage}` : ''}
                            </span>
                            {token.lastUsedAt && (
                              <span className="text-xs text-gray-500">
                                (Last: {formatDate(token.lastUsedAt)})
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">Expires</Label>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span className="text-sm">{getTimeRemaining(token.expiresAt)}</span>
                          </div>
                        </div>
                      </div>

                      {token.description && (
                        <div className="mb-4">
                          <Label className="text-sm font-medium text-gray-700">Description</Label>
                          <p className="text-sm text-gray-600 mt-1">{token.description}</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToken(token.token)}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => revokeToken(token.id)}
                        disabled={!token.isActive}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Revoke
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
