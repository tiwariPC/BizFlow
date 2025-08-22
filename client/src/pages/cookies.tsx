import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie, Settings, Shield, Info, Mail } from 'lucide-react';

export default function Cookies() {
  const cookieTypes = [
    {
      name: 'Essential Cookies',
      description: 'Required for basic website functionality',
      purpose: 'Authentication, security, and core features',
      duration: 'Session or 1 year',
      examples: ['Login sessions', 'Security tokens', 'Language preferences'],
    },
    {
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors use our site',
      purpose: 'Improve user experience and site performance',
      duration: '2 years',
      examples: ['Page views', 'User behavior', 'Performance metrics'],
    },
    {
      name: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization',
      purpose: 'Remember your preferences and settings',
      duration: '1 year',
      examples: ['Theme preferences', 'Form data', 'Custom settings'],
    },
    {
      name: 'Marketing Cookies',
      description: 'Used for advertising and marketing purposes',
      purpose: 'Show relevant content and track campaign performance',
      duration: '90 days',
      examples: ['Ad targeting', 'Campaign tracking', 'Social media integration'],
    },
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <Header onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className='flex-1'>
        {/* Hero Section */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h1 className='text-4xl md:text-5xl font-bold mb-6'>Cookie Policy</h1>
            <p className='text-xl text-blue-100 max-w-3xl mx-auto'>
              Learn how we use cookies and similar technologies to improve your experience.
            </p>
          </div>
        </div>

        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          {/* Last Updated */}
          <div className='text-center mb-12'>
            <p className='text-neutral-600'>Last updated: January 15, 2024</p>
          </div>

          {/* Introduction */}
          <Card className='mb-8'>
            <CardContent className='p-8'>
              <div className='flex items-center gap-3 mb-4'>
                <Cookie className='w-8 h-8 text-blue-600' />
                <h2 className='text-2xl font-bold'>What Are Cookies?</h2>
              </div>
              <p className='text-neutral-600 leading-relaxed'>
                Cookies are small text files that are stored on your device when you visit our
                website. They help us provide you with a better experience by remembering your
                preferences, analyzing how you use our site, and personalizing content.
              </p>
            </CardContent>
          </Card>

          {/* Cookie Types */}
          <div className='space-y-6 mb-8'>
            <h2 className='text-2xl font-bold'>Types of Cookies We Use</h2>
            {cookieTypes.map((type, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className='flex items-center gap-3'>
                    <Settings className='w-5 h-5 text-blue-600' />
                    {type.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div>
                      <h3 className='font-semibold text-neutral-900 mb-1'>Description</h3>
                      <p className='text-neutral-600'>{type.description}</p>
                    </div>
                    <div>
                      <h3 className='font-semibold text-neutral-900 mb-1'>Purpose</h3>
                      <p className='text-neutral-600'>{type.purpose}</p>
                    </div>
                    <div>
                      <h3 className='font-semibold text-neutral-900 mb-1'>Duration</h3>
                      <p className='text-neutral-600'>{type.duration}</p>
                    </div>
                    <div>
                      <h3 className='font-semibold text-neutral-900 mb-1'>Examples</h3>
                      <ul className='list-disc list-inside text-neutral-600 space-y-1'>
                        {type.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex}>{example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cookie Management */}
          <Card className='mb-8'>
            <CardContent className='p-8'>
              <div className='flex items-center gap-3 mb-4'>
                <Shield className='w-8 h-8 text-blue-600' />
                <h2 className='text-2xl font-bold'>Managing Your Cookie Preferences</h2>
              </div>
              <div className='space-y-4 text-neutral-600'>
                <p>You can control and manage cookies in several ways:</p>
                <ul className='list-disc list-inside space-y-2'>
                  <li>
                    <strong>Browser Settings:</strong> Most browsers allow you to block or delete
                    cookies through their settings
                  </li>
                  <li>
                    <strong>Cookie Consent:</strong> Use our cookie consent banner to manage
                    preferences
                  </li>
                  <li>
                    <strong>Third-party Opt-out:</strong> Visit third-party websites to opt out of
                    their cookies
                  </li>
                  <li>
                    <strong>Contact Us:</strong> Email us to request cookie preferences changes
                  </li>
                </ul>
                <p className='mt-4'>
                  <strong>Note:</strong> Disabling certain cookies may affect the functionality of
                  our website.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Third-party Cookies */}
          <Card className='mb-8'>
            <CardContent className='p-8'>
              <div className='flex items-center gap-3 mb-4'>
                <Info className='w-8 h-8 text-blue-600' />
                <h2 className='text-2xl font-bold'>Third-party Cookies</h2>
              </div>
              <p className='text-neutral-600 mb-4'>
                We may use third-party services that place cookies on your device. These services
                include:
              </p>
              <ul className='list-disc list-inside space-y-2 text-neutral-600'>
                <li>
                  <strong>Google Analytics:</strong> Website analytics and performance tracking
                </li>
                <li>
                  <strong>Google Ads:</strong> Advertising and remarketing
                </li>
                <li>
                  <strong>Social Media:</strong> Social media integration and sharing
                </li>
                <li>
                  <strong>Payment Processors:</strong> Secure payment processing
                </li>
              </ul>
              <p className='mt-4 text-neutral-600'>
                These third-party services have their own privacy policies and cookie practices.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardContent className='p-8'>
              <div className='flex items-center gap-3 mb-4'>
                <Mail className='w-6 h-6 text-blue-600' />
                <h2 className='text-2xl font-bold'>Contact Us</h2>
              </div>
              <p className='text-neutral-600 mb-4'>
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className='space-y-2 text-neutral-700'>
                <p>
                  <strong>Email:</strong> privacy@bizhub.com
                </p>
                <p>
                  <strong>Phone:</strong> +91 9876543210
                </p>
                <p>
                  <strong>Address:</strong> BizHub, Mumbai, India
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
