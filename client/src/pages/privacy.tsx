import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users, Calendar, Mail } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      title: "Information We Collect",
      icon: Eye,
      content: [
        "Personal information (name, email, phone number)",
        "Business information (company details, registration data)",
        "Usage data (how you interact with our platform)",
        "Technical data (IP address, browser type, device information)"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      content: [
        "Provide and maintain our services",
        "Process your business incorporation requests",
        "Send important updates and notifications",
        "Improve our platform and user experience",
        "Comply with legal obligations"
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "Encryption of sensitive data",
        "Secure data transmission (HTTPS)",
        "Regular security audits",
        "Access controls and authentication",
        "Data backup and recovery procedures"
      ]
    },
    {
      title: "Data Retention",
      icon: Calendar,
      content: [
        "Business data: Retained for 7 years as per legal requirements",
        "Account data: Retained while account is active",
        "Usage data: Retained for 2 years for analytics",
        "Right to request data deletion"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={() => {}} />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Last Updated */}
          <div className="text-center mb-12">
            <p className="text-neutral-600">
              Last updated: January 15, 2024
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold">Our Commitment to Privacy</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                At BizHub, we are committed to protecting your privacy and ensuring the security of your personal and business information.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform
                and services.
              </p>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <section.icon className="w-6 h-6 text-blue-600" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-neutral-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Information */}
          <Card className="mt-12">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Contact Us</h2>
              </div>
              <p className="text-neutral-600 mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-neutral-700">
                <p><strong>Email:</strong> privacy@bizhub.com</p>
                <p><strong>Phone:</strong> +91 9876543210</p>
                <p><strong>Address:</strong> BizHub, Mumbai, India</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}

