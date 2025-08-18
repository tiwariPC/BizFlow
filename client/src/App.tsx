import { Switch, Route } from "wouter";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// Layout components
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Auth components
import { LoginForm } from "@/components/auth/login-form";
import { RegisterForm } from "@/components/auth/register-form";

// Pages
import Home from "@/pages/home";
import Services from "@/pages/services";
import Dashboard from "@/pages/dashboard";
import Admin from "@/pages/admin";
import Questionnaire from "@/pages/questionnaire";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin" component={Admin} />
      <Route path="/questionnaire" component={Questionnaire} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthDialog(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthDialog(false);
  };

  const switchToRegister = () => {
    setAuthMode('register');
  };

  const switchToLogin = () => {
    setAuthMode('login');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header onLoginClick={handleLoginClick} />
          
          <main className="flex-1">
            <Router />
          </main>
          
          <Footer />
        </div>
        
        <Toaster />
        
        {/* Auth Dialog */}
        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogContent className="sm:max-w-md">
            {authMode === 'login' ? (
              <LoginForm
                onSuccess={handleAuthSuccess}
                onSwitchToRegister={switchToRegister}
              />
            ) : (
              <RegisterForm
                onSuccess={handleAuthSuccess}
                onSwitchToLogin={switchToLogin}
              />
            )}
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
