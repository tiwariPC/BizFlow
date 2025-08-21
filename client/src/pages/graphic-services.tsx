import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  PenTool,
  Palette,
  Image,
  FileText,
  Video,
  Download,
  Upload,
  Eye,
  Edit3,
  Plus,
  Settings,
  Sparkles,
  CheckCircle,
  Clock,
  AlertCircle,
  Copy,
  Trash2,
  Save,
  Layers,
  Type,
  Droplets,
  MousePointer,
  FileVideo,
  Mic,
  Camera,
  Brush,
  Ruler,
  Grid,
  Zap
} from "lucide-react";

const designTools = [
  {
    id: 1,
    name: "Logo Designer",
    description: "Create professional logos with AI assistance",
    icon: Palette,
    color: "bg-blue-100 text-blue-600",
    status: "active",
    lastUsed: "2 hours ago"
  },
  {
    id: 2,
    name: "Image Editor",
    description: "Edit and enhance your images",
    icon: Image,
    color: "bg-green-100 text-green-600",
    status: "active",
    lastUsed: "1 day ago"
  },
  {
    id: 3,
    name: "Color Palette Generator",
    description: "Generate brand color schemes",
    icon: Droplets,
    color: "bg-purple-100 text-purple-600",
    status: "active",
    lastUsed: "3 days ago"
  },
  {
    id: 4,
    name: "Typography Tool",
    description: "Choose and pair fonts for your brand",
    icon: Type,
    color: "bg-orange-100 text-orange-600",
    status: "inactive",
    lastUsed: "1 week ago"
  }
];

const contentServices = [
  {
    id: 1,
    name: "Content Writing",
    description: "Professional copywriting and content creation",
    icon: FileText,
    color: "bg-blue-100 text-blue-600",
    price: "₹2,000 - ₹15,000",
    delivery: "3-5 days"
  },
  {
    id: 2,
    name: "Video Production",
    description: "Create engaging videos for marketing",
    icon: Video,
    color: "bg-green-100 text-green-600",
    price: "₹10,000 - ₹50,000",
    delivery: "7-10 days"
  },
  {
    id: 3,
    name: "Voice Over",
    description: "Professional voice recording services",
    icon: Mic,
    color: "bg-purple-100 text-purple-600",
    price: "₹1,500 - ₹8,000",
    delivery: "2-3 days"
  },
  {
    id: 4,
    name: "Photography",
    description: "Product and lifestyle photography",
    icon: Camera,
    color: "bg-orange-100 text-orange-600",
    price: "₹5,000 - ₹25,000",
    delivery: "5-7 days"
  }
];

const recentProjects = [
  {
    id: 1,
    name: "Company Logo Design",
    type: "Logo Design",
    status: "completed",
    created: "2 days ago",
    size: "2.4 MB",
    designer: "Design Studio Pro"
  },
  {
    id: 2,
    name: "Website Content",
    type: "Content Writing",
    status: "in-progress",
    created: "1 week ago",
    size: "1.8 MB",
    writer: "Content Creators Hub"
  },
  {
    id: 3,
    name: "Product Video",
    type: "Video Production",
    status: "review",
    created: "3 days ago",
    size: "45.2 MB",
    producer: "Video Masters"
  }
];

const templates = [
  {
    id: 1,
    name: "Business Card Template",
    category: "Stationery",
    downloads: 45,
    rating: 4.8,
    preview: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  {
    id: 2,
    name: "Social Media Post",
    category: "Marketing",
    downloads: 89,
    rating: 4.6,
    preview: "bg-gradient-to-br from-green-500 to-green-600"
  },
  {
    id: 3,
    name: "Email Newsletter",
    category: "Email",
    downloads: 67,
    rating: 4.7,
    preview: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  {
    id: 4,
    name: "Presentation Template",
    category: "Business",
    downloads: 34,
    rating: 4.5,
    preview: "bg-gradient-to-br from-orange-500 to-orange-600"
  }
];

export default function GraphicServices() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTool, setSelectedTool] = useState<number | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case "review":
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>;
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Graphic & Content Services</h1>
        <p className="text-neutral-600">Create stunning visuals and compelling content for your business</p>
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
            onClick={() => setActiveTab("design-tools")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "design-tools"
                ? "bg-blue-600 text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Design Tools
          </button>
          <button
            onClick={() => setActiveTab("content-services")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "content-services"
                ? "bg-blue-600 text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Content Services
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
                    <p className="text-sm text-neutral-600 mb-1">Active Projects</p>
                    <p className="text-2xl font-bold text-neutral-900">12</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <PenTool className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Design Assets</p>
                    <p className="text-2xl font-bold text-neutral-900">156</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Image className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Content Pieces</p>
                    <p className="text-2xl font-bold text-neutral-900">89</p>
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
                    <p className="text-sm text-neutral-600 mb-1">Templates Used</p>
                    <p className="text-2xl font-bold text-neutral-900">34</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Layers className="w-6 h-6 text-orange-600" />
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700">
                  <Sparkles className="w-6 h-6" />
                  <span>Create Logo</span>
                </Button>

                <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700">
                  <FileText className="w-6 h-6" />
                  <span>Write Content</span>
                </Button>

                <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700">
                  <Video className="w-6 h-6" />
                  <span>Make Video</span>
                </Button>

                <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700">
                  <Layers className="w-6 h-6" />
                  <span>Use Template</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <PenTool className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900">{project.name}</h4>
                        <p className="text-sm text-neutral-600">{project.type} • {project.designer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-neutral-600">{project.size}</p>
                        <p className="text-xs text-neutral-500">{project.created}</p>
                      </div>
                      {getStatusBadge(project.status)}
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "design-tools" && (
        <div className="space-y-8">
          {/* Design Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {designTools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${tool.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <tool.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2 text-center">{tool.name}</h3>
                  <p className="text-sm text-neutral-600 mb-4 text-center">{tool.description}</p>
                  <div className="flex items-center justify-between text-sm text-neutral-600 mb-4">
                    {getStatusBadge(tool.status)}
                    <span>{tool.lastUsed}</span>
                  </div>
                  <Button className="w-full">Open Tool</Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Advanced Design Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Advanced Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <Brush className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-neutral-900 mb-2">AI-Powered Design</h4>
                  <p className="text-sm text-neutral-600 mb-3">Generate designs with artificial intelligence</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Try AI Design
                  </Button>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <Ruler className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-neutral-900 mb-2">Precise Measurements</h4>
                  <p className="text-sm text-neutral-600 mb-3">Pixel-perfect design with measurement tools</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Open Ruler
                  </Button>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Grid className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-neutral-900 mb-2">Grid System</h4>
                  <p className="text-sm text-neutral-600 mb-3">Professional layout with grid alignment</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Enable Grid
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "content-services" && (
        <div className="space-y-8">
          {/* Service Providers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contentServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${service.color}`}>
                        <service.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">{service.name}</h3>
                        <p className="text-sm text-neutral-600">{service.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Price Range:</span>
                      <span className="font-medium">{service.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Delivery Time:</span>
                      <span className="font-medium">{service.delivery}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">Request Service</Button>
                    <Button variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Request Form */}
          <Card>
            <CardHeader>
              <CardTitle>Request Custom Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Content Type
                  </label>
                  <select className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select content type</option>
                    <option>Blog Post</option>
                    <option>Social Media Content</option>
                    <option>Website Copy</option>
                    <option>Email Newsletter</option>
                    <option>Product Description</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Word Count
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 500 words"
                    className="w-full"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Project Description
                  </label>
                  <textarea
                    placeholder="Describe your content requirements..."
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Request
                  </Button>
                </div>
              </div>
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
                    <Layers className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-medium text-neutral-900 mb-1">{template.name}</h4>
                  <p className="text-sm text-neutral-600 mb-3">{template.category}</p>
                  <div className="flex items-center justify-between text-sm text-neutral-600 mb-4">
                    <span>{template.downloads} downloads</span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-yellow-500" />
                      {template.rating}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Use Template
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Create Custom Template */}
          <Card>
            <CardHeader>
              <CardTitle>Create Custom Template</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Button className="h-32 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-300 hover:border-neutral-400">
                  <Plus className="w-8 h-8 text-neutral-400" />
                  <span className="text-neutral-600">Business Card</span>
                </Button>
                <Button className="h-32 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-300 hover:border-neutral-400">
                  <Plus className="w-8 h-8 text-neutral-400" />
                  <span className="text-neutral-600">Social Media Post</span>
                </Button>
                <Button className="h-32 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-300 hover:border-neutral-400">
                  <Plus className="w-8 h-8 text-neutral-400" />
                  <span className="text-neutral-600">Email Template</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
