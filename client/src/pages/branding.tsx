import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  PenTool,
  Image as ImageIcon,
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
  Save,
  X,
  Move,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Minus,
  Square,
  Circle,
  Triangle
} from "lucide-react";

// Interfaces
interface LogoElement {
  id: string;
  type: 'text' | 'shape' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  properties: {
    text?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string;
    color?: string;
    shape?: 'rectangle' | 'circle' | 'triangle';
    imageUrl?: string;
    opacity?: number;
  };
}

interface BrandColor {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  category: 'primary' | 'secondary' | 'accent' | 'neutral';
  usage?: string;
  createdAt: string;
}

interface BrandFont {
  id: string;
  name: string;
  category: string;
  weights: string[];
  url?: string;
  usage?: string;
  createdAt: string;
}

interface BrandAsset {
  id: string;
  name: string;
  type: 'logo' | 'icon' | 'image' | 'document';
  url: string;
  format: string;
  size: string;
  createdAt: string;
  tags: string[];
}

interface BrandGuideline {
  id: string;
  title: string;
  content: string;
  category: 'logo' | 'color' | 'typography' | 'spacing' | 'general';
  createdAt: string;
}

const brandColors: BrandColor[] = [
  { 
    id: '1', 
    name: "Primary Blue", 
    hex: "#2563EB", 
    rgb: "37, 99, 235", 
    category: 'primary',
    usage: "Main brand color, headers, primary buttons",
    createdAt: "2024-01-15"
  },
  { 
    id: '2', 
    name: "Secondary Gray", 
    hex: "#6B7280", 
    rgb: "107, 114, 128", 
    category: 'secondary',
    usage: "Body text, secondary elements",
    createdAt: "2024-01-15"
  },
  { 
    id: '3', 
    name: "Accent Orange", 
    hex: "#F59E0B", 
    rgb: "245, 158, 11", 
    category: 'accent',
    usage: "Call-to-action buttons, highlights",
    createdAt: "2024-01-15"
  },
  { 
    id: '4', 
    name: "Success Green", 
    hex: "#10B981", 
    rgb: "16, 185, 129", 
    category: 'accent',
    usage: "Success states, positive feedback",
    createdAt: "2024-01-15"
  }
];

const brandFonts: BrandFont[] = [
  { 
    id: '1', 
    name: "Inter", 
    category: "Sans-serif", 
    weights: ["400", "500", "600", "700"],
    usage: "Body text, UI elements",
    createdAt: "2024-01-15"
  },
  { 
    id: '2', 
    name: "Poppins", 
    category: "Sans-serif", 
    weights: ["400", "500", "600"],
    usage: "Headings, titles",
    createdAt: "2024-01-15"
  },
  { 
    id: '3', 
    name: "Playfair Display", 
    category: "Serif", 
    weights: ["400", "700"],
    usage: "Display text, hero sections",
    createdAt: "2024-01-15"
  }
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

  // AI Logo Generator States
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedStyle, setSelectedStyle] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedLogo, setAiGeneratedLogo] = useState<any>(null);

  // Logo Designer States
  const [showLogoDesigner, setShowLogoDesigner] = useState(false);
  const [logoElements, setLogoElements] = useState<LogoElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState<LogoElement[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Brand Kit States
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontManager, setShowFontManager] = useState(false);
  const [showAssetManager, setShowAssetManager] = useState(false);
  const [showGuidelineEditor, setShowGuidelineEditor] = useState(false);
  const [selectedColor, setSelectedColor] = useState<BrandColor | null>(null);
  const [selectedFont, setSelectedFont] = useState<BrandFont | null>(null);
  const [brandAssets, setBrandAssets] = useState<BrandAsset[]>([]);
  const [brandGuidelines, setBrandGuidelines] = useState<BrandGuideline[]>([]);
  const [newColor, setNewColor] = useState({ 
    name: '', 
    hex: '#000000', 
    category: 'primary' as const,
    usage: ''
  });
  const [newFont, setNewFont] = useState({ 
    name: '', 
    category: 'sans-serif', 
    weights: ['400'],
    usage: ''
  });
  const [newAsset, setNewAsset] = useState({
    name: '',
    type: 'logo' as const,
    tags: [] as string[]
  });
  const [newGuideline, setNewGuideline] = useState({
    title: '',
    content: '',
    category: 'general' as const
  });

  // Template Designer States
  const [showTemplateDesigner, setShowTemplateDesigner] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [templateData, setTemplateData] = useState<any>({});

  // Logo Designer Canvas Ref
  const canvasRef = useRef<HTMLDivElement>(null);

  // Logo Designer Functions
  const addLogoElement = (type: 'text' | 'shape' | 'image') => {
    const newElement: LogoElement = {
      id: Date.now().toString(),
      type,
      x: 100,
      y: 100,
      width: type === 'text' ? 200 : 100,
      height: type === 'text' ? 50 : 100,
      rotation: 0,
      zIndex: logoElements.length,
      properties: {
        text: type === 'text' ? 'New Text' : '',
        fontFamily: 'Inter',
        fontSize: 24,
        fontWeight: '400',
        color: '#000000',
        shape: type === 'shape' ? 'rectangle' : undefined,
        opacity: 1
      }
    };

    saveToHistory();
    setLogoElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  };

  const updateLogoElement = (id: string, updates: Partial<LogoElement>) => {
    setLogoElements(prev => prev.map(el =>
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const deleteLogoElement = (id: string) => {
    saveToHistory();
    setLogoElements(prev => prev.filter(el => el.id !== id));
    setSelectedElement(null);
  };

  const saveToHistory = () => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...logoElements]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setLogoElements(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setLogoElements(history[historyIndex + 1]);
    }
  };

  const exportLogo = (format: 'png' | 'svg') => {
    // In a real implementation, this would use canvas API to export
    alert(`Logo exported as ${format.toUpperCase()}`);
  };

  // Brand Kit Functions
  const addBrandColor = () => {
    if (newColor.name && newColor.hex) {
      const color: BrandColor = {
        id: Date.now().toString(),
        name: newColor.name,
        hex: newColor.hex,
        rgb: hexToRgb(newColor.hex),
        category: newColor.category,
        usage: newColor.usage,
        createdAt: new Date().toISOString().split('T')[0]
      };
      brandColors.push(color);
      setNewColor({ name: '', hex: '#000000', category: 'primary', usage: '' });
      setShowColorPicker(false);
      alert('Brand color added successfully!');
    } else {
      alert('Please fill in all required fields');
    }
  };

  const addBrandFont = () => {
    if (newFont.name) {
      const font: BrandFont = {
        id: Date.now().toString(),
        name: newFont.name,
        category: newFont.category,
        weights: newFont.weights,
        usage: newFont.usage,
        createdAt: new Date().toISOString().split('T')[0]
      };
      brandFonts.push(font);
      setNewFont({ name: '', category: 'sans-serif', weights: ['400'], usage: '' });
      setShowFontManager(false);
      alert('Brand font added successfully!');
    } else {
      alert('Please fill in font name');
    }
  };

  const deleteBrandColor = (id: string) => {
    if (confirm('Are you sure you want to delete this color?')) {
      const index = brandColors.findIndex(color => color.id === id);
      if (index > -1) {
        brandColors.splice(index, 1);
        alert('Color deleted successfully!');
      }
    }
  };

  const deleteBrandFont = (id: string) => {
    if (confirm('Are you sure you want to delete this font?')) {
      const index = brandFonts.findIndex(font => font.id === id);
      if (index > -1) {
        brandFonts.splice(index, 1);
        alert('Font deleted successfully!');
      }
    }
  };

  const addBrandAsset = () => {
    if (newAsset.name) {
      const asset: BrandAsset = {
        id: Date.now().toString(),
        name: newAsset.name,
        type: newAsset.type,
        url: '#', // In real implementation, this would be the uploaded file URL
        format: 'PNG',
        size: '2.4 MB',
        createdAt: new Date().toISOString().split('T')[0],
        tags: newAsset.tags
      };
      setBrandAssets(prev => [asset, ...prev]);
      setNewAsset({ name: '', type: 'logo', tags: [] });
      setShowAssetManager(false);
      alert('Brand asset added successfully!');
    } else {
      alert('Please fill in asset name');
    }
  };

  const addBrandGuideline = () => {
    if (newGuideline.title && newGuideline.content) {
      const guideline: BrandGuideline = {
        id: Date.now().toString(),
        title: newGuideline.title,
        content: newGuideline.content,
        category: newGuideline.category,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setBrandGuidelines(prev => [guideline, ...prev]);
      setNewGuideline({ title: '', content: '', category: 'general' });
      setShowGuidelineEditor(false);
      alert('Brand guideline added successfully!');
    } else {
      alert('Please fill in title and content');
    }
  };

  const exportBrandKit = () => {
    const brandKit = {
      colors: brandColors,
      fonts: brandFonts,
      assets: brandAssets,
      guidelines: brandGuidelines,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(brandKit, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'brand-kit.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert('Brand kit exported successfully!');
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
  };

  // AI Logo Generation Functions
  const generateAILogo = async () => {
    if (!logoText || !selectedIndustry || !selectedStyle) {
      alert('Please fill in all fields: Company Name, Industry, and Style Preference');
      return;
    }

    setIsGenerating(true);

    try {
      // Simulate AI logo generation with a delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const generatedLogo = {
        companyName: logoText,
        industry: selectedIndustry,
        style: selectedStyle,
        timestamp: new Date().toLocaleString(),
        logoData: {
          // In a real implementation, this would contain the actual logo data
          type: 'ai-generated',
          elements: [
            { type: 'text', content: logoText, font: 'Inter', size: 48, color: '#1f2937' },
            { type: 'shape', shape: 'rectangle', color: '#3b82f6', opacity: 0.1 }
          ]
        }
      };

      setAiGeneratedLogo(generatedLogo);
      alert('AI Logo generated successfully!');
    } catch (error) {
      console.error('Error generating AI logo:', error);
      alert('Error generating logo. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAILogo = (format: 'png' | 'svg') => {
    if (!aiGeneratedLogo) return;

    // In a real implementation, this would generate and download the actual logo file
    const filename = `${aiGeneratedLogo.companyName.toLowerCase().replace(/\s+/g, '-')}-logo.${format}`;

    // Create a simple canvas-based logo for demonstration
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      canvas.width = 800;
      canvas.height = 400;

      // Background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 800, 400);

      // Logo text
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 48px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(aiGeneratedLogo.companyName, 400, 200);

      // Industry and style
      ctx.fillStyle = '#6b7280';
      ctx.font = '16px Inter, sans-serif';
      ctx.fillText(`${aiGeneratedLogo.industry} • ${aiGeneratedLogo.style}`, 400, 240);

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, format === 'png' ? 'image/png' : 'image/svg+xml');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

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
                                              <ImageIcon className="w-6 h-6 text-blue-600" />
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
                <Button
                  onClick={() => setActiveTab("logo")}
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>Logo Tools</span>
                  <span className="text-xs opacity-90">AI + Manual</span>
                </Button>

                <Button
                  onClick={() => setActiveTab("brand-kit")}
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                >
                  <Palette className="w-6 h-6" />
                  <span>Create Brand Kit</span>
                </Button>

                <Button
                  onClick={() => setShowTemplateDesigner(true)}
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
                >
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
                        <ImageIcon className="w-6 h-6 text-blue-600" />
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
          {/* Logo Creation Options */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Logo Creation Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AI Logo Generator */}
                <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      AI Logo Generator
                    </CardTitle>
                    <p className="text-sm text-neutral-600">Let AI create a professional logo for you</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                      <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                          <SelectItem value="fashion-beauty">Fashion & Beauty</SelectItem>
                          <SelectItem value="real-estate">Real Estate</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Style Preference
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {["Modern", "Classic", "Playful", "Professional"].map((style) => (
                          <button
                            key={style}
                            onClick={() => setSelectedStyle(style)}
                            className={`p-2 text-sm border rounded-lg transition-colors ${
                              selectedStyle === style
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-neutral-300 hover:border-blue-300"
                            }`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={generateAILogo}
                      disabled={!logoText || isGenerating}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate AI Logo
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Manual Logo Designer */}
                <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <PenTool className="w-5 h-5 text-green-600" />
                      Manual Logo Designer
                    </CardTitle>
                    <p className="text-sm text-neutral-600">Design your logo from scratch with full control</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Full design control</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Custom elements & colors</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Export in multiple formats</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>Professional tools</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => setShowLogoDesigner(true)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700"
                    >
                      <PenTool className="w-4 h-4 mr-2" />
                      Open Logo Designer
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* AI Generated Logo Preview */}
          {aiGeneratedLogo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  AI Generated Logo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Logo Display */}
                  <div className="space-y-4">
                    <div className="w-full h-64 bg-white border-2 border-neutral-200 rounded-lg flex items-center justify-center p-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-neutral-800 mb-2">
                          {aiGeneratedLogo.companyName}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {aiGeneratedLogo.industry} • {aiGeneratedLogo.style}
                        </div>
                        <div className="mt-4 text-xs text-neutral-500">
                          AI Generated Logo Concept
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Logo Details & Actions */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-neutral-900 mb-2">Logo Details</h4>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-600">Company:</span>
                        <span className="text-sm font-medium">{aiGeneratedLogo.companyName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-600">Industry:</span>
                        <span className="text-sm font-medium capitalize">{aiGeneratedLogo.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-600">Style:</span>
                        <span className="text-sm font-medium">{aiGeneratedLogo.style}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-600">Generated:</span>
                        <span className="text-sm font-medium">{aiGeneratedLogo.timestamp}</span>
                      </div>
                    </div>

                    <div className="pt-4 space-y-3">
                      <Button
                        onClick={() => downloadAILogo('png')}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PNG
                      </Button>
                      <Button
                        onClick={() => downloadAILogo('svg')}
                        variant="outline"
                        className="w-full"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download SVG
                      </Button>
                      <Button
                        onClick={() => setShowLogoDesigner(true)}
                        variant="outline"
                        className="w-full"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit in Designer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {activeTab === "brand-kit" && (
        <div className="space-y-8">
          {/* Brand Kit Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Brand Kit</h2>
              <p className="text-neutral-600">Manage your brand colors, fonts, assets, and guidelines</p>
            </div>
            <Button onClick={exportBrandKit} className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Export Brand Kit
            </Button>
          </div>

          {/* Brand Colors */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Brand Colors ({brandColors.length})
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowColorPicker(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Color
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {brandColors.map((color) => (
                  <div key={color.id} className="p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-12 h-12 rounded-lg border border-neutral-200 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-neutral-900">{color.name}</h4>
                        <p className="text-sm text-neutral-600">{color.hex}</p>
                        <p className="text-xs text-neutral-500 capitalize">{color.category}</p>
                      </div>
                    </div>
                    {color.usage && (
                      <p className="text-xs text-neutral-600 mb-3 italic">"{color.usage}"</p>
                    )}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">HEX</span>
                        <div className="flex items-center gap-1">
                          <span className="font-mono">{color.hex}</span>
                          <button
                            className="p-1 hover:bg-neutral-100 rounded"
                            onClick={() => copyToClipboard(color.hex)}
                            title="Copy HEX"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">RGB</span>
                        <div className="flex items-center gap-1">
                          <span className="font-mono">{color.rgb}</span>
                          <button
                            className="p-1 hover:bg-neutral-100 rounded"
                            onClick={() => copyToClipboard(color.rgb)}
                            title="Copy RGB"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-neutral-100">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-red-600 hover:text-red-700"
                        onClick={() => deleteBrandColor(color.id)}
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Brand Fonts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Brand Fonts ({brandFonts.length})
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowFontManager(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Font
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {brandFonts.map((font) => (
                  <div key={font.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex-1">
                      <h4 className="font-medium text-neutral-900 mb-1">{font.name}</h4>
                      <p className="text-sm text-neutral-600">{font.category} • {font.weights.join(', ')}</p>
                      {font.usage && (
                        <p className="text-xs text-neutral-500 mt-1 italic">"{font.usage}"</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => deleteBrandFont(font.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Brand Assets */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Brand Assets ({brandAssets.length})
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowAssetManager(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Asset
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {brandAssets.length === 0 ? (
                <div className="text-center py-8">
                  <ImageIcon className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-600">No brand assets yet</p>
                  <p className="text-sm text-neutral-500">Add logos, icons, and other brand materials</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {brandAssets.map((asset) => (
                    <div key={asset.id} className="p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-neutral-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-neutral-900">{asset.name}</h4>
                          <p className="text-sm text-neutral-600 capitalize">{asset.type}</p>
                          <p className="text-xs text-neutral-500">{asset.format} • {asset.size}</p>
                        </div>
                      </div>
                      {asset.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {asset.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Brand Guidelines */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Brand Guidelines ({brandGuidelines.length})
                </CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowGuidelineEditor(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Guideline
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {brandGuidelines.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-600">No brand guidelines yet</p>
                  <p className="text-sm text-neutral-500">Add usage guidelines and best practices</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {brandGuidelines.map((guideline) => (
                    <div key={guideline.id} className="p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-neutral-900 mb-1">{guideline.title}</h4>
                          <p className="text-sm text-neutral-600 mb-2">{guideline.content}</p>
                          <div className="flex items-center gap-2 text-xs text-neutral-500">
                            <span className="capitalize">{guideline.category}</span>
                            <span>•</span>
                            <span>{guideline.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

      {/* Logo Designer Modal */}
      <AnimatePresence>
        {showLogoDesigner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowLogoDesigner(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold">Logo Designer</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={undo} disabled={historyIndex <= 0}>
                    <Undo2 className="w-4 h-4 mr-2" />
                    Undo
                  </Button>
                  <Button variant="outline" onClick={redo} disabled={historyIndex >= history.length - 1}>
                    <Redo2 className="w-4 h-4 mr-2" />
                    Redo
                  </Button>
                  <Button variant="outline" onClick={() => setShowLogoDesigner(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex h-[calc(95vh-120px)]">
                {/* Left Sidebar - Tools */}
                <div className="w-80 border-r bg-gray-50 p-4 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Add Elements</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => addLogoElement('text')}
                      >
                        <Type className="w-4 h-4 mr-2" />
                        Add Text
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => addLogoElement('shape')}
                      >
                        <Square className="w-4 h-4 mr-2" />
                        Add Shape
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => addLogoElement('image')}
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Add Image
                      </Button>
                    </div>
                  </div>

                  {/* Element Properties */}
                  {selectedElement && (
                    <div>
                      <h3 className="font-semibold mb-3">Element Properties</h3>
                      <div className="space-y-3">
                        {logoElements.find(el => el.id === selectedElement)?.type === 'text' && (
                          <>
                            <div>
                              <label className="block text-sm font-medium mb-1">Text</label>
                              <Input
                                value={logoElements.find(el => el.id === selectedElement)?.properties.text || ''}
                                onChange={(e) => updateLogoElement(selectedElement, {
                                  properties: { ...logoElements.find(el => el.id === selectedElement)?.properties, text: e.target.value }
                                })}
                                placeholder="Enter text"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Font Size</label>
                              <Input
                                type="number"
                                value={logoElements.find(el => el.id === selectedElement)?.properties.fontSize || 24}
                                onChange={(e) => updateLogoElement(selectedElement, {
                                  properties: { ...logoElements.find(el => el.id === selectedElement)?.properties, fontSize: Number(e.target.value) }
                                })}
                                min="8"
                                max="200"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Color</label>
                              <Input
                                type="color"
                                value={logoElements.find(el => el.id === selectedElement)?.properties.color || '#000000'}
                                onChange={(e) => updateLogoElement(selectedElement, {
                                  properties: { ...logoElements.find(el => el.id === selectedElement)?.properties, color: e.target.value }
                                })}
                                className="h-10"
                              />
                            </div>
                          </>
                        )}

                        <div>
                          <label className="block text-sm font-medium mb-1">Opacity</label>
                          <Input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={logoElements.find(el => el.id === selectedElement)?.properties.opacity || 1}
                            onChange={(e) => updateLogoElement(selectedElement, {
                              properties: { ...logoElements.find(el => el.id === selectedElement)?.properties, opacity: Number(e.target.value) }
                            })}
                            className="w-full"
                          />
                        </div>

                        <Button
                          variant="outline"
                          className="w-full text-red-600 hover:text-red-700"
                          onClick={() => deleteLogoElement(selectedElement)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Element
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Canvas Area */}
                <div className="flex-1 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                      <span className="text-sm font-medium">{Math.round(zoom * 100)}%</span>
                      <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(2, zoom + 0.1))}>
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => exportLogo('png')}>
                        <Download className="w-4 h-4 mr-2" />
                        Export PNG
                      </Button>
                      <Button variant="outline" onClick={() => exportLogo('svg')}>
                        <Download className="w-4 h-4 mr-2" />
                        Export SVG
                      </Button>
                    </div>
                  </div>

                  {/* Canvas */}
                  <div
                    ref={canvasRef}
                    className="border-2 border-dashed border-gray-300 rounded-lg bg-white mx-auto relative overflow-hidden"
                    style={{
                      width: canvasSize.width * zoom,
                      height: canvasSize.height * zoom,
                      transform: `scale(${zoom})`,
                      transformOrigin: 'top left'
                    }}
                  >
                    {logoElements.map((element) => (
                      <div
                        key={element.id}
                        className={`absolute cursor-move ${
                          selectedElement === element.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        style={{
                          left: element.x,
                          top: element.y,
                          width: element.width,
                          height: element.height,
                          transform: `rotate(${element.rotation}deg)`,
                          zIndex: element.zIndex,
                          opacity: element.properties.opacity
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedElement(element.id);
                        }}
                      >
                        {element.type === 'text' && (
                          <div
                            className="w-full h-full flex items-center justify-center select-none"
                            style={{
                              fontFamily: element.properties.fontFamily,
                              fontSize: element.properties.fontSize,
                              fontWeight: element.properties.fontWeight,
                              color: element.properties.color
                            }}
                          >
                            {element.properties.text}
                          </div>
                        )}
                        {element.type === 'shape' && (
                          <div
                            className="w-full h-full"
                            style={{
                              backgroundColor: element.properties.color,
                              borderRadius: element.properties.shape === 'circle' ? '50%' : '0'
                            }}
                          />
                        )}
                        {element.type === 'image' && element.properties.imageUrl && (
                          <img
                            src={element.properties.imageUrl}
                            alt="Logo element"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Template Designer Modal */}
      <AnimatePresence>
        {showTemplateDesigner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTemplateDesigner(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold">Template Designer</h2>
                <Button variant="outline" onClick={() => setShowTemplateDesigner(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="p-6">
                <Tabs defaultValue="business-card" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="business-card">Business Card</TabsTrigger>
                    <TabsTrigger value="letterhead">Letterhead</TabsTrigger>
                    <TabsTrigger value="email-signature">Email Signature</TabsTrigger>
                    <TabsTrigger value="social-banner">Social Banner</TabsTrigger>
                  </TabsList>

                  <TabsContent value="business-card" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Company Name</label>
                          <Input placeholder="Enter company name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Job Title</label>
                          <Input placeholder="Enter job title" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Contact Info</label>
                          <Textarea placeholder="Enter contact information" rows={3} />
                        </div>
                        <Button className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Generate Business Card
                        </Button>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <FileText className="w-16 h-16 mx-auto mb-2" />
                          <p>Business Card Preview</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="letterhead" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Company Header</label>
                          <Input placeholder="Enter company header text" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Logo Position</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="top-left">Top Left</SelectItem>
                              <SelectItem value="top-center">Top Center</SelectItem>
                              <SelectItem value="top-right">Top Right</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Generate Letterhead
                        </Button>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <FileText className="w-16 h-16 mx-auto mb-2" />
                          <p>Letterhead Preview</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="email-signature" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Name</label>
                          <Input placeholder="Enter your name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Company</label>
                          <Input placeholder="Enter company name" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Contact Details</label>
                          <Textarea placeholder="Enter contact details" rows={3} />
                        </div>
                        <Button className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Generate Email Signature
                        </Button>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <FileText className="w-16 h-16 mx-auto mb-2" />
                          <p>Email Signature Preview</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="social-banner" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Banner Text</label>
                          <Input placeholder="Enter banner text" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Dimensions</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1200x630">Facebook (1200x630)</SelectItem>
                              <SelectItem value="1080x1080">Instagram (1080x1080)</SelectItem>
                              <SelectItem value="1500x500">Twitter (1500x500)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Generate Social Banner
                        </Button>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <FileText className="w-16 h-16 mx-auto mb-2" />
                          <p>Social Banner Preview</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Color Picker Modal */}
      <AnimatePresence>
        {showColorPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowColorPicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Add Brand Color</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowColorPicker(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Color Name</label>
                  <Input
                    value={newColor.name}
                    onChange={(e) => setNewColor(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Primary Blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Color</label>
                  <div className="flex items-center gap-3">
                    <Input
                      type="color"
                      value={newColor.hex}
                      onChange={(e) => setNewColor(prev => ({ ...prev, hex: e.target.value }))}
                      className="w-16 h-12"
                    />
                    <Input
                      value={newColor.hex}
                      onChange={(e) => setNewColor(prev => ({ ...prev, hex: e.target.value }))}
                      placeholder="#000000"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select value={newColor.category} onValueChange={(value: any) => setNewColor(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Primary</SelectItem>
                      <SelectItem value="secondary">Secondary</SelectItem>
                      <SelectItem value="accent">Accent</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Usage Description</label>
                  <Textarea
                    value={newColor.usage}
                    onChange={(e) => setNewColor(prev => ({ ...prev, usage: e.target.value }))}
                    placeholder="e.g., Main brand color, headers, primary buttons"
                    rows={2}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowColorPicker(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={addBrandColor}>
                    Add Color
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Font Manager Modal */}
      <AnimatePresence>
        {showFontManager && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowFontManager(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Add Brand Font</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowFontManager(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Font Name</label>
                  <Input
                    value={newFont.name}
                    onChange={(e) => setNewFont(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Roboto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select value={newFont.category} onValueChange={(value: string) => setNewFont(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sans-serif">Sans-serif</SelectItem>
                      <SelectItem value="serif">Serif</SelectItem>
                      <SelectItem value="monospace">Monospace</SelectItem>
                      <SelectItem value="display">Display</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Font Weights</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['100', '200', '300', '400', '500', '600', '700', '800', '900'].map((weight) => (
                      <button
                        key={weight}
                        onClick={() => {
                          const weights = newFont.weights.includes(weight)
                            ? newFont.weights.filter(w => w !== weight)
                            : [...newFont.weights, weight];
                          setNewFont(prev => ({ ...prev, weights }));
                        }}
                        className={`p-2 text-sm border rounded ${
                          newFont.weights.includes(weight)
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Usage Description</label>
                  <Textarea
                    value={newFont.usage}
                    onChange={(e) => setNewFont(prev => ({ ...prev, usage: e.target.value }))}
                    placeholder="e.g., Body text, UI elements, headings"
                    rows={2}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowFontManager(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={addBrandFont}>
                    Add Font
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Asset Manager Modal */}
      <AnimatePresence>
        {showAssetManager && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAssetManager(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Add Brand Asset</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAssetManager(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Asset Name</label>
                  <Input
                    value={newAsset.name}
                    onChange={(e) => setNewAsset(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Company Logo, Brand Icon"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Asset Type</label>
                  <Select value={newAsset.type} onValueChange={(value: any) => setNewAsset(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="logo">Logo</SelectItem>
                      <SelectItem value="icon">Icon</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (optional)</label>
                  <Input
                    value={newAsset.tags.join(', ')}
                    onChange={(e) => setNewAsset(prev => ({ 
                      ...prev, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                    }))}
                    placeholder="e.g., primary, dark, social media"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Separate tags with commas</p>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowAssetManager(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={addBrandAsset}>
                    Add Asset
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guideline Editor Modal */}
      <AnimatePresence>
        {showGuidelineEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowGuidelineEditor(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-lg p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Add Brand Guideline</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowGuidelineEditor(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={newGuideline.title}
                    onChange={(e) => setNewGuideline(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Logo Usage Guidelines"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select value={newGuideline.category} onValueChange={(value: any) => setNewGuideline(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="logo">Logo</SelectItem>
                      <SelectItem value="color">Color</SelectItem>
                      <SelectItem value="typography">Typography</SelectItem>
                      <SelectItem value="spacing">Spacing</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <Textarea
                    value={newGuideline.content}
                    onChange={(e) => setNewGuideline(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Describe the guideline, best practices, and usage rules..."
                    rows={4}
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setShowGuidelineEditor(false)}>
                    Cancel
                  </Button>
                  <Button className="flex-1" onClick={addBrandGuideline}>
                    Add Guideline
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
