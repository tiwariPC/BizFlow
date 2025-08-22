import { Switch, Route } from 'wouter';
import { useState, useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogPortal, DialogOverlay } from '@/components/ui/dialog';

// Layout components
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

// Auth components
import { LoginForm } from '@/components/auth/login-form';
import { RegisterForm } from '@/components/auth/register-form';

// Pages
import Home from '@/pages/home';
import Services from '@/pages/services';
import Dashboard from '@/pages/dashboard';
import Admin from '@/pages/admin';
import Questionnaire from '@/pages/questionnaire';
import NotFound from '@/pages/not-found';
import Incorporation from '@/pages/incorporation';
import Compliance from '@/pages/compliance';
import Tools from '@/pages/tools';
import Finance from '@/pages/finance';
import Growth from '@/pages/growth';
import Marketplace from '@/pages/marketplace';
import Branding from '@/pages/branding';
import Marketing from '@/pages/marketing';

import Help from '@/pages/help';
import KnowledgeHub from '@/pages/knowledge-hub';
import Community from '@/pages/community';
import NotificationSettings from '@/pages/notification-settings';
import AIAssistant from '@/pages/ai-assistant';
import InvestorConnect from '@/pages/investor-connect';
import InternationalCompliance from '@/pages/international-compliance';
import CompanyRegistration from '@/pages/company-registration';
import GSTRegistration from '@/pages/gst-registration';
import TaxFiling from '@/pages/tax-filing';
import Setup from '@/pages/setup';
import Store from '@/pages/store';
import Workflow from '@/pages/workflow';
import Contact from '@/pages/contact';
import Docs from '@/pages/docs';
import Status from '@/pages/status';
import Privacy from '@/pages/privacy';
import Terms from '@/pages/terms';
import Cookies from '@/pages/cookies';
import AccessTokens from '@/pages/access-tokens';
import SectionOverview from '@/pages/section-overview';

function Router() {
  return (
    <Switch>
      <Route path='/' component={Home} />
      <Route path='/services' component={Services} />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/admin' component={Admin} />
      <Route path='/questionnaire' component={Questionnaire} />
      <Route path='/incorporation' component={Incorporation} />
      <Route path='/compliance' component={Compliance} />
      <Route path='/tools' component={Tools} />
      <Route path='/finance' component={Finance} />
      <Route path='/growth' component={Growth} />
      <Route path='/marketplace' component={Marketplace} />
      <Route path='/branding' component={Branding} />
      <Route path='/marketing' component={Marketing} />

      <Route path='/help' component={Help} />
      <Route path='/knowledge-hub' component={KnowledgeHub} />
      <Route path='/community' component={Community} />
      <Route path='/notification-settings' component={NotificationSettings} />
      <Route path='/ai-assistant' component={AIAssistant} />
      <Route path='/investor-connect' component={InvestorConnect} />
      <Route path='/international-compliance' component={InternationalCompliance} />
      <Route path='/company-registration' component={CompanyRegistration} />
      <Route path='/gst-registration' component={GSTRegistration} />
      <Route path='/tax-filing' component={TaxFiling} />
      <Route path='/setup' component={Setup} />
      <Route path='/store' component={Store} />
      <Route path='/workflow' component={Workflow} />
      <Route path='/contact' component={Contact} />
      <Route path='/docs' component={Docs} />
      <Route path='/status' component={Status} />
      <Route path='/privacy' component={Privacy} />
      <Route path='/terms' component={Terms} />
      <Route path='/cookies' component={Cookies} />
      <Route path='/access-tokens' component={AccessTokens} />
      <Route path='/section/:sectionId' component={SectionOverview} />
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

  const handleSignupClick = () => {
    setAuthMode('register');
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

  // Listen for custom signup events from other components
  useEffect(() => {
    const handleOpenSignup = () => {
      setAuthMode('register');
      setShowAuthDialog(true);
    };

    window.addEventListener('open-signup', handleOpenSignup);
    return () => window.removeEventListener('open-signup', handleOpenSignup);
  }, []);

  // Handle Escape key to close dialog
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showAuthDialog) {
        setShowAuthDialog(false);
      }
    };

    if (showAuthDialog) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when dialog is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      // Restore body scroll when dialog is closed
      document.body.style.overflow = 'unset';
    };
  }, [showAuthDialog]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className='min-h-screen flex flex-col'>
          <Header onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />

          <main className='flex-1'>
            <Router />
          </main>

          <Footer />
        </div>

        <Toaster />

        {/* Auth Dialog - Custom without close button */}
        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogPortal>
            <DialogOverlay
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 cursor-pointer"
              onClick={() => setShowAuthDialog(false)}
            />
            <div
              className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
              onClick={(e) => e.stopPropagation()}
            >
              {authMode === 'login' ? (
                <LoginForm onSuccess={handleAuthSuccess} onSwitchToRegister={switchToRegister} />
              ) : (
                <RegisterForm onSuccess={handleAuthSuccess} onSwitchToLogin={switchToLogin} />
              )}
            </div>
          </DialogPortal>
        </Dialog>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
