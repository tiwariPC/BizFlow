import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import {
  Store,
  Search,
  Filter,
  Star,
  Eye,
  MessageSquare,
  Download,
  Upload,
  Palette,
  PenTool,
  Image,
  FileText,
  Video,
  Users,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Heart,
} from 'lucide-react';

const serviceProviders = [
  {
    id: 1,
    name: 'Design Studio Pro',
    category: 'Graphic Design',
    rating: 4.8,
    reviews: 124,
    location: 'Mumbai',
    price: '₹5,000 - ₹25,000',
    services: ['Logo Design', 'Brand Identity', 'UI/UX Design'],
    portfolio: 45,
    responseTime: '2 hours',
    verified: true,
  },
  {
    id: 2,
    name: 'Content Creators Hub',
    category: 'Content Writing',
    rating: 4.6,
    reviews: 89,
    location: 'Delhi',
    price: '₹2,000 - ₹15,000',
    services: ['Copywriting', 'Blog Posts', 'Social Media Content'],
    portfolio: 32,
    responseTime: '4 hours',
    verified: true,
  },
  {
    id: 3,
    name: 'Video Masters',
    category: 'Video Production',
    rating: 4.9,
    reviews: 67,
    location: 'Bangalore',
    price: '₹10,000 - ₹50,000',
    services: ['Promotional Videos', 'Animation', 'Video Editing'],
    portfolio: 28,
    responseTime: '6 hours',
    verified: true,
  },
  {
    id: 4,
    name: 'Legal Eagles',
    category: 'Legal Services',
    rating: 4.7,
    reviews: 156,
    location: 'Chennai',
    price: '₹3,000 - ₹20,000',
    services: ['Contract Review', 'Legal Consultation', 'Compliance'],
    portfolio: 12,
    responseTime: '24 hours',
    verified: true,
  },
];

const serviceRequests = [
  {
    id: 1,
    title: 'Need Logo Design for Tech Startup',
    category: 'Graphic Design',
    budget: '₹8,000 - ₹12,000',
    postedBy: 'TechCorp Solutions',
    postedDate: '2 hours ago',
    proposals: 8,
    status: 'active',
  },
  {
    id: 2,
    title: 'Website Content for E-commerce',
    category: 'Content Writing',
    budget: '₹5,000 - ₹8,000',
    postedBy: 'ShopEasy',
    postedDate: '5 hours ago',
    proposals: 12,
    status: 'active',
  },
  {
    id: 3,
    title: 'Marketing Video for Product Launch',
    category: 'Video Production',
    budget: '₹25,000 - ₹35,000',
    postedBy: 'InnovateLabs',
    postedDate: '1 day ago',
    proposals: 6,
    status: 'active',
  },
];

const categories = [
  { name: 'Graphic Design', icon: Palette, count: 45, color: 'bg-blue-100 text-blue-600' },
  { name: 'Content Writing', icon: FileText, count: 32, color: 'bg-green-100 text-green-600' },
  { name: 'Video Production', icon: Video, count: 18, color: 'bg-purple-100 text-purple-600' },
  { name: 'Legal Services', icon: CheckCircle, count: 25, color: 'bg-orange-100 text-orange-600' },
  { name: 'Marketing', icon: Users, count: 38, color: 'bg-pink-100 text-pink-600' },
  { name: 'Web Development', icon: PenTool, count: 42, color: 'bg-indigo-100 text-indigo-600' },
];

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className='bg-green-100 text-green-800'>Active</Badge>;
      case 'completed':
        return <Badge className='bg-gray-100 text-gray-800'>Completed</Badge>;
      default:
        return <Badge className='bg-gray-100 text-gray-800'>Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-neutral-900 mb-2'>Marketplace</h1>
        <p className='text-neutral-600'>Discover service providers and post your requirements</p>
      </div>

      <div className='space-y-8'>
        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>Find Service Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex gap-4 mb-6'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5' />
                <Input
                  placeholder='Search services, providers...'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className='pl-10'
                />
              </div>
              <Button variant='outline' className='flex items-center gap-2'>
                <Filter className='w-4 h-4' />
                Filters
              </Button>
            </div>

            {/* Categories */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
              {categories.map(category => (
                <button
                  key={category.name}
                  className='p-4 border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors'
                >
                  <div
                    className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    <category.icon className='w-6 h-6' />
                  </div>
                  <p className='text-sm font-medium text-neutral-900 mb-1'>{category.name}</p>
                  <p className='text-xs text-neutral-600'>{category.count} providers</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Providers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Service Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {serviceProviders.map(provider => (
                <div key={provider.id} className='border border-neutral-200 rounded-lg p-6'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 mb-2'>
                        <h3 className='font-semibold text-neutral-900'>{provider.name}</h3>
                        {provider.verified && <CheckCircle className='w-4 h-4 text-green-600' />}
                      </div>
                      <p className='text-sm text-neutral-600 mb-2'>{provider.category}</p>
                      <div className='flex items-center gap-4 text-sm text-neutral-600'>
                        <span className='flex items-center gap-1'>
                          <Star className='w-4 h-4 text-yellow-500' />
                          {provider.rating} ({provider.reviews})
                        </span>
                        <span className='flex items-center gap-1'>
                          <MapPin className='w-4 h-4' />
                          {provider.location}
                        </span>
                      </div>
                    </div>
                    <div className='text-right'>
                      <p className='font-semibold text-neutral-900'>{provider.price}</p>
                      <p className='text-sm text-neutral-600'>Response: {provider.responseTime}</p>
                    </div>
                  </div>

                  <div className='mb-4'>
                    <p className='text-sm text-neutral-600 mb-2'>Services:</p>
                    <div className='flex flex-wrap gap-2'>
                      {provider.services.map(service => (
                        <Badge key={service} variant='outline' className='text-xs'>
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4 text-sm text-neutral-600'>
                      <span>{provider.portfolio} projects</span>
                      <span>•</span>
                      <span>{provider.responseTime} response</span>
                    </div>
                    <div className='flex gap-2'>
                      <Button size='sm' variant='outline'>
                        <Eye className='w-4 h-4' />
                      </Button>
                      <Button size='sm'>
                        <MessageSquare className='w-4 h-4' />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Service Requests */}
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <CardTitle>Service Requests</CardTitle>
              <Button className='flex items-center gap-2'>
                <Plus className='w-4 h-4' />
                Post Request
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {serviceRequests.map(request => (
                <div
                  key={request.id}
                  className='flex items-center justify-between p-4 border border-neutral-200 rounded-lg'
                >
                  <div className='flex-1'>
                    <h4 className='font-medium text-neutral-900 mb-1'>{request.title}</h4>
                    <p className='text-sm text-neutral-600 mb-2'>
                      Posted by {request.postedBy} • {request.postedDate}
                    </p>
                    <div className='flex items-center gap-4 text-sm text-neutral-600'>
                      <span className='flex items-center gap-1'>
                        <DollarSign className='w-4 h-4' />
                        {request.budget}
                      </span>
                      <span className='flex items-center gap-1'>
                        <MessageSquare className='w-4 h-4' />
                        {request.proposals} proposals
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    {getStatusBadge(request.status)}
                    <Button size='sm' variant='outline'>
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
