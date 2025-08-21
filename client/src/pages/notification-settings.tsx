import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { notificationService } from "@/lib/notifications";
import {
  Bell,
  AlertTriangle,
  DollarSign,
  TrendingUp,
  Users,
  Settings,
  Save,
  TestTube,
  Clock,
  Mail,
  Smartphone,
  Globe,
  CheckCircle
} from "lucide-react";

interface NotificationPreference {
  type: 'compliance' | 'invoice' | 'campaign' | 'community' | 'system';
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  email: boolean;
  push: boolean;
  inApp: boolean;
  priority: 'high' | 'medium' | 'low';
}

const defaultPreferences: NotificationPreference[] = [
  {
    type: 'compliance',
    label: 'Compliance Alerts',
    description: 'Deadlines, filing reminders, and legal requirements',
    icon: AlertTriangle,
    email: true,
    push: true,
    inApp: true,
    priority: 'high'
  },
  {
    type: 'invoice',
    label: 'Invoice & Payment',
    description: 'Payment reminders, overdue invoices, and payment confirmations',
    icon: DollarSign,
    email: true,
    push: true,
    inApp: true,
    priority: 'high'
  },
  {
    type: 'campaign',
    label: 'Campaign Updates',
    description: 'Marketing campaign performance and analytics',
    icon: TrendingUp,
    email: false,
    push: true,
    inApp: true,
    priority: 'medium'
  },
  {
    type: 'community',
    label: 'Community Activity',
    description: 'Replies to your posts, mentions, and community updates',
    icon: Users,
    email: false,
    push: false,
    inApp: true,
    priority: 'low'
  },
  {
    type: 'system',
    label: 'System Notifications',
    description: 'Platform updates, maintenance, and account alerts',
    icon: Settings,
    email: true,
    push: false,
    inApp: true,
    priority: 'medium'
  }
];

export default function NotificationSettings() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>(defaultPreferences);
  const [isLoading, setIsLoading] = useState(false);
  const [showTestNotification, setShowTestNotification] = useState(false);

  const handlePreferenceChange = (type: string, channel: 'email' | 'push' | 'inApp', value: boolean) => {
    setPreferences(prev =>
      prev.map(pref =>
        pref.type === type ? { ...pref, [channel]: value } : pref
      )
    );
  };

  const savePreferences = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Save to localStorage
    localStorage.setItem('notificationPreferences', JSON.stringify(preferences));
    setIsLoading(false);

    // Show success message
    notificationService.addSystemNotification(
      'Settings Saved',
      'Your notification preferences have been updated successfully.'
    );
  };

  const testNotification = () => {
    notificationService.addSystemNotification(
      'Test Notification',
      'This is a test notification to verify your settings are working correctly.',
      'medium'
    );
    setShowTestNotification(true);
    setTimeout(() => setShowTestNotification(false), 3000);
  };

  const requestNotificationPermission = async () => {
    const granted = await notificationService.requestPermission();
    if (granted) {
      notificationService.addSystemNotification(
        'Permission Granted',
        'You will now receive push notifications for important updates.',
        'medium'
      );
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Notification Settings</h1>
        <p className="text-neutral-600">Manage how and when you receive notifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notification Types */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Types
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {preferences.map((preference) => (
                  <div key={preference.type} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <preference.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-neutral-900">{preference.label}</h3>
                            <Badge className={getPriorityColor(preference.priority)}>
                              {preference.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-neutral-600">{preference.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-neutral-600" />
                          <span className="text-sm font-medium">Email</span>
                        </div>
                        <Switch
                          checked={preference.email}
                          onCheckedChange={(checked) => handlePreferenceChange(preference.type, 'email', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-neutral-600" />
                          <span className="text-sm font-medium">Push</span>
                        </div>
                        <Switch
                          checked={preference.push}
                          onCheckedChange={(checked) => handlePreferenceChange(preference.type, 'push', checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-neutral-600" />
                          <span className="text-sm font-medium">In-App</span>
                        </div>
                        <Switch
                          checked={preference.inApp}
                          onCheckedChange={(checked) => handlePreferenceChange(preference.type, 'inApp', checked)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button
              onClick={savePreferences}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isLoading ? 'Saving...' : 'Save Preferences'}
            </Button>

            <Button
              variant="outline"
              onClick={testNotification}
              className="flex items-center gap-2"
            >
              <TestTube className="w-4 h-4" />
              Test Notification
            </Button>

            <Button
              variant="outline"
              onClick={requestNotificationPermission}
              className="flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              Enable Push Notifications
            </Button>
          </div>

          {showTestNotification && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">Test notification sent! Check your notification panel.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notification Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Total Notifications</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Unread</span>
                  <span className="font-semibold text-blue-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">This Week</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">High Priority</span>
                  <span className="font-semibold text-red-600">2</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => notificationService.markAllAsRead()}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark All as Read
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => notificationService.clearOldNotifications()}
                >
                  <Clock className="w-4 h-4 mr-2" />
                  Clear Old Notifications
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help */}
          <Card>
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-neutral-600">
                <p>
                  <strong>Email:</strong> Receive notifications via email for important updates.
                </p>
                <p>
                  <strong>Push:</strong> Get instant notifications on your device (requires permission).
                </p>
                <p>
                  <strong>In-App:</strong> See notifications within the application interface.
                </p>
                <p>
                  <strong>Priority Levels:</strong> High priority notifications are always delivered regardless of settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

