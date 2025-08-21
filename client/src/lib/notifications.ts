export interface Notification {
  id: string;
  type: 'compliance' | 'invoice' | 'campaign' | 'community' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
  metadata?: Record<string, any>;
}

class NotificationService {
  private notifications: Notification[] = [];
  private listeners: ((notifications: Notification[]) => void)[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('notifications');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.notifications = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
      } catch (error) {
        console.error('Failed to load notifications from storage:', error);
        this.notifications = [];
      }
    }
  }

  private saveToStorage() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener([...this.notifications]));
  }

  subscribe(listener: (notifications: Notification[]) => void) {
    this.listeners.push(listener);
    listener([...this.notifications]);

    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false
    };

    this.notifications.unshift(newNotification);
    this.saveToStorage();
    this.notifyListeners();

    // Show browser notification if supported
    this.showBrowserNotification(newNotification);

    return newNotification;
  }

  markAsRead(id: string) {
    this.notifications = this.notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    this.saveToStorage();
    this.notifyListeners();
  }

  markAllAsRead() {
    this.notifications = this.notifications.map(notification => ({
      ...notification,
      read: true
    }));
    this.saveToStorage();
    this.notifyListeners();
  }

  deleteNotification(id: string) {
    this.notifications = this.notifications.filter(notification => notification.id !== id);
    this.saveToStorage();
    this.notifyListeners();
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  getNotificationsByType(type: Notification['type']): Notification[] {
    return this.notifications.filter(n => n.type === type);
  }

  getHighPriorityNotifications(): Notification[] {
    return this.notifications.filter(n => n.priority === 'high' && !n.read);
  }

  // Helper methods for specific notification types
  addComplianceAlert(title: string, message: string, dueDate?: Date, actionUrl?: string) {
    return this.addNotification({
      type: 'compliance',
      title,
      message,
      priority: 'high',
      actionUrl: actionUrl || '/compliance',
      metadata: { dueDate }
    });
  }

  addInvoiceReminder(title: string, message: string, amount?: number, actionUrl?: string) {
    return this.addNotification({
      type: 'invoice',
      title,
      message,
      priority: 'high',
      actionUrl: actionUrl || '/finance',
      metadata: { amount }
    });
  }

  addCampaignUpdate(title: string, message: string, performance?: any, actionUrl?: string) {
    return this.addNotification({
      type: 'campaign',
      title,
      message,
      priority: 'medium',
      actionUrl: actionUrl || '/marketing',
      metadata: { performance }
    });
  }

  addCommunityUpdate(title: string, message: string, author?: string, actionUrl?: string) {
    return this.addNotification({
      type: 'community',
      title,
      message,
      priority: 'low',
      actionUrl: actionUrl || '/community',
      metadata: { author }
    });
  }

  addSystemNotification(title: string, message: string, priority: 'high' | 'medium' | 'low' = 'medium') {
    return this.addNotification({
      type: 'system',
      title,
      message,
      priority
    });
  }

  private showBrowserNotification(notification: Notification) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: notification.id,
        requireInteraction: notification.priority === 'high'
      });
    }
  }

  // Request browser notification permission
  async requestPermission(): Promise<boolean> {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // Clear old notifications (older than 30 days)
  clearOldNotifications() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    this.notifications = this.notifications.filter(
      notification => notification.timestamp > thirtyDaysAgo
    );
    this.saveToStorage();
    this.notifyListeners();
  }

  // Mock data for development
  addMockNotifications() {
    const mockNotifications = [
      {
        type: 'compliance' as const,
        title: 'GST Filing Due',
        message: 'Your GST return for March 2024 is due in 3 days',
        priority: 'high' as const,
        actionUrl: '/compliance'
      },
      {
        type: 'invoice' as const,
        title: 'Unpaid Invoice',
        message: 'Invoice #INV-2024-001 for ₹25,000 is overdue by 5 days',
        priority: 'high' as const,
        actionUrl: '/finance'
      },
      {
        type: 'campaign' as const,
        title: 'Campaign Performance',
        message: 'Your "Summer Sale" campaign achieved 150% of target clicks',
        priority: 'medium' as const,
        actionUrl: '/marketing'
      },
      {
        type: 'community' as const,
        title: 'New Community Post',
        message: 'Rahul Sharma replied to your question about GST filing',
        priority: 'low' as const,
        actionUrl: '/community'
      }
    ];

    mockNotifications.forEach(notification => {
      this.addNotification(notification);
    });
  }
}

export const notificationService = new NotificationService();

