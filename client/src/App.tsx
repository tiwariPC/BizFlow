import { Switch, Route } from 'wouter';
import { useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Dialog, DialogContent } from '@/components/ui/dialog';

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
        <div className='min-h-screen flex flex-col'>
          <Header onLoginClick={handleLoginClick} />

          <main className='flex-1'>
            <Router />
          </main>

          <Footer />
        </div>

        <Toaster />

        {/* Auth Dialog */}
        <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
          <DialogContent className='sm:max-w-md'>
            {authMode === 'login' ? (
              <LoginForm onSuccess={handleAuthSuccess} onSwitchToRegister={switchToRegister} />
            ) : (
              <RegisterForm onSuccess={handleAuthSuccess} onSwitchToLogin={switchToLogin} />
            )}
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
