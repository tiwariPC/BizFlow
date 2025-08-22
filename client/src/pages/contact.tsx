import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle,
  Building,
  Users,
  Award,
  Shield,
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 9876543210',
      description: 'Mon-Fri 9AM-6PM IST',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'support@bizhub.com',
      description: '24/7 support available',
    },
    {
      icon: MapPin,
      title: 'Office',
      value: 'Mumbai, India',
      description: 'Main headquarters',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: '9:00 AM - 6:00 PM',
      description: 'Monday to Friday',
    },
  ];

  const features = [
    {
      icon: Building,
      title: 'Business Setup',
      description: 'Complete incorporation services',
    },
    {
      icon: Shield,
      title: 'Compliance',
      description: 'Legal and regulatory compliance',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Certified professionals',
    },
    {
      icon: Award,
      title: 'Trusted Partner',
      description: '10+ years of experience',
    },
  ];

  return (
    <div className='min-h-screen flex flex-col'>
      <Header onLoginClick={() => {}} onSignupClick={() => {}} />

      <main className='flex-1'>
        {/* Hero Section */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h1 className='text-4xl md:text-5xl font-bold mb-6'>Get in Touch</h1>
            <p className='text-xl text-blue-100 max-w-3xl mx-auto'>
              Have questions about our services? Need help with your business setup? Our expert team
              is here to help you succeed.
            </p>
          </div>
        </div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <MessageSquare className='w-5 h-5' />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className='text-center py-8'>
                      <CheckCircle className='w-16 h-16 text-green-500 mx-auto mb-4' />
                      <h3 className='text-xl font-semibold mb-2'>Message Sent!</h3>
                      <p className='text-neutral-600 mb-4'>
                        Thank you for contacting us. We'll get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className='space-y-6'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <Label htmlFor='name'>Full Name *</Label>
                          <Input
                            id='name'
                            name='name'
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter your full name'
                          />
                        </div>
                        <div>
                          <Label htmlFor='email'>Email Address *</Label>
                          <Input
                            id='email'
                            name='email'
                            type='email'
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder='Enter your email'
                          />
                        </div>
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                          <Label htmlFor='phone'>Phone Number</Label>
                          <Input
                            id='phone'
                            name='phone'
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder='Enter your phone number'
                          />
                        </div>
                        <div>
                          <Label htmlFor='subject'>Subject *</Label>
                          <Input
                            id='subject'
                            name='subject'
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            placeholder="What's this about?"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor='message'>Message *</Label>
                        <Textarea
                          id='message'
                          name='message'
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          placeholder='Tell us how we can help you...'
                        />
                      </div>

                      <Button type='submit' className='w-full' disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className='w-4 h-4 mr-2' />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className='space-y-8'>
              <div>
                <h2 className='text-2xl font-bold mb-6'>Contact Information</h2>
                <div className='space-y-4'>
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className='flex items-start gap-4 p-4 bg-neutral-50 rounded-lg'
                    >
                      <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                        <info.icon className='w-5 h-5 text-blue-600' />
                      </div>
                      <div>
                        <h3 className='font-semibold text-neutral-900'>{info.title}</h3>
                        <p className='text-neutral-600 font-medium'>{info.value}</p>
                        <p className='text-sm text-neutral-500'>{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className='text-2xl font-bold mb-6'>Why Choose BizHub?</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {features.map((feature, index) => (
                    <div key={index} className='flex items-start gap-3'>
                      <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0'>
                        <feature.icon className='w-4 h-4 text-green-600' />
                      </div>
                      <div>
                        <h3 className='font-semibold text-neutral-900'>{feature.title}</h3>
                        <p className='text-sm text-neutral-600'>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Card>
                <CardContent className='p-6'>
                  <h3 className='font-semibold mb-3'>Emergency Support</h3>
                  <p className='text-sm text-neutral-600 mb-3'>
                    Need urgent assistance? Our emergency support line is available 24/7.
                  </p>
                  <div className='flex items-center gap-2'>
                    <Badge variant='destructive'>24/7</Badge>
                    <span className='text-sm font-medium'>+91 9876543210</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
