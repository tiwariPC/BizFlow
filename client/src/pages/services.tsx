import { motion } from 'framer-motion';
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
} from 'lucide-react';
import { Link } from 'wouter';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3 }
  }
};

const serviceCategories = [
  {
    title: 'Business Setup & Compliance',
    icon: ShieldCheck,
    description: 'Registrations, compliance calendar, and legal docs',
    href: '/compliance',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
    items: [
      { text: 'Company Incorporation (Pvt Ltd, LLP, OPC, etc.)', href: '/company-registration' },
      { text: 'GST, PAN, TAN, PF, ESI registration', href: '/gst-registration' },
      { text: 'Compliance Calendar (ROC, GST filing reminders, etc.)', href: '/compliance' },
      { text: 'Legal Document Library (MOA, AOA, NDA, agreements)', href: '/compliance' },
      { text: 'Onboarding Checklist for new businesses', href: '/compliance' },
    ],
  },
  {
    title: 'Finance & Accounting',
    icon: Banknote,
    description: 'Invoicing, expenses, bookkeeping, and payments',
    href: '/finance',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    items: [
      { text: 'Invoicing & Billing', href: '/finance' },
      { text: 'Expense Tracking', href: '/finance' },
      { text: 'Basic Bookkeeping', href: '/finance' },
      { text: 'Tax Filing integration (India specific first, expand later)', href: '/tax-filing' },
      { text: 'Payment Gateway integration', href: '/finance' },
    ],
  },
  {
    title: 'Branding & Identity',
    icon: Palette,
    description: 'Visual identity and brand assets',
    href: '/growth',
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
    bgGradient: 'from-purple-50 to-pink-50',
    items: [
      { text: 'Logo design (AI + designer marketplace)', href: '/growth' },
      { text: 'Brand kit generator (colors, fonts, templates)', href: '/growth' },
      { text: 'Business cards, letterhead, pitch deck templates', href: '/growth' },
    ],
  },
  {
    title: 'Marketing & Sales',
    icon: TrendingUp,
    description: 'Web presence, campaigns, CRM, and messaging',
    href: '/growth',
    color: 'orange',
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    items: [
      { text: 'Website Builder (drag & drop)', href: '/growth' },
      { text: 'Social Media Marketing Tools (post scheduler, analytics)', href: '/growth' },
      { text: 'Email Marketing (campaigns, templates, automation)', href: '/growth' },
      { text: 'CRM for leads & customer management', href: '/growth' },
      { text: 'WhatsApp/Telegram marketing integration', href: '/growth' },
    ],
  },
  {
    title: 'Graphic & Content Services',
    icon: PenTool,
    description: 'On-demand design and content creation',
    href: '/marketplace',
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600',
    bgGradient: 'from-rose-50 to-pink-50',
    items: [
      {
        text: 'On-demand graphic design services (flyers, posters, banners)',
        href: '/marketplace',
      },
      { text: 'Content writing/copywriting hub', href: '/marketplace' },
      { text: 'Video/animation creation services', href: '/marketplace' },
    ],
  },
  {
    title: 'HR & Team',
    icon: Users,
    description: 'Hiring, onboarding, payroll, and attendance',
    href: '/tools',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-50 to-blue-50',
    items: [
      { text: 'Recruitment/job posting', href: '/tools' },
      { text: 'Employee onboarding', href: '/tools' },
      { text: 'Payroll & compliance (PF/ESI/TDS auto-calculations)', href: '/tools' },
      { text: 'Attendance & leave management', href: '/tools' },
    ],
  },
  {
    title: 'Learning & Community',
    icon: BookOpen,
    description: 'Resources, community, and events',
    href: '/help',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-50 to-purple-50',
    items: [
      { text: 'Knowledge Hub (articles, compliance guides, startup playbooks)', href: '/help' },
      { text: 'Community Forum (entrepreneurs connect, mentor Q&A)', href: '/help' },
      { text: 'Events/Webinars integration', href: '/help' },
    ],
  },
] as const;

export default function Services() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full blur-3xl'></div>
      </div>

      <motion.div
        className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {/* Header Section */}
        <motion.div className='text-center mb-20' variants={itemVariants}>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/20 shadow-sm mb-6'>
            <Sparkles className='w-4 h-4 text-blue-600' />
            <span className='text-sm font-medium text-slate-700'>Comprehensive Business Solutions</span>
          </div>

          <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-6'>
            Our Services
          </h1>

          <p className='text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed'>
            Comprehensive business solutions to help you start, grow, and manage your enterprise with confidence
          </p>
        </motion.div>

        {/* Service Categories Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'>
          {serviceCategories.map((category, index) => {
            const IconComponent = category.icon;

            return (
              <motion.div
                key={category.title}
                className='group relative'
                variants={cardVariants}
                whileHover='hover'
              >
                {/* Card */}
                <div className={`relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-xl shadow-slate-200/50 overflow-hidden h-full flex flex-col transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-300/50`}>
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                  <div className='relative p-8 flex flex-col h-full'>
                    {/* Header */}
                    <div className='flex items-start gap-4 mb-8'>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg shadow-slate-200/50 group-hover:shadow-xl transition-shadow duration-300`}>
                        <IconComponent className='w-8 h-8 text-white' />
                      </div>
                      <div className='flex-1'>
                        <h2 className='text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors duration-300'>
                          {category.title}
                        </h2>
                        <p className='text-slate-600 leading-relaxed'>{category.description}</p>
                      </div>
                    </div>

                    {/* Service Items */}
                    <div className='space-y-3 mb-8 flex-1'>
                      {category.items.map((item, itemIndex) => (
                        <Link key={item.text} href={item.href}>
                          <motion.div
                            className='flex items-center gap-3 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 hover:bg-white/80 hover:border-white/50 transition-all duration-300 cursor-pointer group/item'
                            whileHover={{ x: 4 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient} flex-shrink-0`} />
                            <span className='text-sm font-medium text-slate-700 group-hover/item:text-slate-900 transition-colors duration-200 leading-relaxed'>
                              {item.text}
                            </span>
                          </motion.div>
                        </Link>
                      ))}
                    </div>

                    {/* Explore Button */}
                    <div className='mt-auto'>
                      <Link href={category.href}>
                        <motion.button
                          className={`w-full bg-gradient-to-r ${category.gradient} text-white py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-slate-300/50 transition-all duration-300 group/btn`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>Explore {category.title}</span>
                          <ArrowRight className='w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200' />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div className='text-center' variants={itemVariants}>
          <div className='max-w-4xl mx-auto'>
            <div className='bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-xl shadow-slate-200/50 p-12'>
              <div className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm font-medium mb-6'>
                <CheckCircle className='w-4 h-4' />
                Custom Solutions Available
              </div>

              <h3 className='text-3xl md:text-4xl font-bold text-slate-900 mb-4'>
                Need Custom Solutions?
              </h3>

              <p className='text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
                Our expert team can create tailored solutions for your specific business requirements and industry needs.
              </p>

              <motion.button
                className='inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:shadow-lg hover:shadow-blue-300/50 transition-all duration-300 group'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Contact Our Experts</span>
                <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-200' />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
