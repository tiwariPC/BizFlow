import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  BookOpen, Search, Code, FileText, Video, Download,
  ExternalLink, Copy, Check, ChevronRight, ChevronDown
} from "lucide-react";

export default function Docs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSection, setExpandedSection] = useState<string | null>("getting-started");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: BookOpen,
      content: [
        {
          title: "Quick Start Guide",
          description: "Set up your first business incorporation in minutes",
          type: "guide",
          time: "5 min read"
        },
        {
          title: "Account Setup",
          description: "Create and configure your BizHub account",
          type: "guide",
          time: "3 min read"
        },
        {
          title: "First Steps",
          description: "Complete your business profile and preferences",
          type: "guide",
          time: "10 min read"
        }
      ]
    },
    {
      id: "api-reference",
      title: "API Reference",
      icon: Code,
      content: [
        {
          title: "Authentication",
          description: "Learn how to authenticate with our API",
          type: "api",
          time: "8 min read"
        },
        {
          title: "Endpoints",
          description: "Complete list of available API endpoints",
          type: "api",
          time: "15 min read"
        },
        {
          title: "Rate Limits",
          description: "Understanding API rate limits and quotas",
          type: "api",
          time: "5 min read"
        }
      ]
    },
    {
      id: "guides",
      title: "Guides & Tutorials",
      icon: FileText,
      content: [
        {
          title: "Business Incorporation",
          description: "Step-by-step guide to incorporating your business",
          type: "tutorial",
          time: "20 min read"
        },
        {
          title: "GST Registration",
          description: "Complete GST registration process guide",
          type: "tutorial",
          time: "15 min read"
        },
        {
          title: "Compliance Management",
          description: "Managing your business compliance requirements",
          type: "tutorial",
          time: "25 min read"
        }
      ]
    },
    {
      id: "video-tutorials",
      title: "Video Tutorials",
      icon: Video,
      content: [
        {
          title: "Platform Overview",
          description: "Complete walkthrough of BizHub platform",
          type: "video",
          time: "12 min"
        },
        {
          title: "Dashboard Setup",
          description: "Setting up your business dashboard",
          type: "video",
          time: "8 min"
        },
        {
          title: "Advanced Features",
          description: "Using advanced platform features",
          type: "video",
          time: "18 min"
        }
      ]
    }
  ];

  const apiExamples = [
    {
      title: "Authentication",
      description: "Get your API token",
      code: `curl -X POST https://api.bizhub.com/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "your_username",
    "password": "your_password"
  }'`,
      response: `{
  "user": {
    "id": "user_id",
    "username": "your_username",
            "role": "tier3"
  },
  "token": "your_jwt_token"
}`
    },
    {
      title: "Create Company",
      description: "Register a new company",
      code: `curl -X POST https://api.bizhub.com/companies \\
  -H "Authorization: Bearer your_token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My Company Pvt Ltd",
    "type": "private_limited",
    "address": "Mumbai, India"
  }'`,
      response: `{
  "id": "company_id",
  "name": "My Company Pvt Ltd",
  "status": "pending",
  "createdAt": "2024-01-15T10:30:00Z"
}`
    }
  ];

  const filteredSections = sections.map(section => ({
    ...section,
    content: section.content.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.content.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={() => {}} />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Documentation
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Everything you need to know about BizHub. From getting started to advanced features.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Search */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {sections.map((section) => (
                      <div key={section.id}>
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-neutral-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <section.icon className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">{section.title}</span>
                          </div>
                          {expandedSection === section.id ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                        {expandedSection === section.id && (
                          <div className="ml-8 mt-2 space-y-1">
                            {section.content.map((item, index) => (
                              <a
                                key={index}
                                href={`#${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block p-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded transition-colors"
                              >
                                {item.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Documentation Sections */}
              {filteredSections.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <section.icon className="w-5 h-5 text-blue-600" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {section.content.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-blue-300 transition-colors">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{item.title}</h3>
                              <Badge variant="outline" className="text-xs">
                                {item.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-neutral-600 mb-2">{item.description}</p>
                            <div className="flex items-center gap-4 text-xs text-neutral-500">
                              <span>{item.time}</span>
                              {item.type === "video" && <Video className="w-3 h-3" />}
                              {item.type === "api" && <Code className="w-3 h-3" />}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* API Examples */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-600" />
                    API Examples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {apiExamples.map((example, index) => (
                      <div key={index} className="border border-neutral-200 rounded-lg overflow-hidden">
                        <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200">
                          <h3 className="font-semibold">{example.title}</h3>
                          <p className="text-sm text-neutral-600">{example.description}</p>
                        </div>
                        <div className="p-4 space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-neutral-700">Request</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(example.code, `code-${index}`)}
                              >
                                {copiedCode === `code-${index}` ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                            <pre className="bg-neutral-900 text-green-400 p-4 rounded text-sm overflow-x-auto">
                              <code>{example.code}</code>
                            </pre>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-neutral-700">Response</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(example.response, `response-${index}`)}
                              >
                                {copiedCode === `response-${index}` ? (
                                  <Check className="w-4 h-4 text-green-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                            <pre className="bg-neutral-900 text-blue-400 p-4 rounded text-sm overflow-x-auto">
                              <code>{example.response}</code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Download SDK */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Download className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Download SDK</h3>
                    <p className="text-neutral-600 mb-4">
                      Get our official SDKs for Node.js, Python, and other languages.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Node.js SDK
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Python SDK
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        PHP SDK
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
