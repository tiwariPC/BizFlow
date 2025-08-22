import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import {
  Users,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  MapPin,
  Calendar,
  Star,
  Eye,
  MessageSquare,
  Download,
  Upload,
  Plus,
  Target,
  BarChart3,
  FileText,
  Globe,
  Building2,
  Lightbulb,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Zap,
} from 'lucide-react';

interface Investor {
  id: string;
  name: string;
  company: string;
  type: 'Angel' | 'VC' | 'PE' | 'Corporate';
  focus: string[];
  investmentRange: string;
  location: string;
  rating: number;
  deals: number;
  avgInvestment: string;
  status: 'active' | 'inactive';
  lastActive: string;
  avatar: string;
}

interface FundingOpportunity {
  id: string;
  title: string;
  investor: string;
  type: 'Seed' | 'Series A' | 'Series B' | 'Series C';
  amount: string;
  equity: string;
  deadline: string;
  status: 'open' | 'closing' | 'closed';
  requirements: string[];
  description: string;
}

const investors: Investor[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    company: 'Innovation Ventures',
    type: 'VC',
    focus: ['SaaS', 'Fintech', 'AI/ML'],
    investmentRange: '₹5Cr - ₹50Cr',
    location: 'Mumbai',
    rating: 4.8,
    deals: 15,
    avgInvestment: '₹25Cr',
    status: 'active',
    lastActive: '2 hours ago',
    avatar: 'PS',
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    company: 'Startup Angels',
    type: 'Angel',
    focus: ['E-commerce', 'Healthtech', 'Edtech'],
    investmentRange: '₹50L - ₹5Cr',
    location: 'Delhi',
    rating: 4.6,
    deals: 8,
    avgInvestment: '₹2.5Cr',
    status: 'active',
    lastActive: '1 day ago',
    avatar: 'RK',
  },
  {
    id: '3',
    name: 'Anita Desai',
    company: 'Growth Capital Partners',
    type: 'PE',
    focus: ['Manufacturing', 'Logistics', 'B2B'],
    investmentRange: '₹50Cr - ₹500Cr',
    location: 'Bangalore',
    rating: 4.9,
    deals: 25,
    avgInvestment: '₹150Cr',
    status: 'active',
    lastActive: '3 hours ago',
    avatar: 'AD',
  },
  {
    id: '4',
    name: 'Sanjay Mehta',
    company: 'TechCorp Ventures',
    type: 'Corporate',
    focus: ['Deep Tech', 'IoT', 'Cybersecurity'],
    investmentRange: '₹10Cr - ₹100Cr',
    location: 'Chennai',
    rating: 4.7,
    deals: 12,
    avgInvestment: '₹45Cr',
    status: 'inactive',
    lastActive: '1 week ago',
    avatar: 'SM',
  },
];

const fundingOpportunities: FundingOpportunity[] = [
  {
    id: '1',
    title: 'SaaS Startup Funding Round',
    investor: 'Innovation Ventures',
    type: 'Series A',
    amount: '₹25Cr',
    equity: '15-20%',
    deadline: '2024-02-15',
    status: 'open',
    requirements: ['Minimum 10K users', '₹2Cr ARR', 'Strong unit economics'],
    description:
      'Looking for B2B SaaS startups with proven product-market fit and scalable business model.',
  },
  {
    id: '2',
    title: 'Fintech Seed Funding',
    investor: 'Startup Angels',
    type: 'Seed',
    amount: '₹2Cr',
    equity: '8-12%',
    deadline: '2024-01-30',
    status: 'closing',
    requirements: ['MVP ready', 'Regulatory compliance', 'Team of 3+'],
    description:
      'Supporting early-stage fintech startups with innovative payment or lending solutions.',
  },
  {
    id: '3',
    title: 'Manufacturing Scale-up',
    investor: 'Growth Capital Partners',
    type: 'Series B',
    amount: '₹100Cr',
    equity: '25-30%',
    deadline: '2024-03-01',
    status: 'open',
    requirements: ['₹50Cr revenue', 'Positive EBITDA', 'Expansion plan'],
    description:
      'Seeking manufacturing companies ready for national expansion and technology upgrade.',
  },
];

const pitchDeckTemplates = [
  {
    id: '1',
    title: 'SaaS Startup Pitch Deck',
    category: 'Technology',
    pages: 12,
    downloads: 450,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'E-commerce Business Plan',
    category: 'Retail',
    pages: 15,
    downloads: 320,
    rating: 4.6,
  },
  {
    id: '3',
    title: 'Fintech Investment Deck',
    category: 'Finance',
    pages: 18,
    downloads: 280,
    rating: 4.9,
  },
];

export default function InvestorConnect() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge className='bg-green-100 text-green-800'>Open</Badge>;
      case 'closing':
        return <Badge className='bg-yellow-100 text-yellow-800'>Closing Soon</Badge>;
      case 'closed':
        return <Badge className='bg-gray-100 text-gray-800'>Closed</Badge>;
      default:
        return <Badge className='bg-gray-100 text-gray-800'>Unknown</Badge>;
    }
  };

  const getInvestorTypeColor = (type: string) => {
    switch (type) {
      case 'Angel':
        return 'bg-blue-100 text-blue-800';
      case 'VC':
        return 'bg-green-100 text-green-800';
      case 'PE':
        return 'bg-purple-100 text-purple-800';
      case 'Corporate':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-neutral-900 mb-2'>Investor Connect</h1>
        <p className='text-neutral-600'>
          Connect with investors, find funding opportunities, and prepare your pitch
        </p>
      </div>

      {/* Stats Overview */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-8'>
        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-neutral-600 mb-1'>Active Investors</p>
                <p className='text-2xl font-bold text-neutral-900'>156</p>
              </div>
              <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                <Users className='w-6 h-6 text-blue-600' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-neutral-600 mb-1'>Funding Opportunities</p>
                <p className='text-2xl font-bold text-neutral-900'>23</p>
              </div>
              <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
                <DollarSign className='w-6 h-6 text-green-600' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-neutral-600 mb-1'>Total Funding Raised</p>
                <p className='text-2xl font-bold text-neutral-900'>₹2.5Cr</p>
              </div>
              <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center'>
                <TrendingUp className='w-6 h-6 text-purple-600' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-neutral-600 mb-1'>Connections Made</p>
                <p className='text-2xl font-bold text-neutral-900'>8</p>
              </div>
              <div className='w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center'>
                <Target className='w-6 h-6 text-orange-600' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Investors */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='flex items-center gap-2'>
                  <Users className='w-5 h-5' />
                  Active Investors
                </CardTitle>
                <div className='flex items-center gap-2'>
                  <div className='relative'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4' />
                    <Input
                      placeholder='Search investors...'
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className='pl-10 w-64'
                    />
                  </div>
                  <Button variant='outline' size='sm'>
                    <Filter className='w-4 h-4 mr-2' />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {investors.map(investor => (
                  <div key={investor.id} className='border border-neutral-200 rounded-lg p-6'>
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex items-start gap-4'>
                        <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center'>
                          <span className='font-semibold text-blue-600 text-lg'>
                            {investor.avatar}
                          </span>
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2 mb-2'>
                            <h3 className='font-semibold text-neutral-900'>{investor.name}</h3>
                            <Badge className={getInvestorTypeColor(investor.type)}>
                              {investor.type}
                            </Badge>
                            {investor.status === 'active' && (
                              <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                            )}
                          </div>
                          <p className='text-sm text-neutral-600 mb-2'>{investor.company}</p>
                          <div className='flex items-center gap-4 text-sm text-neutral-600'>
                            <span className='flex items-center gap-1'>
                              <MapPin className='w-4 h-4' />
                              {investor.location}
                            </span>
                            <span className='flex items-center gap-1'>
                              <Star className='w-4 h-4 text-yellow-500' />
                              {investor.rating} ({investor.deals} deals)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='text-right'>
                        <p className='font-semibold text-neutral-900'>{investor.investmentRange}</p>
                        <p className='text-sm text-neutral-600'>Avg: {investor.avgInvestment}</p>
                      </div>
                    </div>

                    <div className='mb-4'>
                      <p className='text-sm text-neutral-600 mb-2'>Focus Areas:</p>
                      <div className='flex flex-wrap gap-2'>
                        {investor.focus.map(area => (
                          <Badge key={area} variant='outline' className='text-xs'>
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      <span className='text-sm text-neutral-600'>
                        Last active: {investor.lastActive}
                      </span>
                      <div className='flex gap-2'>
                        <Button size='sm' variant='outline'>
                          <Eye className='w-4 h-4 mr-1' />
                          View Profile
                        </Button>
                        <Button size='sm'>
                          <MessageSquare className='w-4 h-4 mr-1' />
                          Connect
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Funding Opportunities */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='flex items-center gap-2'>
                  <DollarSign className='w-5 h-5' />
                  Funding Opportunities
                </CardTitle>
                <Button size='sm' className='flex items-center gap-2'>
                  <Plus className='w-4 h-4' />
                  Apply for Funding
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {fundingOpportunities.map(opportunity => (
                  <div key={opportunity.id} className='border border-neutral-200 rounded-lg p-6'>
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-2'>
                          <h3 className='font-semibold text-neutral-900'>{opportunity.title}</h3>
                          {getStatusBadge(opportunity.status)}
                        </div>
                        <p className='text-sm text-neutral-600 mb-2'>by {opportunity.investor}</p>
                        <div className='flex items-center gap-4 text-sm text-neutral-600'>
                          <span className='font-medium text-neutral-900'>{opportunity.amount}</span>
                          <span>•</span>
                          <span>{opportunity.equity} equity</span>
                          <span>•</span>
                          <span className='flex items-center gap-1'>
                            <Calendar className='w-4 h-4' />
                            Due: {opportunity.deadline}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className='text-sm text-neutral-600 mb-4'>{opportunity.description}</p>

                    <div className='mb-4'>
                      <p className='text-sm font-medium text-neutral-900 mb-2'>Requirements:</p>
                      <div className='space-y-1'>
                        {opportunity.requirements.map((req, index) => (
                          <div
                            key={index}
                            className='flex items-center gap-2 text-sm text-neutral-600'
                          >
                            <CheckCircle className='w-4 h-4 text-green-500' />
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-4 text-sm text-neutral-600'>
                        <span className='flex items-center gap-1'>
                          <Eye className='w-4 h-4' />
                          45 views
                        </span>
                        <span className='flex items-center gap-1'>
                          <Users className='w-4 h-4' />
                          12 applications
                        </span>
                      </div>
                      <Button size='sm'>Apply Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Pitch Deck Tools */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <FileText className='w-5 h-5' />
                Pitch Deck Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <Button className='w-full justify-start' variant='outline'>
                  <Upload className='w-4 h-4 mr-2' />
                  Upload Pitch Deck
                </Button>

                <Button className='w-full justify-start' variant='outline'>
                  <Plus className='w-4 h-4 mr-2' />
                  Create New Deck
                </Button>

                <div className='space-y-3'>
                  <h4 className='font-medium text-neutral-900'>Templates</h4>
                  {pitchDeckTemplates.map(template => (
                    <div key={template.id} className='p-3 border border-neutral-200 rounded-lg'>
                      <h5 className='font-medium text-neutral-900 mb-1'>{template.title}</h5>
                      <div className='flex items-center justify-between text-sm text-neutral-600'>
                        <span>{template.pages} pages</span>
                        <div className='flex items-center gap-1'>
                          <Star className='w-4 h-4 text-yellow-500' />
                          {template.rating}
                        </div>
                      </div>
                      <Button size='sm' variant='outline' className='w-full mt-2'>
                        <Download className='w-4 h-4 mr-1' />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                <Button className='w-full justify-start' variant='outline'>
                  <Target className='w-4 h-4 mr-2' />
                  Find Investors
                </Button>

                <Button className='w-full justify-start' variant='outline'>
                  <BarChart3 className='w-4 h-4 mr-2' />
                  Valuation Calculator
                </Button>

                <Button className='w-full justify-start' variant='outline'>
                  <Globe className='w-4 h-4 mr-2' />
                  Market Research
                </Button>

                <Button className='w-full justify-start' variant='outline'>
                  <Settings className='w-4 h-4 mr-2' />
                  Funding Preferences
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon */}
          <Card className='border-dashed border-2 border-neutral-300'>
            <CardContent className='p-4 text-center'>
              <div className='w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                <Zap className='w-6 h-6 text-neutral-500' />
              </div>
              <h4 className='font-medium text-neutral-900 mb-2'>Advanced Features</h4>
              <p className='text-sm text-neutral-600 mb-3'>
                AI-powered pitch deck analysis, investor matching algorithm, and deal flow
                management coming soon!
              </p>
              <Badge variant='outline' className='text-xs'>
                Coming Soon
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
