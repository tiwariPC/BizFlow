import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Palette, Users, Check, Store } from 'lucide-react';
import { Link } from 'wouter';

const defaultModules = [
  {
    key: 'Compliance',
    label: 'Compliance',
    icon: ShieldCheck,
    color: 'from-green-500 to-green-600',
  },
  { key: 'Branding', label: 'Branding', icon: Palette, color: 'from-indigo-500 to-indigo-600' },
  { key: 'CRM', label: 'CRM', icon: Users, color: 'from-orange-500 to-orange-600' },
] as const;

type ModuleKey = (typeof defaultModules)[number]['key'];

export default function Setup() {
  const [businessType, setBusinessType] = useState<string | null>(null);
  const [activated, setActivated] = useState<Record<ModuleKey, boolean>>({
    Compliance: true,
    Branding: true,
    CRM: true,
  });

  useEffect(() => {
    const bt = localStorage.getItem('biz_business_type');
    setBusinessType(bt);
    const saved = localStorage.getItem('biz_activated_modules');
    if (saved) {
      try {
        const arr: string[] = JSON.parse(saved);
        setActivated(prev => ({
          Compliance: arr.includes('Compliance'),
          Branding: arr.includes('Branding'),
          CRM: arr.includes('CRM'),
        }));
      } catch {}
    }
  }, []);

  const toggleModule = (key: ModuleKey) => {
    setActivated(prev => {
      const next = { ...prev, [key]: !prev[key] };
      const activeKeys = Object.entries(next)
        .filter(([_, v]) => v)
        .map(([k]) => k);
      localStorage.setItem('biz_activated_modules', JSON.stringify(activeKeys));
      return next;
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-50 to-white'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-10'>
          <h1 className='text-3xl md:text-4xl font-bold text-neutral-900 mb-2'>
            Setup Your Dashboard
          </h1>
          <p className='text-neutral-600'>
            Business type: <span className='font-medium'>{businessType ?? 'Not selected'}</span>
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {defaultModules.map(m => (
            <div
              key={m.key}
              className={'bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm'}
            >
              <div className='flex items-center gap-3 mb-4'>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center shadow-lg`}
                >
                  <m.icon className='w-6 h-6 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-neutral-900'>{m.label}</h3>
              </div>
              <button
                onClick={() => toggleModule(m.key)}
                className={`w-full rounded-lg border px-4 py-2 text-sm transition-colors ${activated[m.key] ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-neutral-800 border-neutral-300 hover:bg-neutral-50'}`}
              >
                {activated[m.key] ? 'Activated' : 'Activate'}
              </button>
            </div>
          ))}
        </div>

        <div className='text-center mt-10'>
          <Link href='/store'>
            <button className='inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg hover:shadow-xl'>
              Go to Service Store
              <Store className='w-4 h-4' />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
