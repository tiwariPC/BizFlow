import { useQuery } from "@tanstack/react-query";
import { ServicePackage } from "@shared/schema";
import { ServiceCard } from "@/components/service-card";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

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

export default function Incorporation() {
  const { data: packages = [], isLoading } = useQuery<ServicePackage[]>({
    queryKey: ["/api/packages"],
  });

  const handleServiceSelect = (packageId: string) => {
    window.location.href = `/services?package=${packageId}`;
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-neutral-50 to-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 mb-6 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Business Incorporation
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Choose the right business structure for your entrepreneurial journey
          </p>
        </motion.div>

        {/* Info Card */}
        <motion.div
          className="rounded-2xl p-8 mb-12 bg-gradient-to-r from-blue-600/5 to-blue-600/10 border border-blue-600/20 shadow-sm"
          variants={itemVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Choose Your Business Structure
            </h2>
            <p className="text-lg text-neutral-700 mb-6">
              Select the incorporation option that best fits your business needs and goals.
              Each structure offers different benefits in terms of liability, compliance, and growth potential.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {["Sole Prop", "Partnership", "LLP", "OPC", "Pvt Ltd", "Public Ltd"].map((type, index) => (
                <motion.div
                  key={type}
                  className="flex items-center justify-center p-3 rounded-lg bg-white/80 border border-blue-600/20 hover:bg-white hover:shadow-md transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-medium text-neutral-700">{type}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div variants={containerVariants}>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="animate-pulse"
                  variants={itemVariants}
                >
                  <div className="bg-neutral-200 rounded-xl h-64"></div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="services-grid">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ServiceCard
                    package={pkg}
                    onSelect={handleServiceSelect}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-neutral-600 mb-6">
              Our expert team can guide you through the selection process and help you understand
              the implications of each business structure.
            </p>
            <motion.button
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Expert Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
