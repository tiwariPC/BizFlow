import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Activity,
  Server,
  Database,
  Globe,
  Shield,
  Zap,
} from 'lucide-react';

export default function Status() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      name: 'API Services',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '45ms',
      icon: Server,
      description: 'Core API endpoints and authentication',
    },
    {
      name: 'Database',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '12ms',
      icon: Database,
      description: 'Primary database and data storage',
    },
    {
      name: 'Web Application',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '120ms',
      icon: Globe,
      description: 'Main web application and dashboard',
    },
    {
      name: 'File Storage',
      status: 'operational',
      uptime: '99.90%',
      responseTime: '85ms',
      icon: Shield,
      description: 'Document upload and storage system',
    },
    {
      name: 'Email Services',
      status: 'operational',
      uptime: '99.85%',
      responseTime: '200ms',
      icon: Zap,
      description: 'Email notifications and communications',
    },
  ];

  const incidents = [
    {
      id: 1,
      title: 'Scheduled Maintenance - Database Optimization',
      status: 'resolved',
      date: '2024-01-15',
      description:
        'Database performance optimization completed successfully. All services are now running at optimal performance.',
      impact: 'minor',
    },
    {
      id: 2,
      title: 'API Rate Limiting Update',
      status: 'resolved',
      date: '2024-01-10',
      description: 'Updated API rate limiting policies to improve service stability for all users.',
      impact: 'minor',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className='w-5 h-5 text-green-500' />;
      case 'degraded':
        return <AlertTriangle className='w-5 h-5 text-yellow-500' />;
      case 'outage':
        return <XCircle className='w-5 h-5 text-red-500' />;
      default:
        return <Clock className='w-5 h-5 text-gray-500' />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge className='bg-green-100 text-green-800'>Operational</Badge>;
      case 'degraded':
        return <Badge className='bg-yellow-100 text-yellow-800'>Degraded</Badge>;
      case 'outage':
        return <Badge className='bg-red-100 text-red-800'>Outage</Badge>;
      case 'resolved':
        return <Badge className='bg-blue-100 text-blue-800'>Resolved</Badge>;
      default:
        return <Badge variant='outline'>Unknown</Badge>;
    }
  };

  const overallStatus = services.every(service => service.status === 'operational')
    ? 'operational'
    : 'degraded';

  return (
    <div className='min-h-screen flex flex-col'>
      <Header onLoginClick={() => {}} />

      <main className='flex-1'>
        {/* Hero Section */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
            <h1 className='text-4xl md:text-5xl font-bold mb-6'>System Status</h1>
            <p className='text-xl text-blue-100 max-w-3xl mx-auto'>
              Real-time status of BizHub services and infrastructure
            </p>
          </div>
        </div>

        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          {/* Overall Status */}
          <Card className='mb-8'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  {getStatusIcon(overallStatus)}
                  <div>
                    <h2 className='text-2xl font-bold'>All Systems Operational</h2>
                    <p className='text-neutral-600'>
                      Last updated: {lastUpdated.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className='text-right'>
                  <div className='text-3xl font-bold text-green-600'>99.95%</div>
                  <div className='text-sm text-neutral-600'>Uptime (30 days)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {/* Service Status */}
            <div>
              <h2 className='text-2xl font-bold mb-6'>Service Status</h2>
              <div className='space-y-4'>
                {services.map((service, index) => (
                  <Card key={index}>
                    <CardContent className='p-6'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                          <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                            <service.icon className='w-5 h-5 text-blue-600' />
                          </div>
                          <div>
                            <h3 className='font-semibold'>{service.name}</h3>
                            <p className='text-sm text-neutral-600'>{service.description}</p>
                          </div>
                        </div>
                        <div className='text-right'>
                          {getStatusIcon(service.status)}
                          <div className='text-sm text-neutral-600 mt-1'>
                            {service.responseTime}
                          </div>
                        </div>
                      </div>
                      <div className='mt-4 flex items-center justify-between text-sm'>
                        <span className='text-neutral-600'>Uptime: {service.uptime}</span>
                        {getStatusBadge(service.status)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Incidents */}
            <div>
              <h2 className='text-2xl font-bold mb-6'>Recent Incidents</h2>
              <div className='space-y-4'>
                {incidents.map((incident, index) => (
                  <Card key={index}>
                    <CardContent className='p-6'>
                      <div className='flex items-start justify-between mb-3'>
                        <h3 className='font-semibold'>{incident.title}</h3>
                        {getStatusBadge(incident.status)}
                      </div>
                      <p className='text-sm text-neutral-600 mb-3'>{incident.description}</p>
                      <div className='flex items-center justify-between text-sm text-neutral-500'>
                        <span>{incident.date}</span>
                        <Badge variant='outline' className='text-xs'>
                          {incident.impact} impact
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Performance Metrics */}
              <Card className='mt-8'>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Activity className='w-5 h-5' />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-green-600'>45ms</div>
                      <div className='text-sm text-neutral-600'>Avg Response Time</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-blue-600'>99.95%</div>
                      <div className='text-sm text-neutral-600'>Uptime</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-purple-600'>1.2M</div>
                      <div className='text-sm text-neutral-600'>API Calls Today</div>
                    </div>
                    <div className='text-center'>
                      <div className='text-2xl font-bold text-orange-600'>0</div>
                      <div className='text-sm text-neutral-600'>Active Incidents</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Subscribe to Updates */}
          <Card className='mt-8'>
            <CardContent className='p-8 text-center'>
              <h3 className='text-xl font-semibold mb-2'>Stay Updated</h3>
              <p className='text-neutral-600 mb-4'>
                Get notified about service updates and incidents via email or SMS.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <button className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                  Subscribe
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
