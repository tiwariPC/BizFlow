import { motion } from "framer-motion";
import { Scale, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const complianceTypes = [
  "GST Filing",
  "ITR Filing",
  "ROC Filings",
  "Labour Laws",
  "Trademarks",
  "Licenses",
] as const;

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

const buttonVariants = {
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.98,
  },
};

export function ComplianceBlock() {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-8 flex flex-col h-full">
        {/* Header */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          variants={itemVariants}
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Compliance & Legal</h2>
            <p className="text-neutral-600">Stay compliant with all regulations</p>
          </div>
        </motion.div>

        {/* Compliance Types Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 flex-1"
          variants={containerVariants}
        >
          {complianceTypes.map((type, index) => (
            <motion.div
              key={type}
              className="flex items-center gap-2 p-3 rounded-lg bg-white border border-neutral-200 hover:bg-green-50 hover:border-green-300 transition-colors duration-200 shadow-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-neutral-800">{type}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Explore Button */}
        <motion.div variants={itemVariants} className="mt-auto">
          <Link href="/compliance">
            <motion.button
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-shadow duration-200"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Explore Compliance Tools
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
