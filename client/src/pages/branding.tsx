import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Palette,
  PenTool,
  Image,
  Download,
  Upload,
  Eye,
  Star,
  Plus,
  Settings,
  FileText,
  Layers,
  Type,
  Droplets,
  Sparkles,
  CheckCircle,
  Clock,
  AlertCircle,
  Copy,
  Trash2,
  Edit3,
  Save
} from "lucide-react";

const brandColors = [
  { name: "Primary Blue", hex: "#2563EB", rgb: "37, 99, 235" },
  { name: "Secondary Gray", hex: "#6B7280", rgb: "107, 114, 128" },
  { name: "Accent Orange", hex: "#F59E0B", rgb: "245, 158, 11" },
  { name: "Success Green", hex: "#10B981", rgb: "16, 185, 129" }
];

const brandFonts = [
  { name: "Inter", category: "Sans-serif", weight: "400, 500, 600, 700" },
  { name: "Poppins", category: "Sans-serif", weight: "400, 500, 600" },
  { name: "Playfair Display", category: "Serif", weight: "400, 700" }
];

const templates = [
  {
    id: 1,
    name: "Business Card",
    category: "Stationery",
    preview: "bg-gradient-to-br from-blue-500 to-blue-600",
    downloads: 45,
    lastUsed: "2 days ago"
  },
  {
    id: 2,
    name: "Letterhead",
    category: "Stationery",
    preview: "bg-gradient-to-br from-gray-500 to-gray-600",
    downloads: 23,
    lastUsed: "1 week ago"
  },
  {
    id: 3,
    name: "Email Signature",
    category: "Digital",
    preview: "bg-gradient-to-br from-green-500 to-green-600",
    downloads: 67,
    lastUsed: "3 days ago"
  },
  {
    id: 4,
    name: "Social Media Banner",
    category: "Marketing",
    preview: "bg-gradient-to-br from-purple-500 to-purple-600",
    downloads: 34,
    lastUsed: "5 days ago"
  }
];

const recentDesigns = [
  {
    id: 1,
    name: "Company Logo v2",
    type: "Logo",
    status: "completed",
    created: "2 days ago",
    size: "2.4 MB"
  },
  {
    id: 2,
    name: "Brand Guidelines",
    type: "Document",
    status: "in-progress",
    created: "1 week ago",
    size: "1.8 MB"
  },
  {
    id: 3,
    name: "Business Card Design",
    type: "Template",
    status: "completed",
    created: "3 days ago",
    size: "856 KB"
  }
];

export default function Branding() {
  const [activeTab, setActiveTab] = useState("overview");
  const [logoText, setLogoText] = useState("Your Brand");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Branding & Identity</h1>
        <p className="text-neutral-600">Create and manage your brand assets</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-white p-1 rounded-lg border">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "overview"
                ? "bg-blue-600 text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("logo")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "logo"
                ? "bg-blue-600 text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Logo Generator
          </button>
          <button
            onClick={() => setActiveTab("brand-kit")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "brand-kit"
                ? "bg-blue-600 text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Brand Kit
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "templates"
                ? "bg-blue-600 text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Templates
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Total Assets</p>
                    <p className="text-2xl font-bold text-neutral-900">24</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Image className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Brand Colors</p>
                    <p className="text-2xl font-bold text-neutral-900">4</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Palette className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Templates</p>
                    <p className="text-2xl font-bold text-neutral-900">12</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Downloads</p>
                    <p className="text-2xl font-bold text-neutral-900">169</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Download className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700">
                  <Sparkles className="w-6 h-6" />
                  <span>Generate Logo</span>
                </Button>

                <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700">
                  <Palette className="w-6 h-6" />
                  <span>Create Brand Kit</span>
                </Button>

                <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700">
                  <FileText className="w-6 h-6" />
                  <span>Design Template</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Designs */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Designs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDesigns.map((design) => (
                  <div key={design.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Image className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900">{design.name}</h4>
                        <p className="text-sm text-neutral-600">{design.type} • {design.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(design.status)}
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "logo" && (
        <div className="space-y-8">
          {/* Logo Generator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                AI Logo Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Company Name
                    </label>
                    <Input
                      value={logoText}
                      onChange={(e) => setLogoText(e.target.value)}
                      placeholder="Enter your company name"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Industry
                    </label>
                    <select className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option>Finance</option>
                      <option>Education</option>
                      <option>Retail</option>
                      <option>Manufacturing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Style Preference
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Modern", "Classic", "Playful", "Professional"].map((style) => (
                        <button
                          key={style}
                          className="p-3 border border-neutral-300 rounded-lg text-sm hover:border-blue-500 hover:bg-blue-50"
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Logo
                  </Button>
                </div>

                {/* Preview Section */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Logo Preview
                    </label>
                    <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Sparkles className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                        <p className="text-neutral-600">Your logo will appear here</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download PNG
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download SVG
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "brand-kit" && (
        <div className="space-y-8">
          {/* Brand Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Brand Colors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {brandColors.map((color) => (
                  <div key={color.name} className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-lg border border-neutral-200"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-neutral-900">{color.name}</h4>
                        <p className="text-sm text-neutral-600">{color.hex}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span>HEX</span>
                        <div className="flex items-center gap-1">
                          <span>{color.hex}</span>
                          <button className="p-1 hover:bg-neutral-100 rounded">
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span>RGB</span>
                        <div className="flex items-center gap-1">
                          <span>{color.rgb}</span>
                          <button className="p-1 hover:bg-neutral-100 rounded">
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-4" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Color
              </Button>
            </CardContent>
          </Card>

          {/* Brand Fonts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                Brand Fonts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {brandFonts.map((font) => (
                  <div key={font.name} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-1">{font.name}</h4>
                      <p className="text-sm text-neutral-600">{font.category} • {font.weight}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-4" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Font
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "templates" && (
        <div className="space-y-8">
          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-full h-32 ${template.preview} rounded-lg mb-4 flex items-center justify-center`}>
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-medium text-neutral-900 mb-1">{template.name}</h4>
                  <p className="text-sm text-neutral-600 mb-3">{template.category}</p>
                  <div className="flex items-center justify-between text-sm text-neutral-600 mb-4">
                    <span>{template.downloads} downloads</span>
                    <span>•</span>
                    <span>{template.lastUsed}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Create New Template */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Button className="h-32 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-300 hover:border-neutral-400">
                  <Plus className="w-8 h-8 text-neutral-400" />
                  <span className="text-neutral-600">Business Card</span>
                </Button>
                <Button className="h-32 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-300 hover:border-neutral-400">
                  <Plus className="w-8 h-8 text-neutral-400" />
                  <span className="text-neutral-600">Letterhead</span>
                </Button>
                <Button className="h-32 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-300 hover:border-neutral-400">
                  <Plus className="w-8 h-8 text-neutral-400" />
                  <span className="text-neutral-600">Email Signature</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
