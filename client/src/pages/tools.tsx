import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { AccessTokenGate } from '@/components/access-token-gate';
import {
  Users,
  UserPlus,
  Calendar,
  DollarSign,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Eye,
  Edit,
  Download,
  Mail,
  Phone,
  MapPin,
  Building2,
  GraduationCap,
  Briefcase,
  Heart,
  TrendingUp,
  Target,
  Save,
  X,
  Trash2,
  Search,
  Filter,
} from 'lucide-react';

// Types for better type safety
interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joinDate: string;
  status: string;
  salary: number;
  avatar: string;
  address?: string;
  emergencyContact?: string;
  skills?: string[];
}

interface LeaveRequest {
  id: number;
  employee: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  status: string;
  reason: string;
}

interface JobPosting {
  id: number;
  title: string;
  department: string;
  type: string;
  location: string;
  applications: number;
  status: string;
  postedDate: string;
  description?: string;
  requirements?: string[];
  salary?: string;
}

const employees: Employee[] = [
  {
    id: 1,
    name: 'Priya Sharma',
    email: 'priya@company.com',
    phone: '+91 98765 43210',
    department: 'Marketing',
    position: 'Marketing Manager',
    joinDate: '2023-01-15',
    status: 'active',
    salary: 45000,
    avatar: 'PS',
    address: 'Mumbai, Maharashtra',
    emergencyContact: '+91 98765 43211',
    skills: ['Digital Marketing', 'SEO', 'Content Strategy'],
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    email: 'rajesh@company.com',
    phone: '+91 98765 43211',
    department: 'Development',
    position: 'Senior Developer',
    joinDate: '2022-08-20',
    status: 'active',
    salary: 55000,
    avatar: 'RK',
    address: 'Bangalore, Karnataka',
    emergencyContact: '+91 98765 43212',
    skills: ['React', 'Node.js', 'TypeScript'],
  },
  {
    id: 3,
    name: 'Anita Patel',
    email: 'anita@company.com',
    phone: '+91 98765 43212',
    department: 'HR',
    position: 'HR Executive',
    joinDate: '2023-03-10',
    status: 'active',
    salary: 35000,
    avatar: 'AP',
    address: 'Delhi, NCR',
    emergencyContact: '+91 98765 43213',
    skills: ['Recruitment', 'Employee Relations', 'HR Policies'],
  },
  {
    id: 4,
    name: 'Suresh Singh',
    email: 'suresh@company.com',
    phone: '+91 98765 43213',
    department: 'Sales',
    position: 'Sales Executive',
    joinDate: '2023-06-01',
    status: 'on-leave',
    salary: 40000,
    avatar: 'SS',
    address: 'Pune, Maharashtra',
    emergencyContact: '+91 98765 43214',
    skills: ['B2B Sales', 'CRM', 'Negotiation'],
  },
];

const leaveRequests: LeaveRequest[] = [
  {
    id: 1,
    employee: 'Priya Sharma',
    type: 'Annual Leave',
    startDate: '2024-01-20',
    endDate: '2024-01-25',
    days: 5,
    status: 'approved',
    reason: 'Family vacation',
  },
  {
    id: 2,
    employee: 'Suresh Singh',
    type: 'Sick Leave',
    startDate: '2024-01-18',
    endDate: '2024-01-19',
    days: 2,
    status: 'approved',
    reason: 'Medical appointment',
  },
  {
    id: 3,
    employee: 'Rajesh Kumar',
    type: 'Work from Home',
    startDate: '2024-01-22',
    endDate: '2024-01-22',
    days: 1,
    status: 'pending',
    reason: 'Personal work',
  },
];

const payrollSummary = {
  totalEmployees: 4,
  totalSalary: 175000,
  pendingPayments: 175000,
  processedPayments: 0,
  deductions: 17500,
  netPay: 157500,
};

const jobPostings: JobPosting[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    department: 'Development',
    type: 'Full-time',
    location: 'Mumbai',
    applications: 12,
    status: 'active',
    postedDate: '2024-01-10',
    description: 'We are looking for a skilled Frontend Developer to join our team.',
    requirements: ['React', 'TypeScript', '3+ years experience'],
    salary: '₹40,000 - ₹60,000',
  },
  {
    id: 2,
    title: 'Marketing Intern',
    department: 'Marketing',
    type: 'Internship',
    location: 'Remote',
    applications: 8,
    status: 'active',
    postedDate: '2024-01-12',
    description: 'Great opportunity for marketing students to gain real-world experience.',
    requirements: ['Marketing background', 'Social media skills', 'Creative thinking'],
    salary: '₹15,000 - ₹20,000',
  },
  {
    id: 3,
    title: 'Sales Manager',
    department: 'Sales',
    type: 'Full-time',
    location: 'Delhi',
    applications: 15,
    status: 'closed',
    postedDate: '2023-12-15',
    description: 'Experienced Sales Manager to lead our sales team.',
    requirements: ['5+ years sales experience', 'Team management', 'B2B sales'],
    salary: '₹60,000 - ₹80,000',
  },
];

export default function Tools() {
  const [activeTab, setActiveTab] = useState('employees');
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [editingLeave, setEditingLeave] = useState<LeaveRequest | null>(null);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Form states
  const [employeeForm, setEmployeeForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    joinDate: '',
    salary: '',
    address: '',
    emergencyContact: '',
    skills: '',
  });

  const [leaveForm, setLeaveForm] = useState({
    employee: '',
    type: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const [jobForm, setJobForm] = useState({
    title: '',
    department: '',
    type: '',
    location: '',
    description: '',
    requirements: '',
    salary: '',
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className='bg-green-100 text-green-800'>Active</Badge>;
      case 'on-leave':
        return <Badge className='bg-yellow-100 text-yellow-800'>On Leave</Badge>;
      case 'inactive':
        return <Badge className='bg-red-100 text-red-800'>Inactive</Badge>;
      case 'approved':
        return <Badge className='bg-green-100 text-green-800'>Approved</Badge>;
      case 'pending':
        return <Badge className='bg-yellow-100 text-yellow-800'>Pending</Badge>;
      case 'rejected':
        return <Badge className='bg-red-100 text-red-800'>Rejected</Badge>;
      default:
        return <Badge className='bg-gray-100 text-gray-800'>Unknown</Badge>;
    }
  };

  const getLeaveStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className='w-4 h-4 text-green-600' />;
      case 'pending':
        return <Clock className='w-4 h-4 text-yellow-600' />;
      case 'rejected':
        return <XCircle className='w-4 h-4 text-red-600' />;
      default:
        return <Clock className='w-4 h-4 text-gray-600' />;
    }
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setEmployeeForm({
      name: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      joinDate: '',
      salary: '',
      address: '',
      emergencyContact: '',
      skills: '',
    });
    setShowEmployeeForm(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setEmployeeForm({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      joinDate: employee.joinDate,
      salary: employee.salary.toString(),
      address: employee.address || '',
      emergencyContact: employee.emergencyContact || '',
      skills: employee.skills?.join(', ') || '',
    });
    setShowEmployeeForm(true);
  };

  const handleSaveEmployee = () => {
    // Here you would typically save to your backend
    console.log('Saving employee:', employeeForm);
    setShowEmployeeForm(false);
    // Reset form
    setEmployeeForm({
      name: '',
      email: '',
      phone: '',
      department: '',
      position: '',
      joinDate: '',
      salary: '',
      address: '',
      emergencyContact: '',
      skills: '',
    });
  };

  const handleAddLeave = () => {
    setEditingLeave(null);
    setLeaveForm({
      employee: '',
      type: '',
      startDate: '',
      endDate: '',
      reason: '',
    });
    setShowLeaveForm(true);
  };

  const handleEditLeave = (leave: LeaveRequest) => {
    setEditingLeave(leave);
    setLeaveForm({
      employee: leave.employee,
      type: leave.type,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
    });
    setShowLeaveForm(true);
  };

  const handleSaveLeave = () => {
    console.log('Saving leave request:', leaveForm);
    setShowLeaveForm(false);
    setLeaveForm({
      employee: '',
      type: '',
      startDate: '',
      endDate: '',
      reason: '',
    });
  };

  const handleAddJob = () => {
    setEditingJob(null);
    setJobForm({
      title: '',
      department: '',
      type: '',
      location: '',
      description: '',
      requirements: '',
      salary: '',
    });
    setShowJobForm(true);
  };

  const handleEditJob = (job: JobPosting) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      department: job.department,
      type: job.type,
      location: job.location,
      description: job.description || '',
      requirements: job.requirements?.join(', ') || '',
      salary: job.salary || '',
    });
    setShowJobForm(true);
  };

  const handleSaveJob = () => {
    console.log('Saving job posting:', jobForm);
    setShowJobForm(false);
    setJobForm({
      title: '',
      department: '',
      type: '',
      location: '',
      description: '',
      requirements: '',
      salary: '',
    });
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      filterDepartment === 'all' || employee.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <AccessTokenGate module="hr">
      <DashboardLayout>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-neutral-900 mb-2'>HR & Team Management</h1>
          <p className='text-neutral-600'>Manage your team, payroll, and recruitment</p>
        </div>

      {/* Tab Navigation */}
      <div className='mb-8'>
        <div className='flex space-x-1 bg-white p-1 rounded-lg border'>
          <button
            onClick={() => setActiveTab('employees')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'employees'
                ? 'bg-blue-600 text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Employee Directory
          </button>
          <button
            onClick={() => setActiveTab('payroll')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'payroll'
                ? 'bg-blue-600 text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Payroll Dashboard
          </button>
          <button
            onClick={() => setActiveTab('leave')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'leave'
                ? 'bg-blue-600 text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Leave Management
          </button>
          <button
            onClick={() => setActiveTab('recruitment')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'recruitment'
                ? 'bg-blue-600 text-white'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Recruitment
          </button>
        </div>
      </div>

      {activeTab === 'employees' && (
        <div className='space-y-6'>
          {/* Employee Directory */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='flex items-center gap-2'>
                  <Users className='w-5 h-5' />
                  Employee Directory
                </CardTitle>
                <Button onClick={handleAddEmployee} className='flex items-center gap-2'>
                  <UserPlus className='w-4 h-4' />
                  Add Employee
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className='flex flex-col sm:flex-row gap-4 mb-6'>
                <div className='relative flex-1'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4' />
                  <Input
                    placeholder='Search employees...'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className='pl-10'
                  />
                </div>
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className='w-full sm:w-48'>
                    <SelectValue placeholder='Filter by department' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>All Departments</SelectItem>
                    <SelectItem value='Marketing'>Marketing</SelectItem>
                    <SelectItem value='Development'>Development</SelectItem>
                    <SelectItem value='HR'>HR</SelectItem>
                    <SelectItem value='Sales'>Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredEmployees.map(employee => (
                  <div
                    key={employee.id}
                    className='border border-neutral-200 rounded-lg p-6 bg-white'
                  >
                    <div className='flex items-center gap-4 mb-4'>
                      <div className='w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center'>
                        <span className='text-white font-semibold'>{employee.avatar}</span>
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-semibold text-neutral-900'>{employee.name}</h3>
                        <p className='text-sm text-neutral-600'>{employee.position}</p>
                      </div>
                      {getStatusBadge(employee.status)}
                    </div>

                    <div className='space-y-2 mb-4'>
                      <div className='flex items-center gap-2 text-sm'>
                        <Mail className='w-4 h-4 text-neutral-400' />
                        <span className='text-neutral-700'>{employee.email}</span>
                      </div>
                      <div className='flex items-center gap-2 text-sm'>
                        <Phone className='w-4 h-4 text-neutral-400' />
                        <span className='text-neutral-700'>{employee.phone}</span>
                      </div>
                      <div className='flex items-center gap-2 text-sm'>
                        <Building2 className='w-4 h-4 text-neutral-400' />
                        <span className='text-neutral-700'>{employee.department}</span>
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='text-sm text-neutral-600'>Salary</p>
                        <p className='font-semibold text-neutral-900'>
                          ₹{employee.salary.toLocaleString()}
                        </p>
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          size='sm'
                          variant='outline'
                          onClick={() => handleEditEmployee(employee)}
                        >
                          <Edit className='w-4 h-4' />
                        </Button>
                        <Button size='sm' variant='outline'>
                          <Eye className='w-4 h-4' />
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

      {activeTab === 'payroll' && (
        <div className='space-y-6'>
          {/* Payroll Summary */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <Card>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-neutral-600'>Total Employees</p>
                    <p className='text-2xl font-bold text-neutral-900'>
                      {payrollSummary.totalEmployees}
                    </p>
                  </div>
                  <Users className='w-8 h-8 text-blue-600' />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-neutral-600'>Total Salary</p>
                    <p className='text-2xl font-bold text-neutral-900'>
                      ₹{payrollSummary.totalSalary.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className='w-8 h-8 text-green-600' />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-neutral-600'>Deductions</p>
                    <p className='text-2xl font-bold text-neutral-900'>
                      ₹{payrollSummary.deductions.toLocaleString()}
                    </p>
                  </div>
                  <TrendingUp className='w-8 h-8 text-red-600' />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-sm text-neutral-600'>Net Pay</p>
                    <p className='text-2xl font-bold text-neutral-900'>
                      ₹{payrollSummary.netPay.toLocaleString()}
                    </p>
                  </div>
                  <Target className='w-8 h-8 text-purple-600' />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payroll Actions */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <DollarSign className='w-5 h-5' />
                Payroll Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-wrap gap-4'>
                <Button className='flex items-center gap-2'>
                  <Download className='w-4 h-4' />
                  Generate Payroll Report
                </Button>
                <Button variant='outline' className='flex items-center gap-2'>
                  <FileText className='w-4 h-4' />
                  Export Salary Slips
                </Button>
                <Button variant='outline' className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4' />
                  Process Monthly Payroll
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'leave' && (
        <div className='space-y-6'>
          {/* Leave Management */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='flex items-center gap-2'>
                  <Calendar className='w-5 h-5' />
                  Leave Management
                </CardTitle>
                <Button onClick={handleAddLeave} className='flex items-center gap-2'>
                  <Plus className='w-4 h-4' />
                  Add Leave Request
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {leaveRequests.map(leave => (
                  <div key={leave.id} className='border border-neutral-200 rounded-lg p-4 bg-white'>
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-3'>
                        {getLeaveStatusIcon(leave.status)}
                        <div>
                          <h3 className='font-semibold text-neutral-900'>{leave.employee}</h3>
                          <p className='text-sm text-neutral-600'>{leave.type}</p>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        {getStatusBadge(leave.status)}
                        <Button size='sm' variant='outline' onClick={() => handleEditLeave(leave)}>
                          <Edit className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                      <div>
                        <span className='text-neutral-600'>Start Date:</span>
                        <p className='font-medium'>{leave.startDate}</p>
                      </div>
                      <div>
                        <span className='text-neutral-600'>End Date:</span>
                        <p className='font-medium'>{leave.endDate}</p>
                      </div>
                      <div>
                        <span className='text-neutral-600'>Days:</span>
                        <p className='font-medium'>{leave.days}</p>
                      </div>
                    </div>
                    <div className='mt-3'>
                      <span className='text-neutral-600 text-sm'>Reason:</span>
                      <p className='text-sm mt-1'>{leave.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'recruitment' && (
        <div className='space-y-6'>
          {/* Recruitment */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='flex items-center gap-2'>
                  <Briefcase className='w-5 h-5' />
                  Job Postings
                </CardTitle>
                <Button onClick={handleAddJob} className='flex items-center gap-2'>
                  <Plus className='w-4 h-4' />
                  Post New Job
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {jobPostings.map(job => (
                  <div key={job.id} className='border border-neutral-200 rounded-lg p-6 bg-white'>
                    <div className='flex items-start justify-between mb-4'>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold text-neutral-900'>{job.title}</h3>
                        <div className='flex items-center gap-4 mt-2 text-sm text-neutral-600'>
                          <span className='flex items-center gap-1'>
                            <Building2 className='w-4 h-4' />
                            {job.department}
                          </span>
                          <span className='flex items-center gap-1'>
                            <Briefcase className='w-4 h-4' />
                            {job.type}
                          </span>
                          <span className='flex items-center gap-1'>
                            <MapPin className='w-4 h-4' />
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        {getStatusBadge(job.status)}
                        <Button size='sm' variant='outline' onClick={() => handleEditJob(job)}>
                          <Edit className='w-4 h-4' />
                        </Button>
                      </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                      <div>
                        <span className='text-neutral-600'>Applications:</span>
                        <p className='font-medium'>{job.applications}</p>
                      </div>
                      <div>
                        <span className='text-neutral-600'>Posted:</span>
                        <p className='font-medium'>{job.postedDate}</p>
                      </div>
                      <div>
                        <span className='text-neutral-600'>Salary:</span>
                        <p className='font-medium'>{job.salary}</p>
                      </div>
                    </div>
                    {job.description && (
                      <div className='mt-4'>
                        <span className='text-neutral-600 text-sm'>Description:</span>
                        <p className='text-sm mt-1'>{job.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Employee Form Dialog */}
      <Dialog open={showEmployeeForm} onOpenChange={setShowEmployeeForm}>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <UserPlus className='w-5 h-5' />
              {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </DialogTitle>
          </DialogHeader>
          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='name'>Full Name *</Label>
                <Input
                  id='name'
                  value={employeeForm.name}
                  onChange={e => setEmployeeForm({ ...employeeForm, name: e.target.value })}
                  placeholder='Enter full name'
                />
              </div>
              <div>
                <Label htmlFor='email'>Email Address *</Label>
                <Input
                  id='email'
                  type='email'
                  value={employeeForm.email}
                  onChange={e => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                  placeholder='Enter email address'
                />
              </div>
              <div>
                <Label htmlFor='phone'>Phone Number *</Label>
                <Input
                  id='phone'
                  value={employeeForm.phone}
                  onChange={e => setEmployeeForm({ ...employeeForm, phone: e.target.value })}
                  placeholder='Enter phone number'
                />
              </div>
              <div>
                <Label htmlFor='department'>Department *</Label>
                <Select
                  value={employeeForm.department}
                  onValueChange={value => setEmployeeForm({ ...employeeForm, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select department' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Marketing'>Marketing</SelectItem>
                    <SelectItem value='Development'>Development</SelectItem>
                    <SelectItem value='HR'>HR</SelectItem>
                    <SelectItem value='Sales'>Sales</SelectItem>
                    <SelectItem value='Finance'>Finance</SelectItem>
                    <SelectItem value='Operations'>Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='position'>Position *</Label>
                <Input
                  id='position'
                  value={employeeForm.position}
                  onChange={e => setEmployeeForm({ ...employeeForm, position: e.target.value })}
                  placeholder='Enter job position'
                />
              </div>
              <div>
                <Label htmlFor='joinDate'>Join Date *</Label>
                <Input
                  id='joinDate'
                  type='date'
                  value={employeeForm.joinDate}
                  onChange={e => setEmployeeForm({ ...employeeForm, joinDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor='salary'>Monthly Salary *</Label>
                <Input
                  id='salary'
                  type='number'
                  value={employeeForm.salary}
                  onChange={e => setEmployeeForm({ ...employeeForm, salary: e.target.value })}
                  placeholder='Enter salary amount'
                />
              </div>
              <div>
                <Label htmlFor='emergencyContact'>Emergency Contact</Label>
                <Input
                  id='emergencyContact'
                  value={employeeForm.emergencyContact}
                  onChange={e =>
                    setEmployeeForm({ ...employeeForm, emergencyContact: e.target.value })
                  }
                  placeholder='Enter emergency contact'
                />
              </div>
            </div>
            <div>
              <Label htmlFor='address'>Address</Label>
              <Textarea
                id='address'
                value={employeeForm.address}
                onChange={e => setEmployeeForm({ ...employeeForm, address: e.target.value })}
                placeholder='Enter full address'
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor='skills'>Skills (comma separated)</Label>
              <Input
                id='skills'
                value={employeeForm.skills}
                onChange={e => setEmployeeForm({ ...employeeForm, skills: e.target.value })}
                placeholder='e.g., React, Marketing, Sales'
              />
            </div>
            <div className='flex justify-end gap-3'>
              <Button variant='outline' onClick={() => setShowEmployeeForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEmployee} className='flex items-center gap-2'>
                <Save className='w-4 h-4' />
                {editingEmployee ? 'Update Employee' : 'Add Employee'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Leave Request Form Dialog */}
      <Dialog open={showLeaveForm} onOpenChange={setShowLeaveForm}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <Calendar className='w-5 h-5' />
              {editingLeave ? 'Edit Leave Request' : 'Add Leave Request'}
            </DialogTitle>
          </DialogHeader>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='leaveEmployee'>Employee *</Label>
              <Select
                value={leaveForm.employee}
                onValueChange={value => setLeaveForm({ ...leaveForm, employee: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select employee' />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(emp => (
                    <SelectItem key={emp.id} value={emp.name}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor='leaveType'>Leave Type *</Label>
              <Select
                value={leaveForm.type}
                onValueChange={value => setLeaveForm({ ...leaveForm, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select leave type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Annual Leave'>Annual Leave</SelectItem>
                  <SelectItem value='Sick Leave'>Sick Leave</SelectItem>
                  <SelectItem value='Work from Home'>Work from Home</SelectItem>
                  <SelectItem value='Personal Leave'>Personal Leave</SelectItem>
                  <SelectItem value='Maternity Leave'>Maternity Leave</SelectItem>
                  <SelectItem value='Paternity Leave'>Paternity Leave</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='startDate'>Start Date *</Label>
                <Input
                  id='startDate'
                  type='date'
                  value={leaveForm.startDate}
                  onChange={e => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor='endDate'>End Date *</Label>
                <Input
                  id='endDate'
                  type='date'
                  value={leaveForm.endDate}
                  onChange={e => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor='reason'>Reason *</Label>
              <Textarea
                id='reason'
                value={leaveForm.reason}
                onChange={e => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                placeholder='Enter reason for leave'
                rows={3}
              />
            </div>
            <div className='flex justify-end gap-3'>
              <Button variant='outline' onClick={() => setShowLeaveForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveLeave} className='flex items-center gap-2'>
                <Save className='w-4 h-4' />
                {editingLeave ? 'Update Request' : 'Submit Request'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Job Posting Form Dialog */}
      <Dialog open={showJobForm} onOpenChange={setShowJobForm}>
        <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='flex items-center gap-2'>
              <Briefcase className='w-5 h-5' />
              {editingJob ? 'Edit Job Posting' : 'Post New Job'}
            </DialogTitle>
          </DialogHeader>
          <div className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='jobTitle'>Job Title *</Label>
                <Input
                  id='jobTitle'
                  value={jobForm.title}
                  onChange={e => setJobForm({ ...jobForm, title: e.target.value })}
                  placeholder='Enter job title'
                />
              </div>
              <div>
                <Label htmlFor='jobDepartment'>Department *</Label>
                <Select
                  value={jobForm.department}
                  onValueChange={value => setJobForm({ ...jobForm, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select department' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Marketing'>Marketing</SelectItem>
                    <SelectItem value='Development'>Development</SelectItem>
                    <SelectItem value='HR'>HR</SelectItem>
                    <SelectItem value='Sales'>Sales</SelectItem>
                    <SelectItem value='Finance'>Finance</SelectItem>
                    <SelectItem value='Operations'>Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='jobType'>Job Type *</Label>
                <Select
                  value={jobForm.type}
                  onValueChange={value => setJobForm({ ...jobForm, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select job type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='Full-time'>Full-time</SelectItem>
                    <SelectItem value='Part-time'>Part-time</SelectItem>
                    <SelectItem value='Contract'>Contract</SelectItem>
                    <SelectItem value='Internship'>Internship</SelectItem>
                    <SelectItem value='Freelance'>Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='jobLocation'>Location *</Label>
                <Input
                  id='jobLocation'
                  value={jobForm.location}
                  onChange={e => setJobForm({ ...jobForm, location: e.target.value })}
                  placeholder='Enter job location'
                />
              </div>
              <div>
                <Label htmlFor='jobSalary'>Salary Range</Label>
                <Input
                  id='jobSalary'
                  value={jobForm.salary}
                  onChange={e => setJobForm({ ...jobForm, salary: e.target.value })}
                  placeholder='e.g., ₹30,000 - ₹50,000'
                />
              </div>
            </div>
            <div>
              <Label htmlFor='jobDescription'>Job Description *</Label>
              <Textarea
                id='jobDescription'
                value={jobForm.description}
                onChange={e => setJobForm({ ...jobForm, description: e.target.value })}
                placeholder='Enter detailed job description'
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor='jobRequirements'>Requirements (comma separated)</Label>
              <Input
                id='jobRequirements'
                value={jobForm.requirements}
                onChange={e => setJobForm({ ...jobForm, requirements: e.target.value })}
                placeholder='e.g., React, 3+ years experience, Communication skills'
              />
            </div>
            <div className='flex justify-end gap-3'>
              <Button variant='outline' onClick={() => setShowJobForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveJob} className='flex items-center gap-2'>
                <Save className='w-4 h-4' />
                {editingJob ? 'Update Job' : 'Post Job'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      </DashboardLayout>
    </AccessTokenGate>
  );
}
