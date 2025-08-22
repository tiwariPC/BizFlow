import { useState } from 'react';
import { Link } from 'wouter';
import { authService } from '@/lib/auth';
import { NotificationBell } from '@/components/ui/notification-bell';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Search,
  User,
  Settings,
  Package,
  X,
  Menu,
  Home,
  ShieldCheck,
  Banknote,
  Palette,
  TrendingUp,
  PenTool,
  Users,
  BookOpen,
  Network,
  Store,
  Bot,
  DollarSign,
  Globe,
  Bell,
  ShoppingCart,
  Crown,
  Building,
  UserCheck,
  BarChart3,
  Calendar,
  FileText,
} from 'lucide-react';

// Tier-based sidebar modules
const tier1Modules = [
  { icon: Home, label: 'Platform Overview', href: '/dashboard' },
  { icon: Crown, label: 'User Management', href: '/admin/users' },
  { icon: Building, label: 'Organization Management', href: '/admin/organizations' },
  { icon: ShieldCheck, label: 'System Settings', href: '/admin/settings' },
  { icon: DollarSign, label: 'Billing & Subscriptions', href: '/admin/billing' },
  { icon: BarChart3, label: 'Analytics & Reports', href: '/admin/analytics' },
];

const tier2Modules = [
  { icon: Home, label: 'Organization Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Employee Management', href: '/organization/employees' },
  { icon: ShieldCheck, label: 'Business Setup & Compliance', href: '/compliance' },
  { icon: Banknote, label: 'Finance & Accounting', href: '/finance' },
  { icon: Palette, label: 'Branding & Identity', href: '/branding' },
  { icon: TrendingUp, label: 'Marketing & Sales', href: '/marketing' },
  { icon: PenTool, label: 'Branding & Design', href: '/branding' },
  { icon: BookOpen, label: 'Knowledge Hub', href: '/knowledge-hub' },
  { icon: Network, label: 'Community', href: '/community' },
  { icon: Store, label: 'Service Store', href: '/store' },
  { icon: ShoppingCart, label: 'Marketplace', href: '/marketplace' },
];

const tier3Modules = [
  { icon: Home, label: 'Employee Dashboard', href: '/dashboard' },
  { icon: ShieldCheck, label: 'My Tasks', href: '/employee/tasks' },
  { icon: Calendar, label: 'Leave Management', href: '/employee/leave' },
  { icon: FileText, label: 'Documents', href: '/employee/documents' },
  { icon: BookOpen, label: 'Training & Resources', href: '/employee/training' },
  { icon: Network, label: 'Team Communication', href: '/employee/team' },
];

const futureModules = [
  { icon: Bot, label: 'AI Assistant', href: '/ai-assistant', comingSoon: true },
  { icon: DollarSign, label: 'Investor Connect', href: '/investor-connect', comingSoon: true },
  {
    icon: Globe,
    label: 'International Compliance',
    href: '/international-compliance',
    comingSoon: true,
  },
];

interface TierBasedDashboardLayoutProps {
  children: React.ReactNode;
}

export function TierBasedDashboardLayout({ children }: TierBasedDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const user = authService.getUser();

  if (!user) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-md mx-4 p-6 bg-white rounded-lg shadow-lg'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4 text-center'>Access Denied</h1>
          <p className='text-gray-600 mb-4 text-center'>Please log in to access your dashboard.</p>
          <Link href='/'>
            <button className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700'>
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Determine user tier and available modules
  const userTier = user.role || 'tier3';

  // Admin users and Tier1 users get access to all modules (tier1 + tier2 + tier3)
  let availableModules;
  if (user.role === 'admin' || user.role === 'tier1' || user.tier === 'tier1') {
    availableModules = [...tier1Modules, ...tier2Modules, ...tier3Modules];
  } else {
    availableModules = userTier === 'tier2' ? tier2Modules : tier3Modules;
  }

    const getTierBadge = (tier: string) => {
    // Admin users and Tier1 users get special badge
    if (user.role === 'admin') {
      return <Badge className='bg-red-100 text-red-800'>System Admin</Badge>;
    }
    if (user.role === 'tier1' || user.tier === 'tier1') {
      return <Badge className='bg-purple-100 text-purple-800'>Platform Admin</Badge>;
    }

    switch (tier) {
      case 'tier2':
        return <Badge className='bg-blue-100 text-blue-800'>Organization</Badge>;
      case 'tier3':
        return <Badge className='bg-green-100 text-green-800'>Employee</Badge>;
      default:
        return <Badge className='bg-gray-100 text-gray-800'>Unknown</Badge>;
    }
  };

    const getTierIcon = (tier: string) => {
    // Admin users and Tier1 users get special icons
    if (user.role === 'admin') {
      return <Shield className='w-5 h-5 text-red-600' />;
    }
    if (user.role === 'tier1' || user.tier === 'tier1') {
      return <Crown className='w-5 h-5 text-purple-600' />;
    }

    switch (tier) {
      case 'tier2':
        return <Building className='w-5 h-5 text-blue-600' />;
      case 'tier3':
        return <UserCheck className='w-5 h-5 text-green-600' />;
      default:
        return <User className='w-5 h-5 text-gray-600' />;
    }
  };

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
            <div className='hidden md:flex items-center gap-2'>
              {getTierIcon(userTier)}
              {getTierBadge(userTier)}
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
            <NotificationBell />

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
                  <Link href='/notification-settings'>
                    <button className='w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2'>
                      <Bell className='w-4 h-4' />
                      Notifications
                    </button>
                  </Link>
                  {userTier === 'tier2' && (
                    <Link href='/organization/settings'>
                      <button className='w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2'>
                        <Building className='w-4 h-4' />
                        Organization Settings
                      </button>
                    </Link>
                  )}
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
              <h2 className='text-lg font-semibold text-neutral-900'>
                {userTier === 'tier1'
                  ? 'Platform Admin'
                  : userTier === 'tier2'
                    ? 'Organization'
                    : 'Employee'}{' '}
                Menu
              </h2>
              <p className='text-sm text-neutral-500 mt-1'>
                {userTier === 'tier1'
                  ? 'Manage entire platform'
                  : userTier === 'tier2'
                    ? 'Manage your organization'
                    : 'Access your workspace'}
              </p>
            </div>

            {/* Sidebar Navigation */}
            <nav className='flex-1 p-4 space-y-2'>
              {availableModules.map((module, index) => (
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

                      {/* Future Modules Section - Show for admin, tier1, tier2 and tier3 */}
        {(user.role === 'admin' || user.role === 'tier1' || user.tier === 'tier1' || userTier === 'tier2' || userTier === 'tier3') && (
                <div className='pt-4 border-t border-neutral-200'>
                  <div className='px-3 py-2'>
                    <h3 className='text-xs font-semibold text-neutral-500 uppercase tracking-wide'>
                      Coming Soon
                    </h3>
                  </div>
                  {futureModules.map((module, index) => (
                    <Link key={`future-${index}`} href={module.href}>
                      <button
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          window.location.pathname === module.href
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'text-neutral-500 hover:bg-neutral-50'
                        }`}
                      >
                        <module.icon className='w-5 h-5' />
                        <span className='text-sm font-medium'>{module.label}</span>
                        <Badge className='ml-auto text-xs'>Soon</Badge>
                      </button>
                    </Link>
                  ))}
                </div>
              )}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className='flex-1 p-6 lg:p-8'>{children}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
