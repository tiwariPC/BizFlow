import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Globe,
  Search,
  Filter,
  Shield,
  FileText,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  DollarSign,
  Users,
  Building2,
  TrendingUp,
  Settings,
  Download,
  Upload,
  Plus,
  Eye,
  MessageSquare,
  BookOpen,
  Target,
  Zap,
  Flag,
  Scale,
  Gavel
} from "lucide-react";

interface CountryCompliance {
  id: string;
  country: string;
  flag: string;
  status: 'active' | 'pending' | 'expired';
  lastUpdated: string;
  nextDeadline: string;
  complianceScore: number;
  requirements: ComplianceRequirement[];
  documents: Document[];
}

interface ComplianceRequirement {
  id: string;
  title: string;
  category: 'Tax' | 'Legal' | 'Regulatory' | 'Financial';
  status: 'completed' | 'pending' | 'overdue';
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
}

interface Document {
  id: string;
  name: string;
  type: 'Certificate' | 'License' | 'Registration' | 'Report';
  status: 'valid' | 'expired' | 'pending';
  expiryDate: string;
  fileSize: string;
}

const countries: CountryCompliance[] = [
  {
    id: '1',
    country: 'United States',
    flag: '🇺🇸',
    status: 'active',
    lastUpdated: '2024-01-15',
    nextDeadline: '2024-04-15',
    complianceScore: 85,
    requirements: [
      {
        id: '1',
        title: 'EIN Registration',
        category: 'Tax',
        status: 'completed',
        dueDate: '2024-01-15',
        priority: 'high',
        description: 'Employer Identification Number registration with IRS'
      },
      {
        id: '2',
        title: 'State Business License',
        category: 'Legal',
        status: 'pending',
        dueDate: '2024-03-01',
        priority: 'high',
        description: 'Business license for California operations'
      },
      {
        id: '3',
        title: 'Sales Tax Registration',
        category: 'Tax',
        status: 'pending',
        dueDate: '2024-02-28',
        priority: 'medium',
        description: 'Sales tax permit for e-commerce operations'
      }
    ],
    documents: [
      {
        id: '1',
        name: 'EIN Certificate',
        type: 'Certificate',
        status: 'valid',
        expiryDate: 'N/A',
        fileSize: '2.3 MB'
      },
      {
        id: '2',
        name: 'Delaware Incorporation',
        type: 'Registration',
        status: 'valid',
        expiryDate: '2025-01-15',
        fileSize: '1.8 MB'
      }
    ]
  },
  {
    id: '2',
    country: 'United Kingdom',
    flag: '🇬🇧',
    status: 'pending',
    lastUpdated: '2024-01-10',
    nextDeadline: '2024-02-28',
    complianceScore: 60,
    requirements: [
      {
        id: '1',
        title: 'Companies House Registration',
        category: 'Legal',
        status: 'pending',
        dueDate: '2024-02-28',
        priority: 'high',
        description: 'Company registration with Companies House'
      },
      {
        id: '2',
        title: 'VAT Registration',
        category: 'Tax',
        status: 'pending',
        dueDate: '2024-03-15',
        priority: 'medium',
        description: 'Value Added Tax registration with HMRC'
      }
    ],
    documents: [
      {
        id: '1',
        name: 'Business Plan',
        type: 'Report',
        status: 'pending',
        expiryDate: 'N/A',
        fileSize: '5.2 MB'
      }
    ]
  },
  {
    id: '3',
    country: 'Singapore',
    flag: '🇸🇬',
    status: 'active',
    lastUpdated: '2024-01-20',
    nextDeadline: '2024-06-30',
    complianceScore: 92,
    requirements: [
      {
        id: '1',
        title: 'ACRA Registration',
        category: 'Legal',
        status: 'completed',
        dueDate: '2024-01-20',
        priority: 'high',
        description: 'Company registration with Accounting and Corporate Regulatory Authority'
      },
      {
        id: '2',
        title: 'GST Registration',
        category: 'Tax',
        status: 'completed',
        dueDate: '2024-01-20',
        priority: 'high',
        description: 'Goods and Services Tax registration'
      }
    ],
    documents: [
      {
        id: '1',
        name: 'ACRA Certificate',
        type: 'Certificate',
        status: 'valid',
        expiryDate: '2025-01-20',
        fileSize: '3.1 MB'
      },
      {
        id: '2',
        name: 'GST Certificate',
        type: 'Certificate',
        status: 'valid',
        expiryDate: 'N/A',
        fileSize: '2.7 MB'
      }
    ]
  },
  {
    id: '4',
    country: 'Australia',
    flag: '🇦🇺',
    status: 'expired',
    lastUpdated: '2023-12-01',
    nextDeadline: '2024-01-31',
    complianceScore: 45,
    requirements: [
      {
        id: '1',
        title: 'ASIC Registration',
        category: 'Legal',
        status: 'overdue',
        dueDate: '2024-01-31',
        priority: 'high',
        description: 'Australian Securities and Investments Commission registration'
      },
      {
        id: '2',
        title: 'ABN Registration',
        category: 'Tax',
        status: 'overdue',
        dueDate: '2024-01-31',
        priority: 'high',
        description: 'Australian Business Number registration'
      }
    ],
    documents: [
      {
        id: '1',
        name: 'ASIC Certificate',
        type: 'Certificate',
        status: 'expired',
        expiryDate: '2024-01-31',
        fileSize: '2.9 MB'
      }
    ]
  }
];

const complianceCategories = [
  { name: 'All', count: 12, color: 'bg-blue-100 text-blue-600' },
  { name: 'Tax', count: 5, color: 'bg-green-100 text-green-600' },
  { name: 'Legal', count: 4, color: 'bg-purple-100 text-purple-600' },
  { name: 'Regulatory', count: 2, color: 'bg-orange-100 text-orange-600' },
  { name: 'Financial', count: 1, color: 'bg-red-100 text-red-600' }
];

const globalRegulations = [
  {
    id: '1',
    title: 'GDPR Compliance',
    region: 'European Union',
    description: 'General Data Protection Regulation compliance for data handling',
    status: 'required',
    deadline: '2024-05-25'
  },
  {
    id: '2',
    title: 'SOX Compliance',
    region: 'United States',
    description: 'Sarbanes-Oxley Act compliance for financial reporting',
    status: 'required',
    deadline: '2024-03-31'
  },
  {
    id: '3',
    title: 'ISO 27001',
    region: 'Global',
    description: 'Information security management system certification',
    status: 'recommended',
    deadline: '2024-06-30'
  }
];

export default function InternationalCompliance() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getRequirementStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'overdue':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getComplianceScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">International Compliance</h1>
        <p className="text-neutral-600">Manage compliance requirements across multiple countries and jurisdictions</p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Active Countries</p>
                <p className="text-2xl font-bold text-neutral-900">4</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Total Requirements</p>
                <p className="text-2xl font-bold text-neutral-900">12</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Pending Deadlines</p>
                <p className="text-2xl font-bold text-neutral-900">5</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Avg Compliance Score</p>
                <p className="text-2xl font-bold text-neutral-900">70%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Country Compliance Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Country Compliance Overview
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                    <Input
                      placeholder="Search countries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Country
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {countries.map((country) => (
                  <div key={country.id} className="border border-neutral-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{country.flag}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-neutral-900">{country.country}</h3>
                            {getStatusBadge(country.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-neutral-600">
                            <span>Last updated: {country.lastUpdated}</span>
                            <span>Next deadline: {country.nextDeadline}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-2xl font-bold ${getComplianceScoreColor(country.complianceScore)}`}>
                          {country.complianceScore}%
                        </p>
                        <p className="text-sm text-neutral-600">Compliance Score</p>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-4">
                      <h4 className="font-medium text-neutral-900 mb-3">Requirements</h4>
                      <div className="space-y-2">
                        {country.requirements.map((req) => (
                          <div key={req.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-medium text-neutral-900">{req.title}</h5>
                                <Badge variant="outline" className="text-xs">{req.category}</Badge>
                              </div>
                              <p className="text-sm text-neutral-600">{req.description}</p>
                            </div>
                            <div className="text-right">
                              <p className={`text-sm font-medium ${getRequirementStatusColor(req.status)}`}>
                                {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                              </p>
                              <p className="text-xs text-neutral-600">Due: {req.dueDate}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="mb-4">
                      <h4 className="font-medium text-neutral-900 mb-3">Documents</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {country.documents.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-neutral-400" />
                              <div>
                                <p className="font-medium text-neutral-900">{doc.name}</p>
                                <p className="text-sm text-neutral-600">{doc.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge className={doc.status === 'valid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {doc.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <span>{country.requirements.length} requirements</span>
                        <span>{country.documents.length} documents</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm">
                          <Settings className="w-4 h-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Global Regulations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Global Regulations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {globalRegulations.map((regulation) => (
                  <div key={regulation.id} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-neutral-900 mb-1">{regulation.title}</h4>
                        <p className="text-sm text-neutral-600 mb-2">{regulation.description}</p>
                        <div className="flex items-center gap-4 text-sm text-neutral-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {regulation.region}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Due: {regulation.deadline}
                          </span>
                        </div>
                      </div>
                      <Badge className={regulation.status === 'required' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}>
                        {regulation.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <BookOpen className="w-4 h-4 mr-1" />
                        Learn More
                      </Button>
                      <Button size="sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Start Compliance
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories Filter */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {complianceCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                      selectedCategory === category.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <span className="font-medium text-neutral-900">{category.name}</span>
                    <Badge className={category.color}>{category.count}</Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Documents
                </Button>

                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Deadlines
                </Button>

                <Button className="w-full justify-start" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Reports
                </Button>

                <Button className="w-full justify-start" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Experts
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="font-medium text-red-800">Australia ASIC Expired</span>
                  </div>
                  <p className="text-sm text-red-700">Registration expired on Jan 31, 2024</p>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">UK VAT Registration</span>
                  </div>
                  <p className="text-sm text-yellow-700">Due in 15 days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon */}
          <Card className="border-dashed border-2 border-neutral-300">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-neutral-500" />
              </div>
              <h4 className="font-medium text-neutral-900 mb-2">Advanced Features</h4>
              <p className="text-sm text-neutral-600 mb-3">
                AI-powered compliance monitoring, automated filing, and real-time regulatory updates coming soon!
              </p>
              <Badge variant="outline" className="text-xs">Coming Soon</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

