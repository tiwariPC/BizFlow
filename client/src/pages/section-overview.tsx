import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Palette,
  PenTool,
  Users,
  BookOpen,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Lock,
  UserPlus,
  ArrowUpRight,
  Star,
  Clock,
  Target,
  Zap,
} from 'lucide-react';

interface SectionData {
  title: string;
  icon: any;
  description: string;
  features: string[];
  benefits: string[];
  pricing: string;
  timeToSetup: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
  gradient: string;
  bgGradient: string;
  href: string;
  relatedServices: string[];
}

const sectionData: Record<string, SectionData> = {
  'business-setup-compliance': {
    title: 'Business Setup & Compliance',
    icon: ShieldCheck,
    description: 'Complete business incorporation and compliance management solutions to help you start and run your business legally and efficiently.',
    features: [
      'Company Incorporation (Pvt Ltd, LLP, OPC, etc.)',
      'GST, PAN, TAN, PF, ESI registration',
      'Compliance Calendar (ROC, GST filing reminders)',
      'Legal Document Library (MOA, AOA, NDA, agreements)',
      'Onboarding Checklist for new businesses',
      'ROC compliance and annual filings',
      'Tax registration and compliance',
      'Business license management'
    ],
    benefits: [
      'Start your business legally and quickly',
      'Stay compliant with all regulations',
      'Automated reminders for important deadlines',
      'Professional legal document templates',
      'Expert guidance throughout the process',
      'Save time and avoid penalties',
      'Build trust with customers and partners'
    ],
    pricing: 'Starting from ₹2,999',
    timeToSetup: '3-7 business days',
    difficulty: 'Beginner',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
    href: '/compliance',
    relatedServices: ['GST Registration', 'Company Registration', 'Tax Filing', 'Legal Services']
  },
  'finance-accounting': {
    title: 'Finance & Accounting',
    icon: Banknote,
    description: 'Professional financial management tools for invoicing, expense tracking, bookkeeping, and payment processing.',
    features: [
      'Invoicing & Billing Management',
      'Expense Tracking & Categorization',
      'Basic Bookkeeping & Accounting',
      'Tax Filing Integration',
      'Payment Gateway Integration',
      'Financial Reports & Analytics',
      'Bank Account Management',
      'Multi-currency Support'
    ],
    benefits: [
      'Professional invoice generation',
      'Track expenses and income easily',
      'Automated financial calculations',
      'Tax-ready financial reports',
      'Accept online payments',
      'Better cash flow management',
      'Compliance with accounting standards'
    ],
    pricing: 'Starting from ₹1,999/month',
    timeToSetup: '1-2 business days',
    difficulty: 'Beginner',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    href: '/finance',
    relatedServices: ['Invoicing', 'Expense Tracking', 'Tax Filing', 'Payment Processing']
  },
  'branding-identity': {
    title: 'Branding & Identity',
    icon: Palette,
    description: 'Create a strong visual identity and brand assets that help your business stand out and connect with customers.',
    features: [
      'Logo Design (AI + Designer Marketplace)',
      'Brand Kit Generator (Colors, Fonts, Templates)',
      'Business Cards & Letterhead Design',
      'Pitch Deck Templates',
      'Brand Guidelines Creation',
      'Social Media Templates',
      'Marketing Collateral Design',
      'Brand Identity Audit'
    ],
    benefits: [
      'Professional brand appearance',
      'Consistent visual identity',
      'Faster brand recognition',
      'Better customer trust',
      'Competitive advantage',
      'Scalable brand assets',
      'Professional marketing materials'
    ],
    pricing: 'Starting from ₹4,999',
    timeToSetup: '5-10 business days',
    difficulty: 'Intermediate',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    bgGradient: 'from-purple-50 to-pink-50',
    href: '/growth',
    relatedServices: ['Logo Design', 'Brand Design', 'Marketing Materials', 'Visual Identity']
  },
  'marketing-sales': {
    title: 'Marketing & Sales',
    icon: TrendingUp,
    description: 'Comprehensive marketing and sales tools to help you reach customers, generate leads, and grow your business.',
    features: [
      'Website Builder (Drag & Drop)',
      'Social Media Marketing Tools',
      'Email Marketing Campaigns',
      'CRM for Lead Management',
      'WhatsApp/Telegram Integration',
      'SEO & Analytics Tools',
      'Content Management System',
      'Marketing Automation'
    ],
    benefits: [
      'Professional online presence',
      'Reach more customers',
      'Automate marketing processes',
      'Track campaign performance',
      'Generate quality leads',
      'Increase sales conversions',
      'Build customer relationships'
    ],
    pricing: 'Starting from ₹3,999/month',
    timeToSetup: '2-5 business days',
    difficulty: 'Intermediate',
    color: 'orange',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    href: '/growth',
    relatedServices: ['Website Building', 'Social Media Marketing', 'Email Marketing', 'CRM']
  },
  'graphic-content-services': {
    title: 'Graphic & Content Services',
    icon: PenTool,
    description: 'Professional design and content creation services to help you create compelling visual and written content.',
    features: [
      'On-demand Graphic Design',
      'Content Writing & Copywriting',
      'Video & Animation Creation',
      'Social Media Graphics',
      'Print Design Services',
      'Brand Collateral Design',
      'Content Strategy',
      'Design Consultation'
    ],
    benefits: [
      'Professional quality content',
      'Save time on design tasks',
      'Consistent brand messaging',
      'Engage your audience better',
      'Professional appearance',
      'Scalable content creation',
      'Expert design guidance'
    ],
    pricing: 'Starting from ₹1,999 per project',
    timeToSetup: '3-7 business days',
    difficulty: 'Intermediate',
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    bgGradient: 'from-rose-50 to-pink-50',
    href: '/marketplace',
    relatedServices: ['Graphic Design', 'Content Writing', 'Video Creation', 'Design Services']
  },
  'hr-team': {
    title: 'HR & Team Management',
    icon: Users,
    description: 'Complete human resources and team management solutions for hiring, onboarding, payroll, and employee management.',
    features: [
      'Recruitment & Job Posting',
      'Employee Onboarding',
      'Payroll & Compliance',
      'Attendance & Leave Management',
      'Performance Management',
      'Training & Development',
      'Employee Self-Service Portal',
      'HR Analytics & Reporting'
    ],
    benefits: [
      'Streamlined hiring process',
      'Compliant payroll management',
      'Better employee experience',
      'Automated HR processes',
      'Compliance with labor laws',
      'Improved team productivity',
      'Professional HR management'
    ],
    pricing: 'Starting from ₹2,999/month',
    timeToSetup: '3-5 business days',
    difficulty: 'Intermediate',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-50 to-blue-50',
    href: '/tools',
    relatedServices: ['Recruitment', 'Payroll', 'HR Management', 'Team Tools']
  },
  'learning-community': {
    title: 'Learning & Community',
    icon: BookOpen,
    description: 'Knowledge resources, community forums, and learning opportunities to help you grow your business and skills.',
    features: [
      'Knowledge Hub & Articles',
      'Compliance Guides',
      'Startup Playbooks',
      'Community Forum',
      'Mentor Q&A Sessions',
      'Events & Webinars',
      'Resource Library',
      'Expert Consultations'
    ],
    benefits: [
      'Access to expert knowledge',
      'Learn from other entrepreneurs',
      'Stay updated with regulations',
      'Network with peers',
      'Get expert advice',
      'Continuous learning',
      'Community support'
    ],
    pricing: 'Free + Premium plans from ₹999/month',
    timeToSetup: 'Immediate access',
    difficulty: 'Beginner',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-50 to-purple-50',
    href: '/help',
    relatedServices: ['Knowledge Hub', 'Community Forum', 'Learning Resources', 'Expert Guidance']
  }
};

export default function SectionOverview() {
  const [location] = useLocation();
  const [match, params] = useRoute('/section/:sectionId');
  const [sectionId, setSectionId] = useState<string>('');
  const [section, setSection] = useState<SectionData | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (match && params?.sectionId) {
      setSectionId(params.sectionId);
      setSection(sectionData[params.sectionId] || null);
    }
  }, [match, params]);

  useEffect(() => {
    setUser(authService.getUser());
  }, []);

  // If user is signed in, redirect to the actual section
  useEffect(() => {
    if (user && section) {
      window.location.href = section.href;
    }
  }, [user, section]);

  if (!section) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Section Not Found</h1>
          <p className="text-gray-600 mb-4">The requested section could not be found.</p>
          <Link href="/services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = section.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br ${section.bgGradient} rounded-full blur-3xl opacity-30`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br ${section.bgGradient} rounded-full blur-3xl opacity-30`}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 shadow-sm mb-6">
            <IconComponent className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">{section.title}</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-6">
            {section.title}
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8">
            {section.description}
          </p>

          {/* Access Control Banner */}
          <div className="max-w-2xl mx-auto">
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-6 h-6 text-orange-600" />
                  <h3 className="text-lg font-semibold text-orange-900">Sign in to Access Full Features</h3>
                </div>
                <p className="text-orange-800 mb-4">
                  This section requires authentication to access all features and tools. Sign in to explore the complete functionality.
                </p>
                <div className="flex gap-3 justify-center">
                  <Link href="/">
                    <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Section Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      <span className="text-slate-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Additional Information */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Difficulty Level</h3>
              <Badge variant={section.difficulty === 'Beginner' ? 'default' : section.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                {section.difficulty}
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Setup Time</h3>
              <p className="text-slate-600">{section.timeToSetup}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Banknote className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Starting Price</h3>
              <p className="text-slate-600">{section.pricing}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5 text-blue-600" />
                Related Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {section.relatedServices.map((service, index) => (
                  <Badge key={index} variant="outline" className="text-slate-700 border-slate-300">
                    {service}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                  Sign in to access all features and start using {section.title.toLowerCase()} tools and services.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link href="/">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Create Account
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button size="lg" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
