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
} from 'lucide-react';
import { Link } from 'wouter';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 },
  },
};

const serviceCategories = [
  {
    title: 'Business Setup & Compliance',
    icon: ShieldCheck,
    description: 'Registrations, compliance calendar, and legal docs',
    href: '/compliance',
    color: 'green',
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
    color: 'emerald',
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
    color: 'indigo',
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
    color: 'purple',
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
    color: 'blue',
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
    color: 'indigo',
    items: [
      { text: 'Knowledge Hub (articles, compliance guides, startup playbooks)', href: '/help' },
      { text: 'Community Forum (entrepreneurs connect, mentor Q&A)', href: '/help' },
      { text: 'Events/Webinars integration', href: '/help' },
    ],
  },
] as const;

const getColorClasses = (color: string) => {
  const colors = {
    blue: {
      icon: 'from-blue-500 to-blue-600',
      hover: 'hover:bg-blue-50 hover:border-blue-200',
      dot: 'bg-blue-500',
      button: 'from-blue-500 to-blue-600',
    },
    green: {
      icon: 'from-green-500 to-green-600',
      hover: 'hover:bg-green-50 hover:border-green-200',
      dot: 'bg-green-500',
      button: 'from-green-500 to-green-600',
    },
    purple: {
      icon: 'from-purple-500 to-purple-600',
      hover: 'hover:bg-purple-50 hover:border-purple-200',
      dot: 'bg-purple-500',
      button: 'from-purple-500 to-purple-600',
    },
    emerald: {
      icon: 'from-emerald-500 to-emerald-600',
      hover: 'hover:bg-emerald-50 hover:border-emerald-200',
      dot: 'bg-emerald-500',
      button: 'from-emerald-500 to-emerald-600',
    },
    orange: {
      icon: 'from-orange-500 to-orange-600',
      hover: 'hover:bg-orange-50 hover:border-orange-200',
      dot: 'bg-orange-500',
      button: 'from-orange-500 to-orange-600',
    },
    indigo: {
      icon: 'from-indigo-500 to-indigo-600',
      hover: 'hover:bg-indigo-50 hover:border-indigo-200',
      dot: 'bg-indigo-500',
      button: 'from-indigo-500 to-indigo-600',
    },
  };
  return colors[color as keyof typeof colors] || colors.blue;
};

export default function Services() {
  return (
    <motion.div
      className='min-h-screen bg-gradient-to-br from-neutral-50 to-white'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Header Section */}
        <motion.div className='text-center mb-12' variants={itemVariants}>
          <h1 className='text-4xl md:text-5xl font-bold text-neutral-900 mb-4'>Our Services</h1>
          <p className='text-xl text-neutral-600 max-w-3xl mx-auto'>
            Comprehensive business solutions to help you start, grow, and manage your enterprise
          </p>
        </motion.div>

        {/* Service Categories Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {serviceCategories.map((category, index) => {
            const colors = getColorClasses(category.color);
            const IconComponent = category.icon;

            return (
              <motion.div
                key={category.title}
                className='bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col'
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className='p-8 flex flex-col h-full'>
                  {/* Header */}
                  <div className='flex items-center gap-3 mb-6'>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.icon} flex items-center justify-center shadow-lg`}
                    >
                      <IconComponent className='w-6 h-6 text-white' />
                    </div>
                    <div>
                      <h2 className='text-xl font-bold text-neutral-900'>{category.title}</h2>
                      <p className='text-sm text-neutral-600'>{category.description}</p>
                    </div>
                  </div>

                  {/* Service Items Grid */}
                  <div className='grid grid-cols-2 gap-3 mb-8 flex-1'>
                    {category.items.map((item, itemIndex) => (
                      <Link key={item.text} href={item.href}>
                        <div
                          className={
                            'flex items-center gap-2 p-3 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 transition-colors duration-200 cursor-pointer shadow-sm'
                          }
                        >
                          <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                          <span className='text-sm font-medium text-neutral-800'>{item.text}</span>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Explore Button */}
                  <div className='mt-auto'>
                    <Link href={category.href}>
                      <motion.button
                        className={`w-full bg-gradient-to-r ${colors.button} text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow duration-200`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Explore {category.title}
                        <svg
                          className='w-4 h-4'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M5 12h14' />
                          <path d='m12 5 7 7-7 7' />
                        </svg>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div className='mt-16 text-center' variants={itemVariants}>
          <div className='max-w-3xl mx-auto'>
            <h3 className='text-2xl font-semibold text-neutral-900 mb-4'>Need Custom Solutions?</h3>
            <p className='text-neutral-600 mb-6'>
              Our team can create tailored solutions for your specific business requirements.
            </p>
            <motion.button
              className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Our Experts
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
