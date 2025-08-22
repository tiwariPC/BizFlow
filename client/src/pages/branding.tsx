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
  Triangle,
  Printer,
  CreditCard,
  Mail,
  Stamp,
  Info,
  Video,
  Mic,
  Camera,
  Brush,
  Ruler,
  Grid,
  Zap,
  MousePointer,
  FileVideo
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

interface PrintTemplate {
  id: string;
  name: string;
  type: 'letterhead' | 'business-card' | 'envelope' | 'stamp';
  design: any;
  companyInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    logo?: string;
  };
  specifications: {
    size: string;
    paper: string;
    quantity: number;
    color: string;
  };
  createdAt: string;
  status: 'draft' | 'ready' | 'printed';
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

// Design Tools Data
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
    icon: ImageIcon,
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

// Content Services Data
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

// Recent Projects Data
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

  // Print Template States
  const [showPrintDesigner, setShowPrintDesigner] = useState(false);
  const [selectedPrintType, setSelectedPrintType] = useState<'letterhead' | 'business-card' | 'envelope' | 'stamp' | null>(null);
  const [printTemplates, setPrintTemplates] = useState<PrintTemplate[]>([]);
  const [currentPrintDesign, setCurrentPrintDesign] = useState<any>(null);
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Your Company Name',
    address: '123 Business Street, City, State 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@yourcompany.com',
    website: 'www.yourcompany.com',
    logo: ''
  });
  const [printSpecifications, setPrintSpecifications] = useState({
    size: 'A4',
    paper: 'Premium White',
    quantity: 100,
    color: 'Full Color'
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

  // Print Template Functions
  const openPrintDesigner = (type: 'letterhead' | 'business-card' | 'envelope' | 'stamp') => {
    setSelectedPrintType(type);
    setShowPrintDesigner(true);

    // Initialize design based on type
    const defaultDesign = {
      header: { text: companyInfo.name, fontSize: 24, color: '#2563EB', position: { x: 50, y: 50 } },
      logo: { url: companyInfo.logo, position: { x: 50, y: 100 }, size: { width: 100, height: 50 } },
      contact: {
        address: companyInfo.address,
        phone: companyInfo.phone,
        email: companyInfo.email,
        website: companyInfo.website,
        position: { x: 50, y: 200 }
      }
    };

    setCurrentPrintDesign(defaultDesign);
  };

  const savePrintTemplate = () => {
    if (!selectedPrintType || !currentPrintDesign) return;

    const template: PrintTemplate = {
      id: Date.now().toString(),
      name: `${selectedPrintType.charAt(0).toUpperCase() + selectedPrintType.slice(1)} - ${companyInfo.name}`,
      type: selectedPrintType,
      design: currentPrintDesign,
      companyInfo: { ...companyInfo },
      specifications: { ...printSpecifications },
      createdAt: new Date().toISOString().split('T')[0],
      status: 'draft'
    };

    setPrintTemplates(prev => [template, ...prev]);
    setShowPrintDesigner(false);
    alert('Print template saved successfully!');
  };

  const exportPrintTemplate = (template: PrintTemplate) => {
    // In a real implementation, this would generate a PDF or print-ready file
    const templateData = {
      ...template,
      exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(templateData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    alert('Print template exported successfully!');
  };

  const printTemplate = (template: PrintTemplate) => {
    // In a real implementation, this would send to a print service
    alert(`Printing ${template.name}...\nQuantity: ${template.specifications.quantity}\nPaper: ${template.specifications.paper}\nColor: ${template.specifications.color}`);

    // Update status to printed
    setPrintTemplates(prev => prev.map(t =>
      t.id === template.id ? { ...t, status: 'printed' } : t
    ));
  };

  const getPrintSpecifications = (type: string) => {
    const specs = {
      letterhead: {
        size: 'A4 (210 x 297 mm)',
        paper: 'Premium White (100gsm)',
        quantity: 500,
        color: 'Full Color'
      },
      'business-card': {
        size: 'Standard (85 x 55 mm)',
        paper: 'Premium Card Stock (350gsm)',
        quantity: 1000,
        color: 'Full Color'
      },
      envelope: {
        size: 'DL (110 x 220 mm)',
        paper: 'Premium White (90gsm)',
        quantity: 500,
        color: 'Full Color'
      },
      stamp: {
        size: 'Custom (40 x 40 mm)',
        paper: 'Rubber Stamp Material',
        quantity: 1,
        color: 'Black'
      }
    };
    return specs[type as keyof typeof specs] || specs.letterhead;
  };

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

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "completed":
//         return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
//       case "in-progress":
//         return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
//       default:
//         return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
//     }
//   };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Branding & Identity</h1>
        <p className="text-neutral-600">Create and manage your brand assets</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-white p-1 rounded-lg border overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-shrink-0 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "overview"
                ? "bg-blue-600 text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("logo")}
            className={`flex-shrink-0 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "logo"
                ? "bg-blue-600 text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Logo Tools
          </button>
          <button
            onClick={() => setActiveTab("brand-kit")}
            className={`flex-shrink-0 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "brand-kit"
                ? "bg-blue-600 text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Brand Kit
          </button>
          <button
            onClick={() => setActiveTab("design-tools")}
            className={`flex-shrink-0 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "design-tools"
                ? "bg-blue-600 text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Design Tools
          </button>
          <button
            onClick={() => setActiveTab("content-services")}
            className={`flex-shrink-0 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "content-services"
                ? "bg-blue-600 text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Content Services
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={`flex-shrink-0 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === "templates"
                ? "bg-blue-600 text-white"
                : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            Print Templates
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
                    <p className="text-sm text-neutral-600 mb-1">Design Assets</p>
                    <p className="text-2xl font-bold text-neutral-900">156</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Palette className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Active Projects</p>
                    <p className="text-2xl font-bold text-neutral-900">12</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <PenTool className="w-6 h-6 text-green-600" />
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
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Button
                  onClick={() => setActiveTab("logo")}
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs">Logo Tools</span>
                </Button>

                <Button
                  onClick={() => setActiveTab("brand-kit")}
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                >
                  <Palette className="w-5 h-5" />
                  <span className="text-xs">Brand Kit</span>
                </Button>

                <Button
                  onClick={() => setActiveTab("design-tools")}
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
                >
                  <PenTool className="w-5 h-5" />
                  <span className="text-xs">Design</span>
                </Button>

                <Button
                  onClick={() => setActiveTab("content-services")}
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                >
                  <FileText className="w-5 h-5" />
                  <span className="text-xs">Content</span>
                </Button>

                <Button
                  onClick={() => setActiveTab("templates")}
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                >
                  <Printer className="w-5 h-5" />
                  <span className="text-xs">Print</span>
                </Button>

                <Button
                  onClick={() => setActiveTab("content-services")}
                  className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700"
                >
                  <Video className="w-5 h-5" />
                  <span className="text-xs">Video</span>
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
                        <p className="text-sm text-neutral-600">{project.type} • {project.designer || project.writer || project.producer}</p>
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

      {activeTab === "design-tools" && (
        <div className="space-y-8">
          {/* Design Tools Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Design Tools</h2>
              <p className="text-neutral-600">Professional design tools for creating stunning visuals</p>
            </div>
          </div>

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
                  <Button className="w-full" onClick={() => {
                    if (tool.name === "Logo Designer") {
                      setActiveTab("logo");
                    } else if (tool.name === "Color Palette Generator") {
                      setActiveTab("brand-kit");
                    } else {
                      alert(`${tool.name} tool is coming soon!`);
                    }
                  }}>
                    Open Tool
                  </Button>
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
                  <Button size="sm" variant="outline" className="w-full" onClick={() => setActiveTab("logo")}>
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
          {/* Content Services Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Content Services</h2>
              <p className="text-neutral-600">Professional content creation and media production services</p>
            </div>
          </div>

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
                    <Button className="flex-1" onClick={() => alert(`Requesting ${service.name} service...`)}>
                      Request Service
                    </Button>
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
                  <Textarea
                    placeholder="Describe your content requirements..."
                    className="w-full h-32 resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white" onClick={() => alert('Content request submitted successfully!')}>
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
          {/* Print Templates Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Print Templates</h2>
              <p className="text-neutral-600">Design and print professional business materials</p>
            </div>
          </div>

          {/* Print Templates Grid */}
          {printTemplates.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Printer className="w-5 h-5" />
                  Your Print Templates ({printTemplates.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {printTemplates.map((template) => (
                    <div key={template.id} className="p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          {template.type === 'letterhead' && <FileText className="w-6 h-6 text-blue-600" />}
                          {template.type === 'business-card' && <CreditCard className="w-6 h-6 text-blue-600" />}
                          {template.type === 'envelope' && <Mail className="w-6 h-6 text-blue-600" />}
                          {template.type === 'stamp' && <Stamp className="w-6 h-6 text-blue-600" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-neutral-900">{template.name}</h4>
                          <p className="text-sm text-neutral-600 capitalize">{template.type.replace('-', ' ')}</p>
                          <p className="text-xs text-neutral-500">{template.createdAt}</p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs">
                          <span>Status:</span>
                          <span className={`px-2 py-1 rounded text-xs ${
                            template.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            template.status === 'ready' ? 'bg-green-100 text-green-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {template.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span>Quantity:</span>
                          <span>{template.specifications.quantity}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span>Paper:</span>
                          <span>{template.specifications.paper}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => exportPrintTemplate(template)}>
                          <Download className="w-3 h-3 mr-1" />
                          Export
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => printTemplate(template)}>
                          <Printer className="w-3 h-3 mr-1" />
                          Print
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Create New Print Template */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Print Template
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Button
                  className="h-40 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
                  onClick={() => openPrintDesigner('letterhead')}
                >
                  <div className="w-16 h-20 bg-white border-2 border-neutral-300 rounded flex items-center justify-center">
                    <FileText className="w-8 h-8 text-neutral-400" />
                  </div>
                  <div className="text-center">
                    <span className="font-medium text-neutral-900">Letterhead</span>
                    <p className="text-xs text-neutral-600 mt-1">Professional letterhead design</p>
                  </div>
                </Button>

                <Button
                  className="h-40 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
                  onClick={() => openPrintDesigner('business-card')}
                >
                  <div className="w-20 h-12 bg-white border-2 border-neutral-300 rounded flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-neutral-400" />
                  </div>
                  <div className="text-center">
                    <span className="font-medium text-neutral-900">Business Card</span>
                    <p className="text-xs text-neutral-600 mt-1">Professional business cards</p>
                  </div>
                </Button>

                <Button
                  className="h-40 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
                  onClick={() => openPrintDesigner('envelope')}
                >
                  <div className="w-16 h-12 bg-white border-2 border-neutral-300 rounded flex items-center justify-center">
                    <Mail className="w-6 h-6 text-neutral-400" />
                  </div>
                  <div className="text-center">
                    <span className="font-medium text-neutral-900">Envelope</span>
                    <p className="text-xs text-neutral-600 mt-1">Custom envelope design</p>
                  </div>
                </Button>

                <Button
                  className="h-40 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
                  onClick={() => openPrintDesigner('stamp')}
                >
                  <div className="w-12 h-12 bg-white border-2 border-neutral-300 rounded flex items-center justify-center">
                    <Stamp className="w-6 h-6 text-neutral-400" />
                  </div>
                  <div className="text-center">
                    <span className="font-medium text-neutral-900">Company Stamp</span>
                    <p className="text-xs text-neutral-600 mt-1">Custom rubber stamp design</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Print Specifications Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Print Specifications Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-4 border border-neutral-200 rounded-lg">
                  <h4 className="font-medium text-neutral-900 mb-2">Letterhead</h4>
                  <div className="space-y-1 text-sm text-neutral-600">
                    <p><strong>Size:</strong> A4 (210 x 297 mm)</p>
                    <p><strong>Paper:</strong> Premium White (100gsm)</p>
                    <p><strong>Quantity:</strong> 500 sheets</p>
                    <p><strong>Color:</strong> Full Color</p>
                  </div>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg">
                  <h4 className="font-medium text-neutral-900 mb-2">Business Card</h4>
                  <div className="space-y-1 text-sm text-neutral-600">
                    <p><strong>Size:</strong> Standard (85 x 55 mm)</p>
                    <p><strong>Paper:</strong> Premium Card Stock (350gsm)</p>
                    <p><strong>Quantity:</strong> 1000 cards</p>
                    <p><strong>Color:</strong> Full Color</p>
                  </div>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg">
                  <h4 className="font-medium text-neutral-900 mb-2">Envelope</h4>
                  <div className="space-y-1 text-sm text-neutral-600">
                    <p><strong>Size:</strong> DL (110 x 220 mm)</p>
                    <p><strong>Paper:</strong> Premium White (90gsm)</p>
                    <p><strong>Quantity:</strong> 500 envelopes</p>
                    <p><strong>Color:</strong> Full Color</p>
                  </div>
                </div>

                <div className="p-4 border border-neutral-200 rounded-lg">
                  <h4 className="font-medium text-neutral-900 mb-2">Company Stamp</h4>
                  <div className="space-y-1 text-sm text-neutral-600">
                    <p><strong>Size:</strong> Custom (40 x 40 mm)</p>
                    <p><strong>Material:</strong> Rubber Stamp</p>
                    <p><strong>Quantity:</strong> 1 stamp</p>
                    <p><strong>Color:</strong> Black</p>
                  </div>
                </div>
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

      {/* Print Designer Modal */}
      <AnimatePresence>
        {showPrintDesigner && selectedPrintType && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowPrintDesigner(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg w-full max-w-6xl max-h-[95vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h2 className="text-2xl font-bold">Print Designer - {selectedPrintType.charAt(0).toUpperCase() + selectedPrintType.slice(1).replace('-', ' ')}</h2>
                  <p className="text-neutral-600">Design your professional {selectedPrintType.replace('-', ' ')}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={savePrintTemplate}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Template
                  </Button>
                  <Button variant="outline" onClick={() => setShowPrintDesigner(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex h-[calc(95vh-120px)]">
                {/* Left Sidebar - Company Info & Settings */}
                <div className="w-80 border-r bg-gray-50 p-4 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Company Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Company Name</label>
                        <Input
                          value={companyInfo.name}
                          onChange={(e) => setCompanyInfo(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Your Company Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <Textarea
                          value={companyInfo.address}
                          onChange={(e) => setCompanyInfo(prev => ({ ...prev, address: e.target.value }))}
                          placeholder="123 Business Street, City, State 12345"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <Input
                          value={companyInfo.phone}
                          onChange={(e) => setCompanyInfo(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <Input
                          value={companyInfo.email}
                          onChange={(e) => setCompanyInfo(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="info@yourcompany.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Website</label>
                        <Input
                          value={companyInfo.website}
                          onChange={(e) => setCompanyInfo(prev => ({ ...prev, website: e.target.value }))}
                          placeholder="www.yourcompany.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Print Specifications</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Size</label>
                        <Select
                          value={printSpecifications.size}
                          onValueChange={(value) => setPrintSpecifications(prev => ({ ...prev, size: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedPrintType === 'letterhead' && (
                              <>
                                <SelectItem value="A4 (210 x 297 mm)">A4 (210 x 297 mm)</SelectItem>
                                <SelectItem value="Letter (216 x 279 mm)">Letter (216 x 279 mm)</SelectItem>
                                <SelectItem value="Legal (216 x 356 mm)">Legal (216 x 356 mm)</SelectItem>
                              </>
                            )}
                            {selectedPrintType === 'business-card' && (
                              <>
                                <SelectItem value="Standard (85 x 55 mm)">Standard (85 x 55 mm)</SelectItem>
                                <SelectItem value="Square (85 x 85 mm)">Square (85 x 85 mm)</SelectItem>
                                <SelectItem value="European (85 x 55 mm)">European (85 x 55 mm)</SelectItem>
                              </>
                            )}
                            {selectedPrintType === 'envelope' && (
                              <>
                                <SelectItem value="DL (110 x 220 mm)">DL (110 x 220 mm)</SelectItem>
                                <SelectItem value="C4 (229 x 324 mm)">C4 (229 x 324 mm)</SelectItem>
                                <SelectItem value="C5 (162 x 229 mm)">C5 (162 x 229 mm)</SelectItem>
                              </>
                            )}
                            {selectedPrintType === 'stamp' && (
                              <>
                                <SelectItem value="Custom (40 x 40 mm)">Custom (40 x 40 mm)</SelectItem>
                                <SelectItem value="Large (50 x 50 mm)">Large (50 x 50 mm)</SelectItem>
                                <SelectItem value="Small (30 x 30 mm)">Small (30 x 30 mm)</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Paper</label>
                        <Select
                          value={printSpecifications.paper}
                          onValueChange={(value) => setPrintSpecifications(prev => ({ ...prev, paper: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedPrintType === 'letterhead' && (
                              <>
                                <SelectItem value="Premium White (100gsm)">Premium White (100gsm)</SelectItem>
                                <SelectItem value="Bond Paper (80gsm)">Bond Paper (80gsm)</SelectItem>
                                <SelectItem value="Recycled (90gsm)">Recycled (90gsm)</SelectItem>
                              </>
                            )}
                            {selectedPrintType === 'business-card' && (
                              <>
                                <SelectItem value="Premium Card Stock (350gsm)">Premium Card Stock (350gsm)</SelectItem>
                                <SelectItem value="Matte Finish (300gsm)">Matte Finish (300gsm)</SelectItem>
                                <SelectItem value="Glossy Finish (350gsm)">Glossy Finish (350gsm)</SelectItem>
                              </>
                            )}
                            {selectedPrintType === 'envelope' && (
                              <>
                                <SelectItem value="Premium White (90gsm)">Premium White (90gsm)</SelectItem>
                                <SelectItem value="Kraft Paper (80gsm)">Kraft Paper (80gsm)</SelectItem>
                                <SelectItem value="Recycled (85gsm)">Recycled (85gsm)</SelectItem>
                              </>
                            )}
                            {selectedPrintType === 'stamp' && (
                              <>
                                <SelectItem value="Rubber Stamp Material">Rubber Stamp Material</SelectItem>
                                <SelectItem value="Self-Inking">Self-Inking</SelectItem>
                                <SelectItem value="Custom Design">Custom Design</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Quantity</label>
                        <Input
                          type="number"
                          value={printSpecifications.quantity}
                          onChange={(e) => setPrintSpecifications(prev => ({ ...prev, quantity: parseInt(e.target.value) || 100 }))}
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Color</label>
                        <Select
                          value={printSpecifications.color}
                          onValueChange={(value) => setPrintSpecifications(prev => ({ ...prev, color: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full Color">Full Color</SelectItem>
                            <SelectItem value="Black & White">Black & White</SelectItem>
                            <SelectItem value="Spot Color">Spot Color</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Design Area */}
                <div className="flex-1 p-6">
                  <div className="h-full flex flex-col">
                    {/* Design Preview */}
                    <div className="flex-1 bg-white border-2 border-neutral-200 rounded-lg p-8 mb-4 overflow-auto">
                      <div className="relative w-full h-full min-h-[400px] bg-white">
                        {/* Letterhead Design */}
                        {selectedPrintType === 'letterhead' && (
                          <div className="w-full h-full relative">
                            {/* Header */}
                            <div className="absolute top-8 left-8 right-8">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h1 className="text-2xl font-bold text-blue-600 mb-2">{companyInfo.name}</h1>
                                  <div className="text-sm text-neutral-600 space-y-1">
                                    <p>{companyInfo.address}</p>
                                    <p>Phone: {companyInfo.phone}</p>
                                    <p>Email: {companyInfo.email}</p>
                                    <p>Website: {companyInfo.website}</p>
                                  </div>
                                </div>
                                <div className="w-24 h-16 bg-blue-100 rounded flex items-center justify-center">
                                  <span className="text-blue-600 text-xs">LOGO</span>
                                </div>
                              </div>
                            </div>

                            {/* Content Area */}
                            <div className="absolute top-48 left-8 right-8 bottom-8">
                              <div className="border-l-4 border-blue-600 pl-4">
                                <p className="text-lg font-medium mb-4">Sample Letterhead Content</p>
                                <p className="text-neutral-700 mb-2">This is where your letter content would appear.</p>
                                <p className="text-neutral-700 mb-2">The design includes your company branding and contact information.</p>
                                <p className="text-neutral-700">Professional and clean layout for business correspondence.</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Business Card Design */}
                        {selectedPrintType === 'business-card' && (
                          <div className="w-80 h-48 bg-white border-2 border-neutral-300 rounded-lg p-4 mx-auto">
                            <div className="h-full flex flex-col justify-between">
                              <div>
                                <h2 className="text-lg font-bold text-blue-600 mb-1">{companyInfo.name}</h2>
                                <p className="text-xs text-neutral-600 mb-2">Professional Title</p>
                              </div>
                              <div className="text-xs text-neutral-600 space-y-1">
                                <p>{companyInfo.address}</p>
                                <p>Phone: {companyInfo.phone}</p>
                                <p>Email: {companyInfo.email}</p>
                                <p>Website: {companyInfo.website}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Envelope Design */}
                        {selectedPrintType === 'envelope' && (
                          <div className="w-64 h-40 bg-white border-2 border-neutral-300 rounded-lg p-4 mx-auto">
                            <div className="h-full flex flex-col justify-center">
                              <div className="text-center">
                                <h2 className="text-sm font-bold text-blue-600 mb-2">{companyInfo.name}</h2>
                                <p className="text-xs text-neutral-600">{companyInfo.address}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Stamp Design */}
                        {selectedPrintType === 'stamp' && (
                          <div className="w-32 h-32 bg-white border-2 border-neutral-300 rounded-full mx-auto flex items-center justify-center">
                            <div className="text-center">
                              <h2 className="text-sm font-bold text-blue-600">{companyInfo.name}</h2>
                              <p className="text-xs text-neutral-600">Official</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-neutral-600">
                        <p><strong>Size:</strong> {printSpecifications.size}</p>
                        <p><strong>Paper:</strong> {printSpecifications.paper}</p>
                        <p><strong>Quantity:</strong> {printSpecifications.quantity}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => exportPrintTemplate({
                          id: 'preview',
                          name: `${selectedPrintType} - ${companyInfo.name}`,
                          type: selectedPrintType,
                          design: currentPrintDesign,
                          companyInfo,
                          specifications: printSpecifications,
                          createdAt: new Date().toISOString().split('T')[0],
                          status: 'draft'
                        })}>
                          <Download className="w-4 h-4 mr-2" />
                          Export Design
                        </Button>
                        <Button onClick={savePrintTemplate}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
