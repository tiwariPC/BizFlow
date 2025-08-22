import {
  Building,
  Facebook,
  Twitter,
  Linkedin,
  Phone,
  Mail,
  MapPin,
  Shield,
  Calculator,
  FileText,
  Users,
  Globe,
  Award,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'wouter';

export function Footer() {
  const footerSections = [
    {
      title: 'Business Services',
      links: [
        { label: 'Company Registration', href: '/company-registration' },
        { label: 'Private Limited Company', href: '/company-registration' },
        { label: 'One-Person Company', href: '/company-registration' },
        { label: 'Partnership & LLP', href: '/company-registration' },
        { label: 'Business License', href: '/company-registration' },
        { label: 'TAN Registration', href: '/gst-registration' },
        { label: 'PAN Application', href: '/gst-registration' },
        { label: 'Udyog Aadhar', href: '/gst-registration' },
      ],
    },
    {
      title: 'Tax & Compliance',
      links: [
        { label: 'ITR Filing', href: '/tax-filing' },
        { label: 'GST Filing', href: '/gst-registration' },
        { label: 'TDS Return Filing', href: '/tax-filing' },
        { label: 'Income Tax Notice', href: '/compliance' },
        { label: 'Professional Tax', href: '/tax-filing' },
        { label: 'Tax Planner', href: '/finance' },
        { label: 'HUF Registration', href: '/tax-filing' },
        { label: 'PF Withdrawal', href: '/tools' },
      ],
    },
    {
      title: 'Digital Services',
      links: [
        { label: 'Digital Signature', href: '/compliance' },
        { label: 'Trademarks', href: '/compliance' },
        { label: 'Legal Services', href: '/compliance' },
        { label: 'Schedule a Call', href: '/contact' },
        { label: 'MyBizCFO', href: '/finance' },
        { label: 'Accounting Services', href: '/finance' },
        { label: 'US Tax Filing', href: '/tax-filing' },
      ],
    },
    {
      title: 'Tools & Calculators',
      links: [
        { label: 'Tax Calculator', href: '/tools' },
        { label: 'EMI Calculator', href: '/tools' },
        { label: 'GST Calculator', href: '/tools' },
        { label: 'EPF Calculator', href: '/tools' },
        { label: 'SIP Calculator', href: '/tools' },
        { label: 'FD Calculator', href: '/tools' },
        { label: 'Rent Receipt Generator', href: '/tools' },
        { label: 'Currency Converter', href: '/tools' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '/help' },
        { label: 'Newsletter', href: '/help' },
        { label: 'Tax Guides', href: '/help' },
        { label: 'Form 16', href: '/help' },
        { label: 'Form 26AS', href: '/help' },
        { label: 'NPS Guide', href: '/help' },
        { label: 'Mutual Fund Guide', href: '/help' },
        { label: 'GST Guide', href: '/help' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Documentation', href: '/docs' },
        { label: 'Status Page', href: '/status' },
        { label: 'WhatsApp Support', href: '/contact' },
        { label: 'Tax Expert Chat', href: '/contact' },
        { label: 'Schedule a Call', href: '/contact' },
      ],
    },
  ];

  return (
    <footer className='bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Top Section with Logo, Contact, and Trust Indicators */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10'>
          {/* Logo and Description */}
          <div className='lg:col-span-1'>
            <div className='flex items-center mb-4'>
              <Building className='text-blue-500 text-3xl mr-3' />
              <span className='text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent'>
                BizFlow
              </span>
            </div>
            <p className='text-slate-300 mb-4 leading-relaxed text-sm'>
              Your trusted partner for comprehensive business solutions. From incorporation to compliance,
              we empower entrepreneurs with technology-driven services backed by expert guidance.
            </p>

            {/* Trust Indicators */}
            <div className='grid grid-cols-1 gap-2 mb-4'>
              <div className='flex items-center gap-2 text-slate-300'>
                <CheckCircle className='w-4 h-4 text-green-400 flex-shrink-0' />
                <span className='text-sm'>ISO 27001 Certified</span>
              </div>
              <div className='flex items-center gap-2 text-slate-300'>
                <Shield className='w-4 h-4 text-blue-400 flex-shrink-0' />
                <span className='text-sm'>256-bit SSL Encryption</span>
              </div>
              <div className='flex items-center gap-2 text-slate-300'>
                <Award className='w-4 h-4 text-yellow-400 flex-shrink-0' />
                <span className='text-sm'>Trusted by 50,000+ Businesses</span>
              </div>
            </div>

            {/* Social Links */}
            <div className='flex space-x-3'>
              <div className='w-9 h-9 bg-slate-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer'>
                <Facebook className='w-4 h-4' />
              </div>
              <div className='w-9 h-9 bg-slate-700 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer'>
                <Twitter className='w-4 h-4' />
              </div>
              <div className='w-9 h-9 bg-slate-700 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer'>
                <Linkedin className='w-4 h-4' />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className='lg:col-span-1'>
            <h3 className='text-lg font-semibold mb-4 text-white'>Contact Us</h3>
            <div className='space-y-3'>
              <div className='flex items-center gap-3 text-slate-300'>
                <Phone className='w-4 h-4 text-blue-400 flex-shrink-0' />
                <div>
                  <p className='font-medium text-sm'>+91 93219 08755</p>
                  <p className='text-xs text-slate-400'>24/7 Support</p>
                </div>
              </div>
              <div className='flex items-center gap-3 text-slate-300'>
                <Mail className='w-4 h-4 text-blue-400 flex-shrink-0' />
                <div>
                  <p className='font-medium text-sm'>support@bizflow.com</p>
                  <p className='text-xs text-slate-400'>Email Support</p>
                </div>
              </div>
              <div className='flex items-center gap-3 text-slate-300'>
                <MapPin className='w-4 h-4 text-blue-400 flex-shrink-0' />
                <div>
                  <p className='font-medium text-sm'>Mumbai, India</p>
                  <p className='text-xs text-slate-400'>Head Office</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className='lg:col-span-1'>
            <h3 className='text-lg font-semibold mb-4 text-white'>Quick Links</h3>
            <div className='grid grid-cols-1 gap-2'>
              <Link href='/services' className='text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm'>
                All Services
              </Link>
              <Link href='/pricing' className='text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm'>
                Pricing Plans
              </Link>
              <Link href='/about' className='text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm'>
                About Us
              </Link>
              <Link href='/careers' className='text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm'>
                Careers
              </Link>
              <Link href='/partners' className='text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm'>
                Partner Program
              </Link>
              <Link href='/api' className='text-slate-300 hover:text-blue-400 transition-colors duration-200 text-sm'>
                API Documentation
              </Link>
            </div>
          </div>
        </div>

        {/* Service Categories Grid - Optimized Layout */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8'>
          {footerSections.map(section => (
            <div key={section.title} className='min-w-0'>
              <h3 className='text-base font-semibold mb-3 text-white flex items-center gap-2'>
                {section.title}
                <ArrowRight className='w-3 h-3 text-blue-400 flex-shrink-0' />
              </h3>
              <ul className='space-y-1.5'>
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className='text-slate-300 hover:text-blue-400 transition-colors duration-200 text-xs leading-relaxed block truncate'
                      title={link.label}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className='border-t border-slate-700 pt-6'>
          <div className='flex flex-col lg:flex-row justify-between items-center gap-4'>
            <div className='flex items-center gap-4 text-slate-400 text-xs'>
              <span>© 2024 BizFlow. All rights reserved.</span>
              <span>•</span>
              <span>SSBA Innovations Ltd.</span>
            </div>

            <div className='flex flex-wrap gap-4 text-xs text-slate-400'>
              <Link href='/privacy' className='hover:text-blue-400 transition-colors duration-200'>
                Privacy Policy
              </Link>
              <Link href='/terms' className='hover:text-blue-400 transition-colors duration-200'>
                Terms of Service
              </Link>
              <Link href='/cookies' className='hover:text-blue-400 transition-colors duration-200'>
                Cookie Policy
              </Link>
              <Link href='/security' className='hover:text-blue-400 transition-colors duration-200'>
                Security Policy
              </Link>
              <Link href='/refund' className='hover:text-blue-400 transition-colors duration-200'>
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
