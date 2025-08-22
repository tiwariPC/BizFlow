import { useQuery } from '@tanstack/react-query';
import { Order } from '@shared/schema';
import { OrderCard } from '@/components/order-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { authService } from '@/lib/auth';
import { notificationService } from '@/lib/notifications';
import { Link } from 'wouter';
import {
  Package,
  FileText,
  Headphones,
  Plus,
  User,
  Search,
  Bell,
  Settings,
  Building2,
  ShieldCheck,
  Banknote,
  Palette,
  TrendingUp,
  PenTool,
  Users,
  BookOpen,
  Network,
  Store,
  Home,
  Menu,
  X,
  AlertTriangle,
  DollarSign,
  Target,
  BarChart3,
  Calendar,
  Zap,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface OrderWithDetails extends Order {
  package?: {
    id: string;
    name: string;
    setupTime?: string;
  };
}

const baseSidebarModules = [
  { icon: Home, label: 'Home (Overview)', href: '/dashboard' },
  { icon: ShieldCheck, label: 'Business Setup & Compliance', href: '/compliance' },
  { icon: Banknote, label: 'Finance & Accounting', href: '/finance' },
  { icon: Palette, label: 'Branding & Identity', href: '/growth' },
  { icon: TrendingUp, label: 'Marketing & Sales', href: '/growth' },
  { icon: PenTool, label: 'Graphic & Content Services', href: '/marketplace' },
  { icon: Users, label: 'HR & Team', href: '/tools' },
  { icon: BookOpen, label: 'Knowledge Hub', href: '/help' },
  { icon: Network, label: 'Community', href: '/help' },
  { icon: Store, label: 'Marketplace', href: '/store' },
];

const quickStats = [
  {
    icon: AlertTriangle,
    title: 'GST Filing Due',
    value: '3 days',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    icon: DollarSign,
    title: 'Invoices Pending',
    value: '₹45,000',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    icon: Target,
    title: 'Leads in CRM',
    value: '12',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    icon: BarChart3,
    title: 'Campaign Performance',
    value: '+23%',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
];

const quickActions = [
  {
    icon: Building2,
    title: 'Register Company',
    description: 'Start your business incorporation',
    href: '/incorporation',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: FileText,
    title: 'Create Invoice',
    description: 'Generate and send invoices',
    href: '/finance',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: TrendingUp,
    title: 'Launch Marketing Campaign',
    description: 'Reach more customers',
    href: '/growth',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Palette,
    title: 'Design Logo',
    description: 'Create your brand identity',
    href: '/growth',
    color: 'from-purple-500 to-purple-600',
  },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Add mock notifications on first load
  useEffect(() => {
    const hasAddedMockNotifications = localStorage.getItem('mockNotificationsAdded');
    if (!hasAddedMockNotifications) {
      notificationService.addMockNotifications();
      localStorage.setItem('mockNotificationsAdded', 'true');
    }
  }, []);
  const user = authService.getUser();

  // Create dynamic sidebar modules based on user tier
  const sidebarModules = [
    ...baseSidebarModules,
    // Add access tokens management for tier1 and tier2 users
    ...(user && (user.tier === 'tier1' || user.tier === 'tier2') ? [
      { icon: Shield, label: 'Access Tokens', href: '/access-tokens' }
    ] : []),
  ];

  const { data: orders = [], isLoading } = useQuery<OrderWithDetails[]>({
    queryKey: ['/api/orders'],
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Card className='w-full max-w-md mx-4'>
          <CardContent className='pt-6 text-center'>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>Access Denied</h1>
            <p className='text-gray-600 mb-4'>Please log in to access your dashboard.</p>
            <Link href='/'>
              <Button>Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const recentOrders = orders.slice(0, 5);
  const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing');
  const completedOrders = orders.filter(o => o.status === 'completed');

  return (
    <div className='min-h-screen bg-neutral-50'>
      {/* Top Navigation Bar */}
      <nav className='bg-white border-b border-neutral-200 px-4 py-3'>
        <div className='flex items-center justify-between'>
          {/* Left side - Logo and Menu */}
          <div className='flex items-center gap-4'>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className='lg:hidden p-2 rounded-lg hover:bg-neutral-100'
            >
              {sidebarOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
            </button>
            <div className='flex items-center gap-2'>
              <Building2 className='text-blue-600 text-2xl' />
              <span className='text-xl font-bold text-neutral-900'>BizHub</span>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className='hidden md:flex flex-1 max-w-md mx-8'>
            <div className='relative w-full'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4' />
              <input
                type='text'
                placeholder='Search modules, services...'
                className='w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className='flex items-center gap-3'>
            <button className='p-2 rounded-lg hover:bg-neutral-100 relative'>
              <Bell className='w-5 h-5 text-neutral-600' />
              <span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full'></span>
            </button>

            <div className='relative'>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className='flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-100'
              >
                <div className='w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center'>
                  <User className='w-4 h-4 text-white' />
                </div>
                <span className='hidden sm:block text-sm font-medium text-neutral-700'>
                  {user.fullName}
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50'>
                  <Link href='/dashboard'>
                    <button className='w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2'>
                      <User className='w-4 h-4' />
                      Profile
                    </button>
                  </Link>
                  <Link href='/dashboard'>
                    <button className='w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2'>
                      <Settings className='w-4 h-4' />
                      Settings
                    </button>
                  </Link>
                  <Link href='/dashboard'>
                    <button className='w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2'>
                      <Package className='w-4 h-4' />
                      Subscription
                    </button>
                  </Link>
                  <hr className='my-2' />
                  <button
                    onClick={() => {
                      authService.clearAuth();
                      window.location.href = '/';
                    }}
                    className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50'
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className='flex'>
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-neutral-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <div className='h-full flex flex-col'>
            {/* Sidebar Header */}
            <div className='p-4 border-b border-neutral-200'>
              <h2 className='text-lg font-semibold text-neutral-900'>Modules Menu</h2>
            </div>

            {/* Sidebar Navigation */}
            <nav className='flex-1 p-4 space-y-2'>
              {sidebarModules.map((module, index) => (
                <Link key={index} href={module.href}>
                  <button
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      window.location.pathname === module.href
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <module.icon className='w-5 h-5' />
                    <span className='text-sm font-medium'>{module.label}</span>
                  </button>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className='flex-1 p-6'>
          <div className='max-w-7xl mx-auto'>
            {/* Greeting Banner */}
            <div className='bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white mb-8'>
              <div className='flex items-center justify-between'>
                <div>
                  <h1 className='text-3xl font-bold mb-2'>Welcome, {user.fullName}!</h1>
                  <p className='text-xl text-blue-100'>Let's grow your business.</p>
                </div>
                <div className='hidden md:block'>
                  <Calendar className='w-16 h-16 text-blue-200' />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
              {quickStats.map((stat, index) => (
                <Card key={index} className={`border-2 ${stat.borderColor}`}>
                  <CardContent className='p-6'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-sm text-neutral-600 mb-1'>{stat.title}</p>
                        <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                      </div>
                      <div
                        className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}
                      >
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className='mb-8'>
              <h2 className='text-2xl font-bold text-neutral-900 mb-6'>Quick Actions</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <Card className='hover:shadow-lg transition-shadow cursor-pointer border-2 border-neutral-200 hover:border-neutral-300'>
                      <CardContent className='p-6 text-center'>
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                        >
                          <action.icon className='w-8 h-8 text-white' />
                        </div>
                        <h3 className='text-lg font-semibold text-neutral-900 mb-2'>
                          {action.title}
                        </h3>
                        <p className='text-sm text-neutral-600'>{action.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
              {/* Main Content */}
              <div className='lg:col-span-2'>
                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <div className='flex items-center justify-between'>
                      <CardTitle data-testid='recent-orders-title'>Recent Orders</CardTitle>
                      <Link href='/services'>
                        <Button variant='outline' size='sm' data-testid='view-all-orders'>
                          View All Services
                        </Button>
                      </Link>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className='space-y-4'>
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className='animate-pulse'>
                            <div className='bg-neutral-200 rounded-lg h-24'></div>
                          </div>
                        ))}
                      </div>
                    ) : recentOrders.length > 0 ? (
                      <div className='space-y-4' data-testid='orders-list'>
                        {recentOrders.map(order => (
                          <OrderCard
                            key={order.id}
                            order={order}
                            onViewDetails={orderId => {
                              console.log('View order details:', orderId);
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className='text-center py-8' data-testid='no-orders'>
                        <Package className='w-12 h-12 text-neutral-400 mx-auto mb-4' />
                        <h3 className='text-lg font-semibold text-neutral-900 mb-2'>
                          No orders yet
                        </h3>
                        <p className='text-neutral-600 mb-4'>Start by exploring our services</p>
                        <Link href='/services'>
                          <Button data-testid='browse-services'>Browse Services</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className='space-y-6'>
                {/* Account Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid='account-overview-title'>Account Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div className='flex items-center'>
                        <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4'>
                          <User className='text-primary w-6 h-6' />
                        </div>
                        <div>
                          <p className='font-medium text-neutral-900' data-testid='user-name'>
                            {user.fullName}
                          </p>
                          <p className='text-sm text-neutral-600' data-testid='user-email'>
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <hr className='border-neutral-200' />

                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <span className='text-sm text-neutral-600'>Total Orders:</span>
                          <span className='text-sm font-medium' data-testid='total-orders'>
                            {orders.length}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-sm text-neutral-600'>Active Orders:</span>
                          <span className='text-sm font-medium' data-testid='active-orders'>
                            {activeOrders.length}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-sm text-neutral-600'>Completed:</span>
                          <span className='text-sm font-medium' data-testid='completed-orders'>
                            {completedOrders.length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle data-testid='quick-actions-title'>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-3'>
                      <Link href='/services'>
                        <Button
                          variant='outline'
                          className='w-full justify-start'
                          data-testid='new-order-action'
                        >
                          <Plus className='w-4 h-4 mr-3' />
                          New Order
                        </Button>
                      </Link>

                      <Button
                        variant='outline'
                        className='w-full justify-start'
                        data-testid='view-invoices-action'
                      >
                        <FileText className='w-4 h-4 mr-3' />
                        View Invoices
                      </Button>

                      <Link href='/questionnaire'>
                        <Button
                          variant='outline'
                          className='w-full justify-start'
                          data-testid='questionnaire-action'
                        >
                          <Headphones className='w-4 h-4 mr-3' />
                          Take Questionnaire
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
