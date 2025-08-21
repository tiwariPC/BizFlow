import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Palette, Users, Banknote, Wrench, TrendingUp, PenTool, BookOpen } from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

const allModules = [
  { key: "Compliance", label: "Compliance", icon: ShieldCheck, color: "from-green-500 to-green-600" },
  { key: "Branding", label: "Branding", icon: Palette, color: "from-indigo-500 to-indigo-600" },
  { key: "CRM", label: "CRM", icon: Users, color: "from-orange-500 to-orange-600" },
  { key: "Accounting", label: "Accounting", icon: Banknote, color: "from-emerald-500 to-emerald-600" },
  { key: "HRMS", label: "HRMS", icon: Wrench, color: "from-purple-500 to-purple-600" },
  { key: "Marketing", label: "Marketing", icon: TrendingUp, color: "from-orange-500 to-orange-600" },
  { key: "Design", label: "Design", icon: PenTool, color: "from-pink-500 to-pink-600" },
  { key: "Knowledge", label: "Knowledge", icon: BookOpen, color: "from-blue-500 to-blue-600" },
] as const;

type ModuleKey = typeof allModules[number]["key"];

export default function Store() {
  const [activated, setActivated] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('biz_activated_modules');
    if (saved) {
      try {
        const arr: string[] = JSON.parse(saved);
        const map: Record<string, boolean> = {};
        arr.forEach((k) => (map[k] = true));
        setActivated(map);
      } catch {}
    }
  }, []);

  const toggleModule = (key: string) => {
    setActivated((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const activeKeys = Object.entries(next).filter(([_, v]) => v).map(([k]) => k);
      localStorage.setItem('biz_activated_modules', JSON.stringify(activeKeys));
      return next;
    });
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Service Store</h1>
        <p className="text-neutral-600">Browse and activate modules to customize your workspace</p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">Available Modules</h2>
          <p className="text-neutral-600">Activate the modules you need for your business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allModules.map((m) => (
            <div key={m.key} className={`bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center shadow-lg`}>
                  <m.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">{m.label}</h3>
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
      </div>
    </DashboardLayout>
  );
}
