import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Building, Menu, X } from "lucide-react";
import { authService } from "@/lib/auth";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  onLoginClick: () => void;
}

export function Header({ onLoginClick }: HeaderProps) {
  const [location] = useLocation();
  const [user, setUser] = useState(authService.getUser());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      setUser(authService.getUser());
    };
    
    window.addEventListener('auth-change', checkAuth);
    return () => window.removeEventListener('auth-change', checkAuth);
  }, []);

  const handleLogout = () => {
    authService.clearAuth();
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
    window.location.href = '/';
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    ...(user ? [
      { href: "/dashboard", label: "Dashboard" },
      ...(user.role === 'admin' ? [{ href: "/admin", label: "Admin" }] : [])
    ] : []),
  ];

  const NavigationItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => mobile && setIsMobileMenuOpen(false)}
          className={`px-3 py-2 text-sm font-medium transition-colors ${
            location === item.href
              ? "text-primary border-b-2 border-primary"
              : "text-neutral-600 hover:text-neutral-900"
          } ${mobile ? "block w-full text-left" : ""}`}
          data-testid={`nav-${item.label.toLowerCase()}`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center" data-testid="logo">
              <Building className="text-primary text-2xl mr-3" />
              <span className="text-2xl font-bold text-neutral-900">BizHub</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                <NavigationItems />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2" data-testid="user-menu">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block">{user.fullName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout} data-testid="logout-button">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" onClick={onLoginClick} data-testid="login-button">
                  Login
                </Button>
                <Button data-testid="signup-button">Sign Up</Button>
              </>
            )}

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" data-testid="mobile-menu-trigger">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavigationItems mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
