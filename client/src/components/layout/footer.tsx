import { Building, Facebook, Twitter, Linkedin, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const footerSections = [
    {
      title: "Services",
      links: [
        { label: "Company Registration", href: "#" },
        { label: "GST Registration", href: "#" },
        { label: "Tax Filing", href: "#" },
        { label: "Legal Compliance", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "#" },
        { label: "Contact Us", href: "#" },
        { label: "Documentation", href: "#" },
        { label: "Status Page", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-neutral-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Building className="text-primary text-2xl mr-3" />
              <span className="text-2xl font-bold">BizHub</span>
            </div>
            <p className="text-neutral-400 mb-4">
              Your trusted partner for business incorporation and compliance solutions.
            </p>
            <div className="flex space-x-4">
              <Facebook className="text-neutral-400 hover:text-white cursor-pointer w-5 h-5" />
              <Twitter className="text-neutral-400 hover:text-white cursor-pointer w-5 h-5" />
              <Linkedin className="text-neutral-400 hover:text-white cursor-pointer w-5 h-5" />
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-neutral-400">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-neutral-400">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@bizhub.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-neutral-800 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">© 2024 BizHub. All rights reserved.</p>
          <div className="flex space-x-6 text-sm text-neutral-400 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
