import { motion } from "framer-motion";
import { Calculator, FileText, Clock, Shield } from "lucide-react";

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

const taxServices = [
  {
    title: "Income Tax Return (ITR)",
    description: "File your personal or business income tax returns",
    price: "₹999",
    time: "Same day filing",
    features: ["ITR preparation", "Document verification", "E-filing", "Acknowledgment"]
  },
  {
    title: "GST Return Filing",
    description: "Monthly, quarterly, and annual GST returns",
    price: "₹1,499",
    time: "Within 24 hours",
    features: ["GSTR-1, GSTR-3B", "Input tax credit", "Reconciliation", "Compliance report"]
  },
  {
    title: "TDS Return Filing",
    description: "Quarterly TDS returns for businesses",
    price: "₹799",
    time: "Same day filing",
    features: ["Form 24Q, 26Q", "TDS calculation", "Challan generation", "Compliance tracking"]
  }
];

export default function TaxFiling() {
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 mb-6 shadow-lg">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Tax Filing Services
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Professional tax filing services to ensure compliance and maximize your returns
          </p>
        </motion.div>

        {/* Info Card */}
        <motion.div
          className="rounded-2xl p-8 mb-12 bg-gradient-to-r from-purple-5 to-purple-10 border border-purple-20 shadow-sm"
          variants={itemVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Why Choose Our Tax Filing Services?
            </h2>
            <p className="text-lg text-neutral-700 mb-6">
              Our expert team ensures accurate tax filing, timely submissions, and maximum tax savings.
              We handle all types of tax returns with complete compliance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "100% Compliance", desc: "Ensure timely and accurate filing" },
                { icon: Clock, title: "Quick Processing", desc: "Same day or next day filing" },
                { icon: FileText, title: "Expert Support", desc: "Professional tax consultants" }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="flex flex-col items-center p-4 rounded-lg bg-white/80 border border-purple-20"
                  whileHover={{ scale: 1.05 }}
                >
                  <benefit.icon className="w-8 h-8 text-purple-600 mb-2" />
                  <h3 className="font-semibold text-neutral-900 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-neutral-600 text-center">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tax Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {taxServices.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{service.title}</h3>
              <p className="text-neutral-600 mb-4">{service.description}</p>
              <div className="text-3xl font-bold text-purple-600 mb-2">{service.price}</div>
              <div className="text-sm text-neutral-500 mb-6">Processing time: {service.time}</div>
              <div className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-sm text-neutral-700">{feature}</span>
                  </div>
                ))}
              </div>
              <motion.button
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transition-shadow duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">Simple Tax Filing Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Document Upload", desc: "Upload your tax documents" },
              { step: "2", title: "Review & Calculate", desc: "We review and calculate taxes" },
              { step: "3", title: "File Returns", desc: "E-file your tax returns" },
              { step: "4", title: "Confirmation", desc: "Receive filing confirmation" }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                className="text-center"
                variants={itemVariants}
              >
                <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center mx-auto mb-4 font-bold">
                  {process.step}
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{process.title}</h3>
                <p className="text-sm text-neutral-600">{process.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}


