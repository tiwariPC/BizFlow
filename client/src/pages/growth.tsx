import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import {
  Palette,
  Upload,
  Download,
  Eye,
  Plus,
  Settings,
  TrendingUp,
  Users,
  Mail,
  Globe,
  Calendar,
  BarChart3,
  Target,
  MessageSquare,
  Image,
  Type,
  Droplets,
  Layout,
  FileText,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';

const brandKit = {
  colors: [
    { name: 'Primary Blue', hex: '#3B82F6', usage: 'Main brand color' },
    { name: 'Secondary Green', hex: '#10B981', usage: 'Accent color' },
    { name: 'Neutral Gray', hex: '#6B7280', usage: 'Text and borders' },
    { name: 'Warning Orange', hex: '#F59E0B', usage: 'Alerts and highlights' },
  ],
  fonts: [
    { name: 'Inter', weight: 'Regular, Medium, Bold', usage: 'Primary text' },
    { name: 'Poppins', weight: 'Semi-bold, Bold', usage: 'Headings' },
  ],
  templates: [
    { name: 'Business Card', type: 'card', preview: 'BC' },
    { name: 'Letterhead', type: 'letter', preview: 'LH' },
    { name: 'Email Signature', type: 'email', preview: 'ES' },
    { name: 'Pitch Deck', type: 'presentation', preview: 'PD' },
  ],
};

const marketingCampaigns = [
  {
    id: 1,
    name: 'Q1 Product Launch',
    type: 'Email',
    status: 'active',
    opens: 1250,
    clicks: 89,
    conversions: 12,
    budget: 5000,
  },
  {
    id: 2,
    name: 'Social Media Campaign',
    type: 'Social',
    status: 'scheduled',
    opens: 0,
    clicks: 0,
    conversions: 0,
    budget: 3000,
  },
  {
    id: 3,
    name: 'Website Promotion',
    type: 'Digital',
    status: 'completed',
    opens: 2100,
    clicks: 156,
    conversions: 23,
    budget: 4000,
  },
];

const crmPipeline = {
  leads: [
    {
      id: 1,
      name: 'TechCorp Solutions',
      email: 'contact@techcorp.com',
      status: 'New',
      value: 25000,
    },
    {
      id: 2,
      name: 'Digital Marketing Pro',
      email: 'hello@dmp.com',
      status: 'Contacted',
      value: 15000,
    },
  ],
  prospects: [
    { id: 3, name: 'StartupXYZ', email: 'info@startupxyz.com', status: 'Qualified', value: 35000 },
    {
      id: 4,
      name: 'Innovation Labs',
      email: 'contact@innovationlabs.com',
      status: 'Proposal',
      value: 20000,
    },
  ],
  clients: [
    { id: 5, name: 'Established Corp', email: 'admin@estcorp.com', status: 'Active', value: 50000 },
  ],
};

const websiteBuilder = {
  sections: [
    { name: 'Hero Section', type: 'hero', status: 'published' },
    { name: 'About Us', type: 'content', status: 'draft' },
    { name: 'Services', type: 'services', status: 'published' },
    { name: 'Contact Form', type: 'contact', status: 'published' },
  ],
};

export default function Growth() {
  const [selectedPeriod, setSelectedPeriod] = useState('current');
  const [activeTab, setActiveTab] = useState('branding');
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className='bg-green-100 text-green-800'>Active</Badge>;
      case 'scheduled':
        return <Badge className='bg-blue-100 text-blue-800'>Scheduled</Badge>;
      case 'completed':
        return <Badge className='bg-gray-100 text-gray-800'>Completed</Badge>;
      case 'draft':
        return <Badge className='bg-yellow-100 text-yellow-800'>Draft</Badge>;
      case 'published':
        return <Badge className='bg-green-100 text-green-800'>Published</Badge>;
      default:
        return <Badge className='bg-gray-100 text-gray-800'>Unknown</Badge>;
    }
  };

  const getPipelineStatusIcon = (status: string) => {
    switch (status) {
      case 'New':
        return <Plus className='w-4 h-4 text-blue-600' />;
      case 'Contacted':
        return <MessageSquare className='w-4 h-4 text-yellow-600' />;
      case 'Qualified':
        return <Target className='w-4 h-4 text-orange-600' />;
      case 'Proposal':
        return <FileText className='w-4 h-4 text-purple-600' />;
      case 'Active':
        return <CheckCircle className='w-4 h-4 text-green-600' />;
      default:
        return <Clock className='w-4 h-4 text-gray-600' />;
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-neutral-900 mb-2'>Growth & Marketing</h1>
        <p className='text-neutral-600'>Build your brand and grow your business</p>
      </div>

      {/* Tab Navigation */}
      <div className='mb-8'>
        <div className='flex space-x-1 bg-white p-1 rounded-lg border'>
          <button
            onClick={() => setActiveTab('branding')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'branding'
                ? 'bg-blue-600 text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Branding & Identity
          </button>
          <button
            onClick={() => setActiveTab('marketing')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'marketing'
                ? 'bg-blue-600 text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Marketing & Sales
          </button>
        </div>
      </div>

      {activeTab === 'branding' && (
        <div className='space-y-8'>
          {/* Logo Generator */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Palette className='w-5 h-5' />
                Logo Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {/* Upload Section */}
                <div className='space-y-4'>
                  <div className='border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center'>
                    <Upload className='w-12 h-12 text-neutral-400 mx-auto mb-4' />
                    <h3 className='text-lg font-semibold text-neutral-900 mb-2'>
                      Upload Your Logo
                    </h3>
                    <p className='text-neutral-600 mb-4'>
                      Upload an existing logo or create one with AI
                    </p>
                    <Button className='flex items-center gap-2'>
                      <Upload className='w-4 h-4' />
                      Choose File
                    </Button>
                  </div>

                  <div className='space-y-3'>
                    <h4 className='font-medium text-neutral-900'>AI Logo Generator</h4>
                    <Input placeholder="Describe your brand (e.g., 'Modern tech company with blue theme')" />
                    <Button className='w-full'>Generate Logo with AI</Button>
                  </div>
                </div>

                {/* Preview Section */}
                <div className='space-y-4'>
                  <h4 className='font-medium text-neutral-900'>Logo Preview</h4>
                  <div className='border border-neutral-200 rounded-lg p-8 bg-white text-center'>
                    <div className='w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center'>
                      <span className='text-white text-2xl font-bold'>LOGO</span>
                    </div>
                    <p className='text-sm text-neutral-600'>Your logo will appear here</p>
                  </div>
                  <div className='flex gap-2'>
                    <Button variant='outline' className='flex-1'>
                      <Download className='w-4 h-4 mr-2' />
                      Download
                    </Button>
                    <Button variant='outline' className='flex-1'>
                      <Settings className='w-4 h-4 mr-2' />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Brand Kit Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Layout className='w-5 h-5' />
                Brand Kit Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Colors */}
                <div>
                  <h4 className='font-medium text-neutral-900 mb-4 flex items-center gap-2'>
                    <Droplets className='w-4 h-4' />
                    Brand Colors
                  </h4>
                  <div className='space-y-3'>
                    {brandKit.colors.map((color, index) => (
                      <div
                        key={index}
                        className='flex items-center gap-3 p-3 border border-neutral-200 rounded-lg'
                      >
                        <div
                          className='w-8 h-8 rounded-full border border-neutral-200'
                          style={{ backgroundColor: color.hex }}
                        ></div>
                        <div className='flex-1'>
                          <p className='font-medium text-neutral-900'>{color.name}</p>
                          <p className='text-sm text-neutral-600'>{color.hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fonts */}
                <div>
                  <h4 className='font-medium text-neutral-900 mb-4 flex items-center gap-2'>
                    <Type className='w-4 h-4' />
                    Typography
                  </h4>
                  <div className='space-y-3'>
                    {brandKit.fonts.map((font, index) => (
                      <div key={index} className='p-3 border border-neutral-200 rounded-lg'>
                        <p className='font-medium text-neutral-900'>{font.name}</p>
                        <p className='text-sm text-neutral-600'>{font.weight}</p>
                        <p className='text-sm text-neutral-600'>{font.usage}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Templates */}
                <div>
                  <h4 className='font-medium text-neutral-900 mb-4 flex items-center gap-2'>
                    <FileText className='w-4 h-4' />
                    Templates
                  </h4>
                  <div className='space-y-3'>
                    {brandKit.templates.map((template, index) => (
                      <div key={index} className='p-3 border border-neutral-200 rounded-lg'>
                        <div className='flex items-center justify-between mb-2'>
                          <p className='font-medium text-neutral-900'>{template.name}</p>
                          <Button size='sm' variant='outline'>
                            <Download className='w-4 h-4' />
                          </Button>
                        </div>
                        <div className='w-full h-12 bg-neutral-100 rounded flex items-center justify-center'>
                          <span className='text-neutral-600 font-medium'>{template.preview}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'marketing' && (
        <div className='space-y-8'>
          {/* Website Builder */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Globe className='w-5 h-5' />
                Website Builder
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div>
                  <h4 className='font-medium text-neutral-900 mb-4'>Page Sections</h4>
                  <div className='space-y-3'>
                    {websiteBuilder.sections.map((section, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between p-3 border border-neutral-200 rounded-lg'
                      >
                        <div>
                          <p className='font-medium text-neutral-900'>{section.name}</p>
                          <p className='text-sm text-neutral-600'>Type: {section.type}</p>
                        </div>
                        <div className='flex items-center gap-2'>
                          {getStatusBadge(section.status)}
                          <Button size='sm' variant='outline'>
                            <Eye className='w-4 h-4' />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className='w-full mt-4'>
                    <Plus className='w-4 h-4 mr-2' />
                    Add New Section
                  </Button>
                </div>

                <div>
                  <h4 className='font-medium text-neutral-900 mb-4'>Website Preview</h4>
                  <div className='border border-neutral-200 rounded-lg p-6 bg-white'>
                    <div className='space-y-2'>
                      <div className='h-8 bg-blue-600 rounded'></div>
                      <div className='h-16 bg-neutral-100 rounded'></div>
                      <div className='h-12 bg-neutral-50 rounded'></div>
                      <div className='h-20 bg-neutral-100 rounded'></div>
                      <div className='h-8 bg-neutral-600 rounded'></div>
                    </div>
                    <p className='text-center text-sm text-neutral-600 mt-4'>Website preview</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Marketing Campaigns */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <TrendingUp className='w-5 h-5' />
                Marketing Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {marketingCampaigns.map(campaign => (
                  <div
                    key={campaign.id}
                    className='flex items-center justify-between p-4 border border-neutral-200 rounded-lg'
                  >
                    <div className='flex items-center gap-4'>
                      <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                        <Mail className='w-6 h-6 text-blue-600' />
                      </div>
                      <div>
                        <h4 className='font-medium text-neutral-900'>{campaign.name}</h4>
                        <p className='text-sm text-neutral-600'>Type: {campaign.type}</p>
                      </div>
                    </div>
                    <div className='flex items-center gap-6'>
                      <div className='text-right'>
                        <p className='text-sm text-neutral-600'>Opens: {campaign.opens}</p>
                        <p className='text-sm text-neutral-600'>Clicks: {campaign.clicks}</p>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm text-neutral-600'>
                          Conversions: {campaign.conversions}
                        </p>
                        <p className='text-sm text-neutral-600'>Budget: ₹{campaign.budget}</p>
                      </div>
                      {getStatusBadge(campaign.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CRM Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Users className='w-5 h-5' />
                CRM Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* Leads */}
                <div>
                  <h4 className='font-medium text-neutral-900 mb-4'>
                    Leads ({crmPipeline.leads.length})
                  </h4>
                  <div className='space-y-3'>
                    {crmPipeline.leads.map(lead => (
                      <div key={lead.id} className='p-3 border border-neutral-200 rounded-lg'>
                        <div className='flex items-center gap-2 mb-2'>
                          {getPipelineStatusIcon(lead.status)}
                          <span className='text-sm font-medium text-neutral-900'>{lead.name}</span>
                        </div>
                        <p className='text-sm text-neutral-600 mb-2'>{lead.email}</p>
                        <p className='text-sm font-semibold text-neutral-900'>
                          ₹{lead.value.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prospects */}
                <div>
                  <h4 className='font-medium text-neutral-900 mb-4'>
                    Prospects ({crmPipeline.prospects.length})
                  </h4>
                  <div className='space-y-3'>
                    {crmPipeline.prospects.map(prospect => (
                      <div key={prospect.id} className='p-3 border border-neutral-200 rounded-lg'>
                        <div className='flex items-center gap-2 mb-2'>
                          {getPipelineStatusIcon(prospect.status)}
                          <span className='text-sm font-medium text-neutral-900'>
                            {prospect.name}
                          </span>
                        </div>
                        <p className='text-sm text-neutral-600 mb-2'>{prospect.email}</p>
                        <p className='text-sm font-semibold text-neutral-900'>
                          ₹{prospect.value.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clients */}
                <div>
                  <h4 className='font-medium text-neutral-900 mb-4'>
                    Clients ({crmPipeline.clients.length})
                  </h4>
                  <div className='space-y-3'>
                    {crmPipeline.clients.map(client => (
                      <div key={client.id} className='p-3 border border-neutral-200 rounded-lg'>
                        <div className='flex items-center gap-2 mb-2'>
                          {getPipelineStatusIcon(client.status)}
                          <span className='text-sm font-medium text-neutral-900'>
                            {client.name}
                          </span>
                        </div>
                        <p className='text-sm text-neutral-600 mb-2'>{client.email}</p>
                        <p className='text-sm font-semibold text-neutral-900'>
                          ₹{client.value.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
