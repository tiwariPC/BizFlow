import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  TrendingUp,
  Globe,
  Share2,
  Mail,
  Users,
  Target,
  BarChart3,
  Calendar,
  Plus,
  Eye,
  Edit3,
  Send,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  MoreHorizontal,
  Phone,
  MessageSquare,
  MapPin,
  Star,
  Trash2,
  Copy,
  ExternalLink,
  Download,
  Upload,
  Settings,
  Bell,
  Zap,
  Lightbulb,
  Award,
  TrendingDown,
  Activity,
  PieChart,
  LineChart,
  Smartphone,
  Monitor,
  Tablet,
  X,
  Building2
} from "lucide-react";

// Mock data for campaigns
const mockCampaigns = [
  {
    id: 1,
    name: "Summer Sale Campaign",
    type: "Email",
    status: "active",
    sent: 1250,
    opened: 312,
    clicked: 89,
    converted: 23,
    revenue: 45000,
    startDate: "2024-06-01",
    endDate: "2024-08-31"
  },
  {
    id: 2,
    name: "New Product Launch",
    type: "Social Media",
    status: "draft",
    sent: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    revenue: 0,
    startDate: "2024-09-01",
    endDate: "2024-09-30"
  },
  {
    id: 3,
    name: "Holiday Special",
    type: "Email",
    status: "scheduled",
    sent: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    revenue: 0,
    startDate: "2024-12-01",
    endDate: "2024-12-31"
  }
];

// Mock data for leads
const mockLeads = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul@techcorp.com",
    phone: "+91 98765 43210",
    company: "TechCorp Solutions",
    status: "new",
    source: "Website",
    value: 50000,
    lastContact: "2024-08-20",
    notes: "Interested in enterprise solutions",
    assignedTo: "John Doe",
    priority: "high",
    tags: ["enterprise", "tech"]
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@innovate.com",
    phone: "+91 87654 32109",
    company: "Innovate Labs",
    status: "qualified",
    source: "LinkedIn",
    value: 75000,
    lastContact: "2024-08-19",
    notes: "Ready for demo",
    assignedTo: "Jane Smith",
    priority: "medium",
    tags: ["startup", "innovation"]
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit@startup.co",
    phone: "+91 76543 21098",
    company: "StartupXYZ",
    status: "proposal",
    source: "Referral",
    value: 100000,
    lastContact: "2024-08-18",
    notes: "Reviewing proposal",
    assignedTo: "Mike Johnson",
    priority: "high",
    tags: ["startup", "funding"]
  }
];

// Mock data for customers
const mockCustomers = [
  {
    id: 1,
    name: "TechCorp Solutions",
    contactPerson: "Rahul Sharma",
    email: "rahul@techcorp.com",
    phone: "+91 98765 43210",
    industry: "Technology",
    size: "Enterprise",
    status: "active",
    totalRevenue: 250000,
    lastPurchase: "2024-07-15",
    supportTickets: 3
  },
  {
    id: 2,
    name: "Innovate Labs",
    contactPerson: "Priya Patel",
    email: "priya@innovate.com",
    phone: "+91 87654 32109",
    industry: "Healthcare",
    size: "Mid-size",
    status: "active",
    totalRevenue: 180000,
    lastPurchase: "2024-08-10",
    supportTickets: 1
  }
];

// Mock data for support tickets
const mockSupportTickets = [
  {
    id: 1,
    customerName: "TechCorp Solutions",
    subject: "Integration API Issue",
    description: "Having trouble with the new API integration",
    status: "open",
    priority: "high",
    assignedTo: "Support Team",
    createdAt: "2024-08-20",
    lastUpdated: "2024-08-21"
  },
  {
    id: 2,
    customerName: "Innovate Labs",
    subject: "Feature Request",
    description: "Need additional reporting features",
    status: "in-progress",
    priority: "medium",
    assignedTo: "Product Team",
    createdAt: "2024-08-18",
    lastUpdated: "2024-08-20"
  },
  {
    id: 3,
    customerName: "TechCorp Solutions",
    subject: "Billing Question",
    description: "Clarification needed on invoice",
    status: "resolved",
    priority: "low",
    assignedTo: "Billing Team",
    createdAt: "2024-08-15",
    lastUpdated: "2024-08-16"
  }
];

// Mock data for deals
const mockDeals = [
  {
    id: 1,
    name: "Enterprise License Deal",
    customer: "TechCorp Solutions",
    value: 150000,
    stage: "negotiation",
    probability: 75,
    expectedClose: "2024-09-15",
    owner: "John Doe"
  },
  {
    id: 2,
    name: "Annual Subscription",
    customer: "Innovate Labs",
    value: 75000,
    stage: "proposal",
    probability: 60,
    expectedClose: "2024-09-30",
    owner: "Jane Smith"
  }
];

// Mock analytics data
const mockAnalytics = {
  website: {
    visitors: 15420,
    pageViews: 45680,
    bounceRate: 32.5,
    avgSession: "2m 45s",
    topPages: [
      { page: "/home", views: 12500, conversion: 3.2 },
      { page: "/services", views: 8900, conversion: 4.1 },
      { page: "/pricing", views: 6700, conversion: 5.8 }
    ]
  },
  social: {
    followers: 12500,
    engagement: 8.5,
    reach: 45600,
    topPlatforms: [
      { platform: "LinkedIn", followers: 5200, engagement: 12.3 },
      { platform: "Twitter", followers: 3800, engagement: 6.8 },
      { platform: "Instagram", followers: 3500, engagement: 9.2 }
    ]
  }
};

export default function Marketing() {
  const [activeTab, setActiveTab] = useState("overview");
  const [crmSubTab, setCrmSubTab] = useState("leads");
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [leads, setLeads] = useState(mockLeads);
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [showNewLead, setShowNewLead] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "draft": return "bg-gray-100 text-gray-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getLeadStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "qualified": return "bg-green-100 text-green-800";
      case "proposal": return "bg-orange-100 text-orange-800";
      case "negotiation": return "bg-purple-100 text-purple-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const calculateConversionRate = (campaign: any) => {
    if (campaign.sent === 0) return 0;
    return ((campaign.converted / campaign.sent) * 100).toFixed(2);
  };

  const calculateOpenRate = (campaign: any) => {
    if (campaign.sent === 0) return 0;
    return ((campaign.opened / campaign.sent) * 100).toFixed(2);
  };

  const calculateClickRate = (campaign: any) => {
    if (campaign.opened === 0) return 0;
    return ((campaign.clicked / campaign.opened) * 100).toFixed(2);
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Marketing & Sales</h1>
        <p className="text-neutral-600">Manage campaigns, leads, and grow your business</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-white p-1 rounded-lg border">
          {["overview", "campaigns", "CRM", "analytics", "website", "social"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Total Leads</p>
                      <p className="text-2xl font-bold text-neutral-900">1,247</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <ArrowUpRight className="w-4 h-4" />
                        +12.5%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Active Campaigns</p>
                      <p className="text-2xl font-bold text-neutral-900">8</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <ArrowUpRight className="w-4 h-4" />
                        +2
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Conversion Rate</p>
                      <p className="text-2xl font-bold text-neutral-900">3.2%</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <ArrowUpRight className="w-4 h-4" />
                        +0.8%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Target className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Revenue</p>
                      <p className="text-2xl font-bold text-neutral-900">₹2.4M</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <ArrowUpRight className="w-4 h-4" />
                        +18.3%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-orange-600" />
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
                  <Button
                    onClick={() => setActiveTab("campaigns")}
                    className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                  >
                    <Mail className="w-6 h-6" />
                    <span>Create Campaign</span>
                  </Button>

                  <Button
                    onClick={() => setActiveTab("crm")}
                    className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                  >
                    <Users className="w-6 h-6" />
                    <span>Add Lead</span>
                  </Button>

                  <Button
                    onClick={() => setActiveTab("website")}
                    className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
                  >
                    <Globe className="w-6 h-6" />
                    <span>Build Website</span>
                  </Button>

                  <Button
                    onClick={() => setActiveTab("social")}
                    className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                  >
                    <Share2 className="w-6 h-6" />
                    <span>Social Media</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">New lead qualified</p>
                      <p className="text-sm text-neutral-600">Priya Patel from Innovate Labs</p>
                    </div>
                    <span className="text-sm text-neutral-500">2 hours ago</span>
                  </div>

                  <div className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Send className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">Campaign sent</p>
                      <p className="text-sm text-neutral-600">Summer Sale Campaign to 1,250 contacts</p>
                    </div>
                    <span className="text-sm text-neutral-500">1 day ago</span>
                  </div>

                  <div className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">Deal closed</p>
                      <p className="text-sm text-neutral-600">₹75,000 deal with TechCorp Solutions</p>
                    </div>
                    <span className="text-sm text-neutral-500">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "campaigns" && (
          <motion.div
            key="campaigns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Email Campaigns</CardTitle>
                  <Button onClick={() => setShowNewCampaign(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Campaign
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium text-neutral-900">{campaign.name}</h4>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-neutral-600">
                          <div>
                            <span className="font-medium">Sent:</span> {campaign.sent.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Opened:</span> {campaign.opened.toLocaleString()} ({calculateOpenRate(campaign)}%)
                          </div>
                          <div>
                            <span className="font-medium">Clicked:</span> {campaign.clicked.toLocaleString()} ({calculateClickRate(campaign)}%)
                          </div>
                          <div>
                            <span className="font-medium">Converted:</span> {campaign.converted.toLocaleString()} ({calculateConversionRate(campaign)}%)
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={() => setSelectedCampaign(campaign)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "crm" && (
          <motion.div
            key="crm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* CRM Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Total Leads</p>
                      <p className="text-2xl font-bold text-neutral-900">{leads.length}</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <ArrowUpRight className="w-4 h-4" />
                        +15.2%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Pipeline Value</p>
                      <p className="text-2xl font-bold text-neutral-900">₹{leads.reduce((sum, lead) => sum + lead.value, 0).toLocaleString()}</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <ArrowUpRight className="w-4 h-4" />
                        +8.7%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Active Customers</p>
                      <p className="text-2xl font-bold text-neutral-900">{mockCustomers.length}</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <ArrowUpRight className="w-4 h-4" />
                        +12.5%
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Support Tickets</p>
                      <p className="text-2xl font-bold text-neutral-900">{mockSupportTickets.length}</p>
                      <p className="text-sm text-orange-600 flex items-center gap-1">
                        <ArrowDownRight className="w-4 h-4" />
                        +3
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Bell className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CRM Navigation Tabs */}
            <div className="flex space-x-1 bg-white p-1 rounded-lg border">
              {["leads", "customers", "deals", "support", "analytics"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setCrmSubTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors capitalize ${
                    crmSubTab === tab
                      ? "bg-blue-600 text-white"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Leads Management */}
            {crmSubTab === "leads" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Leads Management</CardTitle>
                        <p className="text-sm text-neutral-600 mt-1">Manage and track your leads through the sales pipeline</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter
                        </Button>
                        <Button onClick={() => setShowNewLead(true)} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Lead
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leads.map((lead) => (
                        <div key={lead.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-neutral-900">{lead.name}</h4>
                              <p className="text-sm text-neutral-600">{lead.email}</p>
                              <p className="text-sm text-neutral-500">{lead.company}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">{lead.source}</Badge>
                                <Badge variant="outline" className="text-xs">{lead.priority}</Badge>
                                <span className="text-xs text-neutral-500">Assigned: {lead.assignedTo}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-medium text-neutral-900">₹{lead.value.toLocaleString()}</p>
                              <Badge className={getLeadStatusColor(lead.status)}>
                                {lead.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" title="Call">
                                <Phone className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" title="Message">
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" title="View Details" onClick={() => setSelectedLead(lead)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" title="Edit">
                                <Edit3 className="w-4 h-4" />
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

            {/* Customer Database */}
            {crmSubTab === "customers" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Customer Database</CardTitle>
                        <p className="text-sm text-neutral-600 mt-1">Centralized customer information and relationship management</p>
                      </div>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Customer
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockCustomers.map((customer) => (
                        <div key={customer.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-neutral-900">{customer.name}</h4>
                              <p className="text-sm text-neutral-600">{customer.contactPerson}</p>
                              <p className="text-sm text-neutral-500">{customer.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">{customer.industry}</Badge>
                                <Badge variant="outline" className="text-xs">{customer.size}</Badge>
                                <Badge className="bg-green-100 text-green-800 text-xs">{customer.status}</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-medium text-neutral-900">₹{customer.totalRevenue.toLocaleString()}</p>
                              <p className="text-sm text-neutral-600">Last: {customer.lastPurchase}</p>
                              <p className="text-sm text-neutral-500">{customer.supportTickets} tickets</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" title="View Details">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" title="Edit">
                                <Edit3 className="w-4 h-4" />
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

            {/* Deals Management */}
            {crmSubTab === "deals" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Deals Management</CardTitle>
                        <p className="text-sm text-neutral-600 mt-1">Track opportunities and revenue forecasting</p>
                      </div>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Deal
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockDeals.map((deal) => (
                        <div key={deal.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                              <DollarSign className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-neutral-900">{deal.name}</h4>
                              <p className="text-sm text-neutral-600">{deal.customer}</p>
                              <p className="text-sm text-neutral-500">Owner: {deal.owner}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs capitalize">{deal.stage}</Badge>
                                <Badge variant="outline" className="text-xs">{deal.probability}%</Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-medium text-neutral-900">₹{deal.value.toLocaleString()}</p>
                              <p className="text-sm text-neutral-600">Expected: {deal.expectedClose}</p>
                              <div className="w-24 bg-neutral-200 rounded-full h-2 mt-1">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${deal.probability}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" title="View Details">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" title="Edit">
                                <Edit3 className="w-4 h-4" />
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

            {/* Support/Helpdesk */}
            {crmSubTab === "support" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Support Tickets</CardTitle>
                        <p className="text-sm text-neutral-600 mt-1">Customer support and helpdesk management</p>
                      </div>
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        New Ticket
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockSupportTickets.map((ticket) => (
                        <div key={ticket.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                              <Bell className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-neutral-900">{ticket.subject}</h4>
                              <p className="text-sm text-neutral-600">{ticket.customerName}</p>
                              <p className="text-sm text-neutral-500">{ticket.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs capitalize">{ticket.status}</Badge>
                                <Badge variant="outline" className="text-xs">{ticket.priority}</Badge>
                                <span className="text-xs text-neutral-500">Assigned: {ticket.assignedTo}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-neutral-600">Created: {ticket.createdAt}</p>
                              <p className="text-sm text-neutral-500">Updated: {ticket.lastUpdated}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" title="View Details">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" title="Edit">
                                <Edit3 className="w-4 h-4" />
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

            {/* Analytics & Reporting */}
            {crmSubTab === "analytics" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600">Conversion Rate</span>
                          <span className="font-medium">12.5%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600">Avg Deal Size</span>
                          <span className="font-medium">₹75,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600">Sales Cycle</span>
                          <span className="font-medium">45 days</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600">Win Rate</span>
                          <span className="font-medium">68%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600">Customer Lifetime Value</span>
                          <span className="font-medium">₹215,000</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600">Churn Rate</span>
                          <span className="font-medium">5.2%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600">NPS Score</span>
                          <span className="font-medium">8.5/10</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-neutral-600">Support Satisfaction</span>
                          <span className="font-medium">92%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Pipeline Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {["new", "qualified", "proposal", "negotiation", "closed"].map((stage) => {
                        const stageLeads = leads.filter(lead => lead.status === stage);
                        const stageValue = stageLeads.reduce((sum, lead) => sum + lead.value, 0);
                        return (
                          <div key={stage} className="text-center">
                            <div className="bg-neutral-50 rounded-lg p-4">
                              <h4 className="font-medium text-neutral-900 capitalize mb-2">{stage}</h4>
                              <p className="text-2xl font-bold text-neutral-900 mb-1">{stageLeads.length}</p>
                              <p className="text-sm text-neutral-600">₹{stageValue.toLocaleString()}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "analytics" && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {/* Website Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Website Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-900">{mockAnalytics.website.visitors.toLocaleString()}</p>
                    <p className="text-sm text-neutral-600">Visitors</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-900">{mockAnalytics.website.pageViews.toLocaleString()}</p>
                    <p className="text-sm text-neutral-600">Page Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-900">{mockAnalytics.website.bounceRate}%</p>
                    <p className="text-sm text-neutral-600">Bounce Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-900">{mockAnalytics.website.avgSession}</p>
                    <p className="text-sm text-neutral-600">Avg Session</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-neutral-900">Top Pages</h4>
                  {mockAnalytics.website.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-neutral-600">#{index + 1}</span>
                        <span className="font-medium text-neutral-900">{page.page}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <span>{page.views.toLocaleString()} views</span>
                        <span>{page.conversion}% conversion</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Media Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Social Media Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-900">{mockAnalytics.social.followers.toLocaleString()}</p>
                    <p className="text-sm text-neutral-600">Total Followers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-900">{mockAnalytics.social.engagement}%</p>
                    <p className="text-sm text-neutral-600">Engagement Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-900">{mockAnalytics.social.reach.toLocaleString()}</p>
                    <p className="text-sm text-neutral-600">Total Reach</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-neutral-900">Platform Performance</h4>
                  {mockAnalytics.social.topPlatforms.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-neutral-600">#{index + 1}</span>
                        <span className="font-medium text-neutral-900">{platform.platform}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <span>{platform.followers.toLocaleString()} followers</span>
                        <span>{platform.engagement}% engagement</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "website" && (
          <motion.div
            key="website"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Website Builder
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="pageName">Page Name</Label>
                      <Input
                        id="pageName"
                        placeholder="Enter page name"
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="template">Template</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="portfolio">Portfolio</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="blog">Blog</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="domain">Custom Domain</Label>
                      <Input
                        id="domain"
                        placeholder="yourdomain.com"
                        className="mt-2"
                      />
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <Globe className="w-4 h-4 mr-2" />
                      Build Website
                    </Button>
                  </div>

                  <div>
                    <Label>Preview</Label>
                    <div className="mt-2 w-full h-64 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Globe className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                        <p className="text-neutral-600">Website preview will appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Tools */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                    <Search className="w-6 h-6" />
                    <span>Keyword Research</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                    <BarChart3 className="w-6 h-6" />
                    <span>Site Audit</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    <span>Rankings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {activeTab === "social" && (
          <motion.div
            key="social"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Social Media Management</CardTitle>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Schedule Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">L</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900">LinkedIn</h4>
                        <p className="text-sm text-neutral-600">5,200 followers</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Post Now
                    </Button>
                  </div>

                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">T</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900">Twitter</h4>
                        <p className="text-sm text-neutral-600">3,800 followers</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Post Now
                    </Button>
                  </div>

                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">I</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-900">Instagram</h4>
                        <p className="text-sm text-neutral-600">3,500 followers</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Share2 className="w-4 h-4 mr-2" />
                      Post Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Calendar */}
            <Card>
              <CardHeader>
                <CardTitle>Content Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-neutral-900">Product Launch Announcement</h4>
                      <p className="text-sm text-neutral-600">Scheduled for Aug 25, 2024</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>
                      <Button size="sm" variant="outline">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-neutral-900">Industry Insights Post</h4>
                      <p className="text-sm text-neutral-600">Scheduled for Aug 28, 2024</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Draft</Badge>
                      <Button size="sm" variant="outline">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Campaign Modal */}
      {showNewCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Campaign</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input id="campaignName" placeholder="Enter campaign name" />
              </div>
              <div>
                <Label htmlFor="campaignType">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setShowNewCampaign(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1">Create</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Lead Modal */}
      {showNewLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add New Lead</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowNewLead(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="leadName">Full Name *</Label>
                  <Input id="leadName" placeholder="Enter full name" />
                </div>
                <div>
                  <Label htmlFor="leadEmail">Email *</Label>
                  <Input id="leadEmail" type="email" placeholder="Enter email address" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="leadPhone">Phone</Label>
                  <Input id="leadPhone" placeholder="Enter phone number" />
                </div>
                <div>
                  <Label htmlFor="leadCompany">Company</Label>
                  <Input id="leadCompany" placeholder="Enter company name" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="leadSource">Lead Source</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="cold-call">Cold Call</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="leadValue">Estimated Value</Label>
                  <Input id="leadValue" type="number" placeholder="₹0" />
                </div>
              </div>

              <div>
                <Label htmlFor="leadStatus">Status</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="negotiation">Negotiation</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="leadNotes">Notes</Label>
                <Textarea id="leadNotes" placeholder="Add any additional notes about this lead..." rows={3} />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={() => setShowNewLead(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1">Add Lead</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
