import { motion } from "framer-motion";
import { Receipt, FileText, Clock, Shield } from "lucide-react";

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

const gstPackages = [
  {
    title: "Basic GST Registration",
    description: "Essential GST registration for small businesses",
    price: "₹1,999",
    time: "3-5 days",
    features: ["GST registration certificate", "Digital signature certificate", "Basic compliance guidance", "Email support"]
  },
  {
    title: "Standard GST Registration",
    description: "Complete GST registration with compliance support",
    price: "₹3,999",
    time: "2-3 days",
    features: ["GST registration certificate", "Digital signature certificate", "Compliance calendar", "Priority support", "GST filing assistance"]
  },
  {
    title: "Premium GST Registration",
    description: "Full-service GST registration with ongoing support",
    price: "₹5,999",
    time: "1-2 days",
    features: ["GST registration certificate", "Digital signature certificate", "Compliance calendar", "Priority support", "GST filing assistance", "Quarterly compliance review", "Dedicated account manager"]
  }
];

export default function GSTRegistration() {
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 mb-6 shadow-lg">
            <Receipt className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            GST Registration
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Get your GST registration done quickly and efficiently with our expert assistance
          </p>
        </motion.div>

        {/* Info Card */}
        <motion.div
          className="rounded-2xl p-8 mb-12 bg-gradient-to-r from-green-5 to-green-10 border border-green-20 shadow-sm"
          variants={itemVariants}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Why GST Registration is Important?
            </h2>
            <p className="text-lg text-neutral-700 mb-6">
              GST registration is mandatory for businesses with annual turnover above ₹20 lakhs.
              It enables you to collect and claim GST, making your business compliant with tax laws.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Shield, title: "Legal Compliance", desc: "Stay compliant with tax laws" },
                { icon: FileText, title: "Input Tax Credit", desc: "Claim GST on purchases" },
                { icon: Clock, title: "Quick Processing", desc: "Get registered in 1-5 days" }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="flex flex-col items-center p-4 rounded-lg bg-white/80 border border-green-20"
                  whileHover={{ scale: 1.05 }}
                >
                  <benefit.icon className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="font-semibold text-neutral-900 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-neutral-600 text-center">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* GST Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {gstPackages.map((pkg, index) => (
            <motion.div
              key={pkg.title}
              className={`bg-white rounded-2xl border p-8 shadow-sm hover:shadow-md transition-shadow duration-300 ${
                index === 1 ? 'border-green-500 ring-2 ring-green-100' : 'border-neutral-200'
              }`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {index === 1 && (
                <div className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold text-neutral-900 mb-2">{pkg.title}</h3>
              <p className="text-neutral-600 mb-4">{pkg.description}</p>
              <div className="text-3xl font-bold text-green-600 mb-2">{pkg.price}</div>
              <div className="text-sm text-neutral-500 mb-6">Processing time: {pkg.time}</div>
              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-neutral-700">{feature}</span>
                  </div>
                ))}
              </div>
              <motion.button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-shadow duration-200 ${
                  index === 1
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg'
                    : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Choose Plan
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Requirements Section */}
        <motion.div
          className="bg-white rounded-2xl border border-neutral-200 p-8"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">Documents Required</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-4">For Proprietorship:</h3>
              <ul className="space-y-2">
                {[
                  "PAN Card of proprietor",
                  "Aadhaar Card",
                  "Bank account details",
                  "Business address proof",
                  "Business registration certificate (if any)"
                ].map((doc, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-neutral-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900 mb-4">For Companies/LLP:</h3>
              <ul className="space-y-2">
                {[
                  "Certificate of incorporation",
                  "PAN Card of company/LLP",
                  "Board resolution for GST registration",
                  "Bank account details",
                  "Office address proof",
                  "Director/Partner details"
                ].map((doc, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-neutral-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
