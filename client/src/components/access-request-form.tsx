import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { authService } from '@/lib/auth';
import { apiRequest } from '@/lib/queryClient';
import { 
  Mail, 
  Clock, 
  Shield, 
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { AVAILABLE_MODULES } from '@shared/schema';

interface AccessRequestFormProps {
  onRequestSent?: () => void;
}

export function AccessRequestForm({ onRequestSent }: AccessRequestFormProps) {
  const [formData, setFormData] = useState({
    modules: [] as string[],
    duration: '24', // hours
    reason: '',
    urgency: 'normal',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const user = authService.getUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.modules.length === 0) {
      toast({
        title: 'Validation Error',
        description: 'Please select at least one module',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.reason.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please provide a reason for the access request',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // In a real application, this would send a notification to the admin
      // For now, we'll simulate the request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Request Sent',
        description: 'Your access request has been sent to your administrator',
      });
      
      setFormData({
        modules: [],
        duration: '24',
        reason: '',
        urgency: 'normal',
      });
      
      onRequestSent?.();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to send access request',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleModule = (module: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.includes(module)
        ? prev.modules.filter(m => m !== module)
        : [...prev.modules, module],
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Request Module Access
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-sm font-medium">Select Modules</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
              {AVAILABLE_MODULES.map((module) => (
                <label key={module} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.modules.includes(module)}
                    onChange={() => toggleModule(module)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm capitalize">{module.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration (Hours)</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => setFormData({ ...formData, duration: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="8">8 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                  <SelectItem value="72">3 days</SelectItem>
                  <SelectItem value="168">1 week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="urgency">Urgency</Label>
              <Select
                value={formData.urgency}
                onValueChange={(value) => setFormData({ ...formData, urgency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="reason">Reason for Access</Label>
            <Textarea
              id="reason"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Please explain why you need access to these modules..."
              rows={4}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Request Process</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Your request will be sent to your administrator</li>
                  <li>• They will review and approve/deny your request</li>
                  <li>• You'll receive a notification with the decision</li>
                  <li>• If approved, you'll get an access token to use</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Request
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  modules: [],
                  duration: '24',
                  reason: '',
                  urgency: 'normal',
                });
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
