import { useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CompanyRegistration() {
  useEffect(() => {
    // Redirect to incorporation page after a brief delay
    const timer = setTimeout(() => {
      window.location.href = "/incorporation";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-neutral-50 to-white flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 mb-8 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <Building2 className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Company Registration
        </motion.h1>

        <motion.p
          className="text-xl text-neutral-600 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Redirecting you to our comprehensive business incorporation services...
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={() => window.location.href = "/incorporation"}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Go to Incorporation Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>

        <motion.p
          className="text-sm text-neutral-500 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          You will be automatically redirected in a few seconds...
        </motion.p>
      </div>
    </motion.div>
  );
}

