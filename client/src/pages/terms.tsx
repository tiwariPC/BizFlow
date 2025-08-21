import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Scale, Users, Shield, AlertTriangle, Mail } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: FileText,
      content: [
        "By accessing and using BizHub, you accept and agree to be bound by these Terms of Service",
        "If you do not agree to these terms, please do not use our services",
        "We reserve the right to modify these terms at any time",
        "Continued use after changes constitutes acceptance of new terms"
      ]
    },
    {
      title: "Service Description",
      icon: Users,
      content: [
        "BizHub provides business incorporation and compliance services",
        "We assist with company registration, GST filing, and legal compliance",
        "Services are provided on an 'as-is' basis",
        "We do not guarantee specific outcomes or timelines"
      ]
    },
    {
      title: "User Responsibilities",
      icon: Shield,
      content: [
        "Provide accurate and complete information",
        "Maintain the security of your account credentials",
        "Comply with all applicable laws and regulations",
        "Pay all fees and charges in a timely manner",
        "Notify us of any changes to your business information"
      ]
    },
    {
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: [
        "BizHub is not liable for indirect, incidental, or consequential damages",
        "Our liability is limited to the amount paid for services",
        "We are not responsible for delays beyond our control",
        "Users are responsible for their own business decisions"
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
              Terms of Service
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Please read these terms carefully before using our services.
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
                <Scale className="w-8 h-8 text-blue-600" />
                <h2 className="text-2xl font-bold">Agreement to Terms</h2>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                These Terms of Service ("Terms") govern your use of the BizHub platform and services.
                By using our services, you agree to these terms and our Privacy Policy.
                If you are using our services on behalf of a business, you represent that you have the authority to bind that business to these terms.
              </p>
            </CardContent>
          </Card>

          {/* Terms Sections */}
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
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-neutral-700">
                <p><strong>Email:</strong> legal@bizhub.com</p>
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

