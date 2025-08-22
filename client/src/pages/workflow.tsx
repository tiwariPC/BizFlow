import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Play, Rocket, PenTool, TrendingUp } from 'lucide-react';

const steps = [
  {
    phase: 'Incorporation',
    color: 'text-blue-600',
    items: [
      { key: 'inc_docs', label: 'Submit incorporation documents' },
      { key: 'inc_cin', label: 'Receive CIN/LLPIN' },
      { key: 'inc_gst', label: 'Apply for GST/PAN/TAN' },
    ],
  },
  {
    phase: 'Branding',
    color: 'text-indigo-600',
    items: [
      { key: 'brand_logo', label: 'Create logo & brand kit' },
      { key: 'brand_docs', label: 'Prepare letterhead/cards/templates' },
    ],
  },
  {
    phase: 'Launch',
    color: 'text-emerald-600',
    items: [
      { key: 'launch_site', label: 'Publish website' },
      { key: 'launch_accounts', label: 'Open current account & payment gateway' },
    ],
  },
  {
    phase: 'Marketing',
    color: 'text-orange-600',
    items: [
      { key: 'mkt_social', label: 'Schedule social posts' },
      { key: 'mkt_email', label: 'Send first email campaign' },
      { key: 'mkt_crm', label: 'Set up CRM pipeline' },
    ],
  },
];

export default function Workflow() {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('biz_workflow_completed');
    if (saved) {
      try {
        setCompleted(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const toggle = (key: string) => {
    setCompleted(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem('biz_workflow_completed', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-50 to-white'>
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='text-center mb-10'>
          <h1 className='text-3xl md:text-4xl font-bold text-neutral-900 mb-2'>Guided Workflow</h1>
          <p className='text-neutral-600'>
            Follow the step-by-step checklist from incorporation to launch and marketing
          </p>
        </div>

        <div className='space-y-8'>
          {steps.map(group => (
            <div
              key={group.phase}
              className='bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm'
            >
              <div className={`text-lg font-semibold mb-4 ${group.color}`}>{group.phase}</div>
              <div className='space-y-3'>
                {group.items.map(it => (
                  <button
                    key={it.key}
                    onClick={() => toggle(it.key)}
                    className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg border transition-colors ${completed[it.key] ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-neutral-200 hover:bg-neutral-50'}`}
                  >
                    {completed[it.key] ? (
                      <CheckCircle2 className='w-5 h-5 text-emerald-600' />
                    ) : (
                      <Circle className='w-5 h-5 text-neutral-500' />
                    )}
                    <span className='text-sm text-neutral-900'>{it.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
