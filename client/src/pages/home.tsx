import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ServiceCard } from '@/components/service-card';
import { ServicePackage } from '@shared/schema';
import { authService } from '@/lib/auth';
import {
  Building2,
  Scale,
  Wrench,
  Banknote,
  TrendingUp,
  Network,
  LayoutDashboard,
  ShieldCheck,
  CheckCircle,
  Star,
  Users,
  Award,
  Zap,
  Headphones,
  ArrowRight,
  ChevronRight,
  Globe,
  Rocket,
  Target,
  Lightbulb,
  Clock,
  Shield,
} from 'lucide-react';

export default function Home() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const { data: packages = [], isLoading } = useQuery<ServicePackage[]>({
    queryKey: ['/api/packages'],
  });

  const user = authService.getUser();

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleServiceSelect = (packageId: string) => {
    if (user) {
      window.location.href = `/services?package=${packageId}`;
    } else {
      alert('Please log in to select a service package');
    }
  };

  const benefits = [
    {
      icon: Zap,
      title: 'All-in-One Platform',
      description: 'Everything you need from incorporation to growth in one place',
      gradient: 'from-yellow-400 to-orange-500',
    },
    {
      icon: ShieldCheck,
      title: 'Expert Guidance',
      description: 'Professional support for compliance and legal requirements',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      icon: TrendingUp,
      title: 'Growth Focused',
      description: 'Tools and services designed to scale your business',
      gradient: 'from-green-400 to-emerald-600',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with fellow entrepreneurs and mentors',
      gradient: 'from-purple-400 to-pink-600',
    },
  ];

  const modules = [
    {
      icon: ShieldCheck,
      title: 'Compliance',
      description: 'Stay compliant with all regulations',
      color: 'from-emerald-500 to-teal-600',
      features: ['GST Filing', 'ROC Compliance', 'Legal Updates'],
    },
    {
      icon: Building2,
      title: 'Branding',
      description: 'Build a strong brand identity',
      color: 'from-blue-500 to-indigo-600',
      features: ['Logo Design', 'Brand Guidelines', 'Marketing Assets'],
    },
    {
      icon: TrendingUp,
      title: 'Marketing',
      description: 'Reach more customers effectively',
      color: 'from-orange-500 to-red-600',
      features: ['Digital Marketing', 'SEO Optimization', 'Social Media'],
    },
    {
      icon: Network,
      title: 'Sales',
      description: 'Convert leads into customers',
      color: 'from-purple-500 to-pink-600',
      features: ['CRM System', 'Lead Management', 'Sales Analytics'],
    },
    {
      icon: Users,
      title: 'HR',
      description: 'Manage your team efficiently',
      color: 'from-indigo-500 to-blue-600',
      features: ['Employee Portal', 'Payroll Management', 'Recruitment'],
    },
    {
      icon: Banknote,
      title: 'Finance',
      description: 'Handle all financial operations',
      color: 'from-green-500 to-emerald-600',
      features: ['Accounting', 'Invoicing', 'Financial Reports'],
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '₹999',
      period: '/month',
      description: 'Perfect for new businesses',
      features: ['Basic incorporation', 'GST registration', 'Email support', 'Basic templates'],
      popular: false,
      gradient: 'from-gray-500 to-gray-600',
    },
    {
      name: 'Professional',
      price: '₹2,499',
      period: '/month',
      description: 'Ideal for growing businesses',
      features: [
        'Everything in Starter',
        'Advanced compliance',
        'Priority support',
        'Custom branding',
        'CRM integration',
      ],
      popular: true,
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      name: 'Enterprise',
      price: '₹4,999',
      period: '/month',
      description: 'For established companies',
      features: [
        'Everything in Professional',
        'Dedicated manager',
        'Custom integrations',
        'Advanced analytics',
        '24/7 support',
      ],
      popular: false,
      gradient: 'from-purple-500 to-pink-600',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Founder, TechStart',
      content:
        'BizHub made our incorporation process seamless. The compliance tools are a lifesaver!',
      rating: 5,
      avatar: '👩‍💼',
    },
    {
      name: 'Rajesh Kumar',
      role: 'CEO, Digital Solutions',
      content:
        'The all-in-one platform helped us focus on growth while they handled the paperwork.',
      rating: 5,
      avatar: '👨‍💼',
    },
    {
      name: 'Anita Patel',
      role: 'Entrepreneur',
      content: 'Excellent support team and comprehensive tools. Highly recommended for startups!',
      rating: 5,
      avatar: '👩‍💻',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Businesses Served', icon: Building2 },
    { number: '99.9%', label: 'Success Rate', icon: Target },
    { number: '24/7', label: 'Support Available', icon: Clock },
    { number: '50+', label: 'Expert Partners', icon: Users },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50'>
      {/* Hero Section */}
      <section className='relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white py-20'>
        {/* Animated Background Elements */}
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
          <div className='absolute top-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
          <div className='absolute bottom-0 left-20 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>
        </div>

        {/* Grid Pattern Background */}
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]'></div>

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
          <div className='text-center'>
            {/* Enhanced Badge */}
            <div className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-full border border-white/30 mb-8 shadow-lg'>
              <div className='w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse'></div>
              <Rocket className='w-5 h-5 mr-2 text-yellow-400' />
              <span className='text-sm font-semibold text-white'>
                🚀 Launching Soon - Join the Revolution!
              </span>
            </div>

            <h1 className='text-5xl md:text-7xl font-black mb-8 leading-tight'>
              <span className='bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent'>
                Start, Manage &
              </span>
              <br />
              <span className='bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent'>
                Grow Your Business
              </span>
            </h1>

            <p className='text-xl md:text-2xl mb-10 text-blue-100 max-w-4xl mx-auto leading-relaxed font-medium'>
              The complete business platform that takes you from idea to IPO.
              <br className='hidden md:block' />
              <span className='text-white font-semibold'>
                Everything you need, all in one place.
              </span>
            </p>

            <div className='flex justify-center items-center mb-12'>
              <Button
                size='lg'
                className='group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 border-0 rounded-2xl overflow-hidden'
                onClick={() => {
                  // Trigger signup flow by dispatching a custom event
                  window.dispatchEvent(new CustomEvent('open-signup'));
                }}
              >
                <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <span className='relative flex items-center'>
                  Start Your Business
                  <ArrowRight className='w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform' />
                </span>
              </Button>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto'>
              <div className='flex items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20'>
                <Shield className='w-6 h-6 mr-3 text-green-400' />
                <span className='text-white font-semibold'>ISO 27001 Certified</span>
              </div>
              <div className='flex items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20'>
                <CheckCircle className='w-6 h-6 mr-3 text-green-400' />
                <span className='text-white font-semibold'>99.9% Uptime</span>
              </div>
              <div className='flex items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20'>
                <Headphones className='w-6 h-6 mr-3 text-green-400' />
                <span className='text-white font-semibold'>24/7 Expert Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className='py-24 bg-gradient-to-r from-white via-gray-50 to-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
              Trusted by Industry Leaders
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              Join thousands of successful businesses that rely on our platform
            </p>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center group'>
                <div className='relative'>
                  <div className='w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl'>
                    <stat.icon className='w-10 h-10 text-white' />
                    <div className='absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </div>
                </div>
                <div className='text-4xl md:text-5xl font-black text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                  {stat.number}
                </div>
                <div className='text-gray-700 font-semibold text-lg'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className='py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden'>
        {/* Background Elements */}
        <div className='absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl'></div>

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20'>
            <div className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg'>
              <Lightbulb className='w-5 h-5 mr-2' />
              Why Choose BizHub
            </div>
            <h2 className='text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight'>
              Built for Modern
              <br />
              <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                Entrepreneurs
              </span>
            </h2>
            <p className='text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
              We've designed every feature with entrepreneurs in mind, ensuring you have the tools
              and support needed to succeed in today's competitive market.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {benefits.map((benefit, index) => (
              <div key={index} className='group relative'>
                <div className='bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100'>
                  <div
                    className={`w-24 h-24 bg-gradient-to-br ${benefit.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg relative overflow-hidden`}
                  >
                    <benefit.icon className='w-12 h-12 text-white relative z-10' />
                    <div className='absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-4 text-center'>
                    {benefit.title}
                  </h3>
                  <p className='text-gray-600 text-center leading-relaxed'>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Overview Section */}
      <section className='py-24 bg-gradient-to-br from-gray-50 to-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20'>
            <div className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg'>
              <Globe className='w-5 h-5 mr-2' />
              Platform Modules
            </div>
            <h2 className='text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight'>
              Everything You Need
              <br />
              <span className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
                to Succeed
              </span>
            </h2>
            <p className='text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
              Comprehensive tools and services designed to power your business growth at every stage
              of your journey.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {modules.map((module, index) => (
              <div key={index} className='group relative'>
                <div className='bg-white rounded-3xl border border-gray-200 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 h-full'>
                  <div className='relative mb-6'>
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${module.color} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg relative overflow-hidden`}
                    >
                      <module.icon className='w-10 h-10 text-white relative z-10' />
                      <div className='absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </div>
                  </div>
                  <h3 className='text-2xl font-bold text-gray-900 mb-4'>{module.title}</h3>
                  <p className='text-gray-600 mb-6 leading-relaxed'>{module.description}</p>

                  <div className='space-y-3 mb-8'>
                    {module.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className='flex items-center text-sm text-gray-700'>
                        <div className='w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3 flex-shrink-0'></div>
                        <span className='font-medium'>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className='mt-auto'>
                    <Button
                      variant='ghost'
                      className='w-full group-hover:bg-gray-50 transition-colors duration-300 font-semibold border border-gray-200 hover:border-gray-300'
                    >
                      Learn More
                      <ChevronRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className='py-24 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 relative overflow-hidden'>
        {/* Background Elements */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl'></div>

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20'>
            <div className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg'>
              <Target className='w-5 h-5 mr-2' />
              Pricing Plans
            </div>
            <h2 className='text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight'>
              Choose Your
              <br />
              <span className='bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'>
                Growth Path
              </span>
            </h2>
            <p className='text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
              Flexible pricing designed to grow with your business. Start small and scale up as you
              succeed.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative group ${plan.popular ? 'transform scale-105' : ''}`}
              >
                <div
                  className={`bg-white rounded-3xl border-2 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 h-full ${
                    plan.popular ? 'border-purple-500 ring-4 ring-purple-500/20' : 'border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                      <span className='bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg'>
                        ⭐ Most Popular
                      </span>
                    </div>
                  )}

                  <div className='text-center mb-8'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-4'>{plan.name}</h3>
                    <div className='mb-4'>
                      <span
                        className={`text-6xl font-black ${
                          plan.popular
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'
                            : 'text-gray-900'
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span className='text-gray-600 text-lg'>{plan.period}</span>
                    </div>
                    <p className='text-gray-600 font-medium'>{plan.description}</p>
                  </div>

                  <ul className='space-y-4 mb-8'>
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className='flex items-center'>
                        <CheckCircle className='w-6 h-6 text-green-500 mr-3 flex-shrink-0' />
                        <span className='text-gray-700 font-medium'>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-4 text-lg font-bold rounded-2xl ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-purple-500/40'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    } transition-all duration-300 transform hover:scale-105`}
                    onClick={() => {
                      // Trigger signup flow by dispatching a custom event
                      window.dispatchEvent(new CustomEvent('open-signup'));
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-24 bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 relative overflow-hidden'>
        {/* Background Elements */}
        <div className='absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl'></div>

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20'>
            <div className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-full text-sm font-bold mb-6 shadow-lg'>
              <Star className='w-5 h-5 mr-2' />
              Customer Stories
            </div>
            <h2 className='text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight'>
              Trusted by
              <br />
              <span className='bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent'>
                Entrepreneurs
              </span>
            </h2>
            <p className='text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
              See how businesses like yours are achieving success with BizHub.
            </p>
          </div>

          <div className='relative'>
            <div className='flex transition-transform duration-500 ease-in-out'>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`w-full flex-shrink-0 transition-opacity duration-500 ${
                    index === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute'
                  }`}
                >
                  <div className='max-w-5xl mx-auto'>
                    <div className='bg-white rounded-3xl p-12 shadow-2xl border border-gray-100'>
                      <div className='text-center'>
                        <div className='text-8xl mb-8'>{testimonial.avatar}</div>
                        <div className='flex justify-center mb-8'>
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className='w-8 h-8 text-yellow-400 fill-current mx-1' />
                          ))}
                        </div>
                        <blockquote className='text-3xl md:text-4xl text-gray-800 mb-10 leading-relaxed font-bold italic'>
                          "{testimonial.content}"
                        </blockquote>
                        <div className='border-t border-gray-200 pt-8'>
                          <p className='text-2xl font-black text-gray-900 mb-2'>
                            {testimonial.name}
                          </p>
                          <p className='text-lg text-gray-600 font-semibold'>{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Navigation */}
            <div className='flex justify-center mt-16 space-x-3'>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 scale-125 shadow-lg'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-32 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden'>
        {/* Animated Background Elements */}
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
          <div className='absolute top-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
          <div className='absolute bottom-0 left-20 w-72 h-72 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>
        </div>

        {/* Grid Pattern Background */}
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]'></div>

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md rounded-full border border-white/30 mb-8 shadow-lg'>
            <div className='w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse'></div>
            <Rocket className='w-5 h-5 mr-2 text-yellow-400' />
            <span className='text-sm font-semibold text-white'>Ready to launch your business?</span>
          </div>

          <h2 className='text-6xl md:text-7xl font-black mb-8 leading-tight'>
            <span className='bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent'>
              Ready to Start Your
            </span>
            <br />
            <span className='bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent'>
              Business Journey?
            </span>
          </h2>

          <p className='text-xl md:text-2xl text-blue-100 mb-16 max-w-4xl mx-auto leading-relaxed font-medium'>
            Join thousands of entrepreneurs who trust BizHub to help them build, manage, and grow
            their businesses successfully.
            <br className='hidden md:block' />
            <span className='text-white font-semibold'>Your success story starts here.</span>
          </p>

          <div className='flex flex-col sm:flex-row gap-8 justify-center items-center mb-16'>
            <Button
              size='lg'
              className='group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-16 py-8 text-2xl font-bold shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 border-0 rounded-2xl overflow-hidden'
              onClick={() => {
                // Trigger signup flow by dispatching a custom event
                window.dispatchEvent(new CustomEvent('open-signup'));
              }}
            >
              <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              <span className='relative flex items-center'>
                Start Free Trial
                <ArrowRight className='w-8 h-8 ml-4 group-hover:translate-x-2 transition-transform' />
              </span>
            </Button>

            <Link href='/contact'>
              <Button
                size='lg'
                variant='outline'
                className='group bg-white/10 backdrop-blur-md border-2 border-white/40 text-white hover:bg-white hover:text-gray-900 px-16 py-8 text-2xl font-bold transition-all duration-300 rounded-2xl hover:shadow-xl'
              >
                <Headphones className='w-8 h-8 mr-4 group-hover:scale-110 transition-transform' />
                Talk to Expert
              </Button>
            </Link>
          </div>

          {/* Bottom Stats */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
            <div className='bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20'>
              <div className='text-3xl font-black text-white mb-2'>10,000+</div>
              <div className='text-blue-200 font-semibold'>Happy Customers</div>
            </div>
            <div className='bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20'>
              <div className='text-3xl font-black text-white mb-2'>99.9%</div>
              <div className='text-blue-200 font-semibold'>Success Rate</div>
            </div>
            <div className='bg-white/10 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20'>
              <div className='text-3xl font-black text-white mb-2'>24/7</div>
              <div className='text-blue-200 font-semibold'>Expert Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
