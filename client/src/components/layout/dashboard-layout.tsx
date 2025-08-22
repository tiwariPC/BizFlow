import { useState } from "react";
import { Link } from "wouter";
import { authService } from "@/lib/auth";
import { NotificationBell } from "@/components/ui/notification-bell";
import { Badge } from "@/components/ui/badge";
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
  ShoppingCart
} from "lucide-react";

const sidebarModules = [
  { icon: Home, label: "Home (Overview)", href: "/dashboard" },
  { icon: ShieldCheck, label: "Business Setup & Compliance", href: "/compliance" },
  { icon: Banknote, label: "Finance & Accounting", href: "/finance" },
  { icon: Palette, label: "Branding & Identity", href: "/branding" },
  { icon: TrendingUp, label: "Marketing & Sales", href: "/marketing" },
  { icon: Users, label: "HR & Team", href: "/tools" },
  { icon: BookOpen, label: "Knowledge Hub", href: "/knowledge-hub" },
  { icon: Network, label: "Community", href: "/community" },
  { icon: Store, label: "Service Store", href: "/store" },
  { icon: ShoppingCart, label: "Marketplace", href: "/marketplace" },
];

const futureModules = [
  { icon: Bot, label: "AI Assistant", href: "/ai-assistant", comingSoon: true },
  { icon: DollarSign, label: "Investor Connect", href: "/investor-connect", comingSoon: true },
  { icon: Globe, label: "International Compliance", href: "/international-compliance", comingSoon: true },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const user = authService.getUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-4 p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">Access Denied</h1>
          <p className="text-gray-600 mb-4 text-center">Please log in to access your dashboard.</p>
          <Link href="/">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-neutral-200 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-100"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <Building2 className="text-blue-600 text-2xl" />
              <span className="text-xl font-bold text-neutral-900">BizHub</span>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search modules, services..."
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center gap-3">
            <NotificationBell />

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-neutral-100"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium text-neutral-700">{user.fullName}</span>
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
                  <Link href="/dashboard">
                    <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                  </Link>
                  <Link href="/dashboard">
                    <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                  </Link>
                  <Link href="/notification-settings">
                    <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Notifications
                    </button>
                  </Link>
                  <Link href="/dashboard">
                    <button className="w-full text-left px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Subscription
                    </button>
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={() => {
                      authService.clearAuth();
                      window.location.href = '/';
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-neutral-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-neutral-200">
              <h2 className="text-lg font-semibold text-neutral-900">Modules Menu</h2>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex-1 p-4 space-y-2">
              {sidebarModules.map((module, index) => (
                <Link key={index} href={module.href}>
                  <button
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      window.location.pathname === module.href
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <module.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{module.label}</span>
                  </button>
                </Link>
              ))}

              {/* Future Modules Section */}
              <div className="pt-4 border-t border-neutral-200">
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Coming Soon</h3>
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
                      <module.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{module.label}</span>
                      <Badge className="ml-auto bg-yellow-100 text-yellow-800 text-xs">Beta</Badge>
                    </button>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
