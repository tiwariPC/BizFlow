import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import FileUpload from '@/components/ui/file-upload';
import { documentService, Document, DocumentCategory } from '@/lib/document-service';
import {
  CheckCircle2,
  Circle,
  Calendar,
  FileText,
  Upload,
  Download,
  AlertTriangle,
  Building2,
  Receipt,
  CreditCard,
  ShieldCheck,
  Clock,
  Check,
  X,
  Eye,
  Trash2,
  ExternalLink,
  Plus,
  Settings,
  Bell,
  RefreshCw,
  FileDown,
  CheckSquare,
  Info,
  CalendarDays,
  Clock3,
  AlertCircle,
} from 'lucide-react';

const complianceSteps = [
  {
    id: 1,
    title: 'Incorporation',
    description: 'Register your business entity',
    status: 'completed',
    icon: Building2,
    category: 'incorporation',
    documents: ['Certificate of Incorporation', 'MOA & AOA', 'PAN Card'],
    required: true,
  },
  {
    id: 2,
    title: 'GST Registration',
    description: 'Register for Goods & Services Tax',
    status: 'completed',
    icon: Receipt,
    category: 'gst',
    documents: ['GST Certificate', 'GST Login Credentials'],
    required: true,
  },
  {
    id: 3,
    title: 'Bank Account',
    description: 'Open business current account',
    status: 'in-progress',
    icon: CreditCard,
    category: 'banking',
    documents: ['Bank Account Details', 'Cheque Book', 'Online Banking'],
    required: true,
  },
  {
    id: 4,
    title: 'Compliance Calendar',
    description: 'Set up compliance reminders',
    status: 'pending',
    icon: ShieldCheck,
    category: 'compliance',
    documents: ['Compliance Checklist', 'Reminder Settings'],
    required: false,
  },
];

interface Reminder {
  id: string;
  title: string;
  date: string;
  type: 'urgent' | 'important' | 'normal';
  description: string;
  action: string;
  category: string;
  completed?: boolean;
  createdAt: string;
}

const defaultReminders: Reminder[] = [
  {
    id: '1',
    title: 'GST Filing Due',
    date: '2024-01-20',
    type: 'urgent',
    description: 'File GSTR-3B for December 2023',
    action: 'File Now',
    category: 'gst',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    title: 'TDS Payment Due',
    date: '2024-01-31',
    type: 'important',
    description: 'Pay TDS for Q3 FY 2023-24',
    action: 'Pay Now',
    category: 'tax',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'ROC Annual Filing',
    date: '2024-02-15',
    type: 'normal',
    description: 'File MGT-7 and AOC-4',
    action: 'File Now',
    category: 'compliance',
    createdAt: '2024-01-01T00:00:00Z',
  },
];

export default function Compliance() {
  const [selectedStep, setSelectedStep] = useState(1);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [categories, setCategories] = useState<DocumentCategory[]>([]);
  const [complianceStatus, setComplianceStatus] = useState({
    overallProgress: 0,
    completedSteps: 0,
    totalSteps: 0,
    missingDocuments: [] as string[],
  });
  const [reminders, setReminders] = useState<Reminder[]>(defaultReminders);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Quick Actions Modals
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showComplianceCheckModal, setShowComplianceCheckModal] = useState(false);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>('');

  // Reminder Form State
  const [reminderForm, setReminderForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'normal',
    category: 'compliance',
  });

  // Report Form State
  const [reportForm, setReportForm] = useState({
    type: 'compliance',
    dateRange: 'month',
    includeDocuments: true,
    format: 'pdf',
  });

  // Compliance Check State
  const [complianceCheck, setComplianceCheck] = useState({
    isRunning: false,
    results: null as any,
    lastChecked: null as string | null,
  });

  // Guidelines Data
  const [guidelines, setGuidelines] = useState([
    {
      id: 'incorporation',
      title: 'Business Incorporation Guidelines',
      description: 'Complete guide for business registration and incorporation',
      steps: [
        'Choose business structure (LLP, Pvt Ltd, OPC)',
        'Prepare required documents',
        'Submit application to ROC',
        'Obtain Certificate of Incorporation',
        'Apply for PAN and TAN',
        'Open business bank account',
      ],
      documents: ['MOA & AOA', 'Director KYC', 'Address Proof', 'Identity Proof'],
      timeline: '15-30 days',
      cost: '₹5,000 - ₹15,000',
    },
    {
      id: 'gst',
      title: 'GST Registration Guidelines',
      description: 'Step-by-step GST registration process',
      steps: [
        'Verify business eligibility',
        'Prepare business documents',
        'Submit GST application',
        'Complete verification process',
        'Receive GST certificate',
        'Set up GST filing system',
      ],
      documents: [
        'PAN Card',
        'Business Address Proof',
        'Bank Account Details',
        'Business Registration',
      ],
      timeline: '7-15 days',
      cost: 'Free (Government)',
    },
    {
      id: 'compliance',
      title: 'Ongoing Compliance Requirements',
      description: 'Maintain compliance throughout the year',
      steps: [
        'File quarterly GST returns',
        'Submit annual ROC filings',
        'Maintain proper books of accounts',
        'Conduct annual audits (if required)',
        'File income tax returns',
        'Comply with labor laws',
      ],
      documents: [
        'Financial Statements',
        'Audit Reports',
        'Tax Returns',
        'Compliance Certificates',
      ],
      timeline: 'Ongoing',
      cost: '₹10,000 - ₹50,000 annually',
    },
  ]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [docs, cats, status] = await Promise.all([
        documentService.getDocuments(),
        documentService.getDocumentCategories(),
        documentService.getComplianceStatus(),
      ]);

      setDocuments(docs.length > 0 ? docs : documentService.getMockDocuments());
      setCategories(cats);
      setComplianceStatus(status);
    } catch (error) {
      console.error('Error loading compliance data:', error);
      // Use mock data as fallback
      setDocuments(documentService.getMockDocuments());
      setCategories(await documentService.getDocumentCategories());
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: File[]) => {
    if (!selectedCategory) return;

    setUploading(true);
    const category = categories.find(cat => cat.id === selectedCategory);

    for (const file of files) {
      if (category) {
        const validationError = documentService.validateFile(file, category);
        if (validationError) {
          alert(`Error with ${file.name}: ${validationError}`);
          continue;
        }
      }

      const result = await documentService.uploadDocument(file, selectedCategory);
      if (result.success && result.document) {
        setDocuments(prev => [...prev, result.document!]);
        // Update compliance status
        const newStatus = await documentService.getComplianceStatus();
        setComplianceStatus(newStatus);
      } else {
        alert(`Failed to upload ${file.name}: ${result.error}`);
      }
    }

    setUploading(false);
    setShowUploadModal(false);
  };

  const handleDownload = async (doc: Document) => {
    const blob = await documentService.downloadDocument(doc.id);
    if (blob) {
      const url = window.URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = doc.name;
      window.document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      window.document.body.removeChild(a);
    } else {
      alert('Failed to download document');
    }
  };

  // Reminder functions
  const handleReminderAction = async (reminder: Reminder) => {
    try {
      // Simulate action processing
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mark reminder as completed
      setReminders(prev => prev.map(r => (r.id === reminder.id ? { ...r, completed: true } : r)));

      alert(`${reminder.action} completed successfully!`);
    } catch (error) {
      alert('Failed to complete action');
    }
  };

  const handleDeleteReminder = (reminderId: string) => {
    if (confirm('Are you sure you want to delete this reminder?')) {
      setReminders(prev => prev.filter(r => r.id !== reminderId));
    }
  };

  const handleSnoozeReminder = (reminderId: string) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + 7); // Snooze for 7 days

    setReminders(prev =>
      prev.map(r => (r.id === reminderId ? { ...r, date: newDate.toISOString().split('T')[0] } : r)),
    );
  };

  // Calendar functions
  const getRemindersForDate = (date: string) => {
    return reminders.filter(r => r.date === date && !r.completed);
  };

  const getCurrentMonthReminders = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return reminders.filter(r => {
      const reminderDate = new Date(r.date);
      return (
        reminderDate.getMonth() === currentMonth &&
        reminderDate.getFullYear() === currentYear &&
        !r.completed
      );
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDelete = async (documentId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      const success = await documentService.deleteDocument(documentId);
      if (success) {
        setDocuments(prev => prev.filter(doc => doc.id !== documentId));
        // Update compliance status
        const newStatus = await documentService.getComplianceStatus();
        setComplianceStatus(newStatus);
      } else {
        alert('Failed to delete document');
      }
    }
  };

  const handleVerify = async (documentId: string) => {
    const success = await documentService.verifyDocument(documentId);
    if (success) {
      setDocuments(prev =>
        prev.map(doc => (doc.id === documentId ? { ...doc, status: 'verified' as const } : doc)),
      );
    } else {
      alert('Failed to verify document');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className='w-5 h-5 text-green-600' />;
      case 'in-progress':
        return <Clock className='w-5 h-5 text-blue-600' />;
      case 'pending':
        return <Circle className='w-5 h-5 text-gray-400' />;
      default:
        return <Circle className='w-5 h-5 text-gray-400' />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className='bg-green-100 text-green-800'>Completed</Badge>;
      case 'in-progress':
        return <Badge className='bg-blue-100 text-blue-800'>In Progress</Badge>;
      case 'pending':
        return <Badge className='bg-gray-100 text-gray-800'>Pending</Badge>;
      default:
        return <Badge className='bg-gray-100 text-gray-800'>Pending</Badge>;
    }
  };

  const getReminderTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'border-red-200 bg-red-50';
      case 'important':
        return 'border-orange-200 bg-orange-50';
      case 'normal':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getDocumentStatusBadge = (status: Document['status']) => {
    switch (status) {
      case 'verified':
        return <Badge className='bg-green-100 text-green-800'>Verified</Badge>;
      case 'pending':
        return <Badge className='bg-yellow-100 text-yellow-800'>Pending</Badge>;
      case 'rejected':
        return <Badge className='bg-red-100 text-red-800'>Rejected</Badge>;
      default:
        return <Badge className='bg-gray-100 text-gray-800'>Unknown</Badge>;
    }
  };

  const openUploadModal = (category: string) => {
    setSelectedCategory(category);
    setShowUploadModal(true);
  };

  // Quick Actions Functions
  const handleScheduleReminder = async () => {
    if (!reminderForm.title || !reminderForm.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add reminder to upcoming reminders
      const newReminder: Reminder = {
        id: Math.random().toString(36).substr(2, 9),
        title: reminderForm.title,
        date: reminderForm.dueDate,
        type: reminderForm.priority as 'urgent' | 'important' | 'normal',
        description: reminderForm.description,
        action: 'Complete',
        category: reminderForm.category,
        createdAt: new Date().toISOString(),
      };

      // Add to reminders list
      setReminders(prev => [newReminder, ...prev]);

      setShowReminderModal(false);
      setReminderForm({
        title: '',
        description: '',
        dueDate: '',
        priority: 'normal',
        category: 'compliance',
      });

      alert('Reminder scheduled successfully!');
    } catch (error) {
      alert('Failed to schedule reminder');
    }
  };

  const handleGenerateReport = async () => {
    try {
      setReportForm(prev => ({ ...prev, isGenerating: true }));

      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In production, generate actual report
      const reportData = {
        type: reportForm.type,
        dateRange: reportForm.dateRange,
        documents: documents.length,
        verifiedDocuments: documents.filter(d => d.status === 'verified').length,
        complianceScore: complianceStatus.overallProgress,
        missingItems: complianceStatus.missingDocuments,
        generatedAt: new Date().toISOString(),
      };

      console.log('Report generated:', reportData);

      setShowReportModal(false);
      alert('Report generated successfully! Check your downloads.');
    } catch (error) {
      alert('Failed to generate report');
    }
  };

  const handleComplianceCheck = async () => {
    try {
      setComplianceCheck(prev => ({ ...prev, isRunning: true }));

      // Simulate compliance check
      await new Promise(resolve => setTimeout(resolve, 3000));

      const results = {
        overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
        criticalIssues: [],
        warnings: [],
        recommendations: [
          'Complete GST registration within 30 days',
          'File pending tax returns',
          'Update business address in ROC records',
          'Maintain proper accounting records',
        ],
        nextDeadlines: [
          { item: 'GST Filing', date: '2024-01-20', priority: 'high' },
          { item: 'TDS Payment', date: '2024-01-31', priority: 'medium' },
          { item: 'ROC Filing', date: '2024-02-15', priority: 'low' },
        ],
        checkedAt: new Date().toISOString(),
      };

      setComplianceCheck(prev => ({
        ...prev,
        isRunning: false,
        results,
        lastChecked: new Date().toISOString(),
      }));

      setShowComplianceCheckModal(false);
    } catch (error) {
      setComplianceCheck(prev => ({ ...prev, isRunning: false }));
      alert('Compliance check failed');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-orange-600 bg-orange-100';
      case 'low':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className='flex items-center justify-center h-64'>
          <RefreshCw className='w-8 h-8 animate-spin text-blue-600' />
          <span className='ml-2 text-gray-600'>Loading compliance data...</span>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold text-neutral-900 mb-2'>
              Business Setup & Compliance
            </h1>
            <p className='text-neutral-600'>
              Track your business setup progress and stay compliant
            </p>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={loadData}>
              <RefreshCw className='w-4 h-4 mr-2' />
              Refresh
            </Button>
            <Button>
              <Settings className='w-4 h-4 mr-2' />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Setup Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <ShieldCheck className='w-5 h-5' />
                Setup Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {complianceSteps.map(step => (
                  <div
                    key={step.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedStep === step.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                    onClick={() => setSelectedStep(step.id)}
                  >
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-3'>
                        {getStatusIcon(step.status)}
                        <div>
                          <h3 className='font-semibold text-neutral-900'>
                            Step {step.id}: {step.title}
                          </h3>
                          <p className='text-sm text-neutral-600'>{step.description}</p>
                        </div>
                      </div>
                      {getStatusBadge(step.status)}
                    </div>

                    {selectedStep === step.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className='mt-4 pt-4 border-t border-neutral-200'
                      >
                        <div className='space-y-3'>
                          <h4 className='font-medium text-neutral-900'>Required Documents:</h4>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            {step.documents.map((doc, index) => (
                              <div key={index} className='flex items-center gap-2 text-sm'>
                                <FileText className='w-4 h-4 text-neutral-400' />
                                <span className='text-neutral-700'>{doc}</span>
                              </div>
                            ))}
                          </div>
                          <div className='flex gap-2 mt-4'>
                            <Button
                              size='sm'
                              className='flex items-center gap-2'
                              onClick={() => openUploadModal(step.category)}
                            >
                              <Upload className='w-4 h-4' />
                              Upload Documents
                            </Button>
                            <Button size='sm' variant='outline' className='flex items-center gap-2'>
                              <Download className='w-4 h-4' />
                              Download Templates
                            </Button>
                            <Button size='sm' variant='outline' className='flex items-center gap-2'>
                              <ExternalLink className='w-4 h-4' />
                              View Guidelines
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Document Library */}
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='flex items-center gap-2'>
                  <FileText className='w-5 h-5' />
                  Document Library
                </CardTitle>
                <Button size='sm' onClick={() => setShowUploadModal(true)}>
                  <Plus className='w-4 h-4 mr-2' />
                  Upload New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {documents.map(doc => (
                  <div
                    key={doc.id}
                    className='flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-gray-50'
                  >
                    <div className='flex items-center gap-3'>
                      <FileText className='w-8 h-8 text-blue-600' />
                      <div>
                        <h4 className='font-medium text-neutral-900'>{doc.name}</h4>
                        <p className='text-sm text-neutral-600'>
                          {documentService.formatFileSize(doc.size)} • Uploaded{' '}
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      {getDocumentStatusBadge(doc.status)}
                      <Button size='sm' variant='outline' onClick={() => handleDownload(doc)}>
                        <Download className='w-4 h-4' />
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        onClick={() => handleVerify(doc.id)}
                        disabled={doc.status === 'verified'}
                      >
                        <Check className='w-4 h-4' />
                      </Button>
                      <Button size='sm' variant='outline' onClick={() => handleDelete(doc.id)}>
                        <Trash2 className='w-4 h-4' />
                      </Button>
                    </div>
                  </div>
                ))}

                {documents.length === 0 && (
                  <div className='border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center'>
                    <Upload className='w-8 h-8 text-neutral-400 mx-auto mb-2' />
                    <p className='text-neutral-600 mb-2'>No documents uploaded yet</p>
                    <Button variant='outline' onClick={() => setShowUploadModal(true)}>
                      Upload Your First Document
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Compliance Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Calendar className='w-5 h-5' />
                Upcoming Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {reminders
                  .filter(r => !r.completed)
                  .map(reminder => (
                    <div
                      key={reminder.id}
                      className={`p-4 rounded-lg border ${getReminderTypeColor(reminder.type)} hover:shadow-sm transition-shadow`}
                    >
                      <div className='flex items-start justify-between mb-2'>
                        <div className='flex-1'>
                          <h4 className='font-medium text-neutral-900'>{reminder.title}</h4>
                          <p className='text-sm text-neutral-600 mt-1'>{reminder.description}</p>
                        </div>
                        <div className='flex items-center gap-1 ml-2'>
                          {reminder.type === 'urgent' && (
                            <AlertTriangle className='w-4 h-4 text-red-600' />
                          )}
                          <Button
                            size='sm'
                            variant='ghost'
                            onClick={() => handleDeleteReminder(reminder.id)}
                            className='text-gray-400 hover:text-red-600'
                          >
                            <X className='w-3 h-3' />
                          </Button>
                        </div>
                      </div>

                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                          <Calendar className='w-3 h-3 text-gray-500' />
                          <p className='text-xs text-neutral-500'>Due: {reminder.date}</p>
                          <Badge className={`text-xs ${getPriorityColor(reminder.type)}`}>
                            {reminder.type}
                          </Badge>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Button
                            size='sm'
                            variant='outline'
                            onClick={() => handleSnoozeReminder(reminder.id)}
                            className='text-xs'
                          >
                            Snooze
                          </Button>
                          <Button
                            size='sm'
                            onClick={() => handleReminderAction(reminder)}
                            className='text-xs'
                          >
                            {reminder.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                {reminders.filter(r => !r.completed).length === 0 && (
                  <div className='text-center py-6 text-gray-500'>
                    <Bell className='w-8 h-8 mx-auto mb-2 text-gray-300' />
                    <p className='text-sm'>No upcoming reminders</p>
                    <p className='text-xs'>All tasks are completed!</p>
                  </div>
                )}

                <Button
                  className='w-full'
                  variant='outline'
                  onClick={() => setShowCalendarModal(true)}
                >
                  <Calendar className='w-4 h-4 mr-2' />
                  View Full Calendar
                </Button>
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
                <Button
                  className='w-full justify-start'
                  variant='outline'
                  onClick={() => setShowReminderModal(true)}
                >
                  <Bell className='w-4 h-4 mr-2' />
                  Schedule Reminder
                </Button>
                <Button
                  className='w-full justify-start'
                  variant='outline'
                  onClick={() => setShowReportModal(true)}
                >
                  <FileDown className='w-4 h-4 mr-2' />
                  Generate Report
                </Button>
                <Button
                  className='w-full justify-start'
                  variant='outline'
                  onClick={() => setShowComplianceCheckModal(true)}
                >
                  <CheckSquare className='w-4 h-4 mr-2' />
                  Compliance Check
                </Button>
                <Button
                  className='w-full justify-start'
                  variant='outline'
                  onClick={() => setShowGuidelinesModal(true)}
                >
                  <Info className='w-4 h-4 mr-2' />
                  View Guidelines
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Setup Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-neutral-600'>Overall Progress</span>
                  <span className='text-lg font-semibold text-neutral-900'>
                    {complianceStatus.overallProgress}%
                  </span>
                </div>
                <div className='w-full bg-neutral-200 rounded-full h-2'>
                  <div
                    className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                    style={{ width: `${complianceStatus.overallProgress}%` }}
                  ></div>
                </div>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-neutral-600'>Completed</span>
                    <span className='text-green-600'>
                      {complianceStatus.completedSteps}/{complianceStatus.totalSteps}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-neutral-600'>Documents</span>
                    <span className='text-blue-600'>{documents.length} uploaded</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-neutral-600'>Verified</span>
                    <span className='text-green-600'>
                      {documents.filter(d => d.status === 'verified').length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reminder Modal */}
      <AnimatePresence>
        {showReminderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
            onClick={() => setShowReminderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-white rounded-lg p-6 w-full max-w-md'
              onClick={e => e.stopPropagation()}
            >
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold'>Schedule Reminder</h3>
                <Button variant='ghost' size='sm' onClick={() => setShowReminderModal(false)}>
                  <X className='w-4 h-4' />
                </Button>
              </div>

              <div className='space-y-4'>
                <div>
                  <Label htmlFor='reminder-title'>Title *</Label>
                  <Input
                    id='reminder-title'
                    value={reminderForm.title}
                    onChange={e => setReminderForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder='e.g., GST Filing Due'
                  />
                </div>

                <div>
                  <Label htmlFor='reminder-description'>Description</Label>
                  <Textarea
                    id='reminder-description'
                    value={reminderForm.description}
                    onChange={e =>
                      setReminderForm(prev => ({ ...prev, description: e.target.value }))
                    }
                    placeholder='Additional details about the reminder'
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor='reminder-date'>Due Date *</Label>
                  <Input
                    id='reminder-date'
                    type='date'
                    value={reminderForm.dueDate}
                    onChange={e => setReminderForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor='reminder-priority'>Priority</Label>
                  <Select
                    value={reminderForm.priority}
                    onValueChange={value => setReminderForm(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='normal'>Normal</SelectItem>
                      <SelectItem value='important'>Important</SelectItem>
                      <SelectItem value='urgent'>Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='reminder-category'>Category</Label>
                  <Select
                    value={reminderForm.category}
                    onValueChange={value => setReminderForm(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='compliance'>Compliance</SelectItem>
                      <SelectItem value='tax'>Tax</SelectItem>
                      <SelectItem value='legal'>Legal</SelectItem>
                      <SelectItem value='financial'>Financial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='flex gap-2 mt-6'>
                <Button variant='outline' onClick={() => setShowReminderModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleScheduleReminder} className='flex-1'>
                  Schedule Reminder
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Report Generation Modal */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
            onClick={() => setShowReportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-white rounded-lg p-6 w-full max-w-md'
              onClick={e => e.stopPropagation()}
            >
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold'>Generate Report</h3>
                <Button variant='ghost' size='sm' onClick={() => setShowReportModal(false)}>
                  <X className='w-4 h-4' />
                </Button>
              </div>

              <div className='space-y-4'>
                <div>
                  <Label htmlFor='report-type'>Report Type</Label>
                  <Select
                    value={reportForm.type}
                    onValueChange={value => setReportForm(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='compliance'>Compliance Report</SelectItem>
                      <SelectItem value='documents'>Document Summary</SelectItem>
                      <SelectItem value='progress'>Progress Report</SelectItem>
                      <SelectItem value='comprehensive'>Comprehensive Report</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='report-date-range'>Date Range</Label>
                  <Select
                    value={reportForm.dateRange}
                    onValueChange={value => setReportForm(prev => ({ ...prev, dateRange: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='week'>This Week</SelectItem>
                      <SelectItem value='month'>This Month</SelectItem>
                      <SelectItem value='quarter'>This Quarter</SelectItem>
                      <SelectItem value='year'>This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='report-format'>Format</Label>
                  <Select
                    value={reportForm.format}
                    onValueChange={value => setReportForm(prev => ({ ...prev, format: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='pdf'>PDF</SelectItem>
                      <SelectItem value='excel'>Excel</SelectItem>
                      <SelectItem value='csv'>CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    id='include-documents'
                    checked={reportForm.includeDocuments}
                    onChange={e =>
                      setReportForm(prev => ({ ...prev, includeDocuments: e.target.checked }))
                    }
                    className='rounded'
                  />
                  <Label htmlFor='include-documents'>Include document details</Label>
                </div>
              </div>

              <div className='flex gap-2 mt-6'>
                <Button variant='outline' onClick={() => setShowReportModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleGenerateReport} className='flex-1'>
                  Generate Report
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compliance Check Modal */}
      <AnimatePresence>
        {showComplianceCheckModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
            onClick={() => setShowComplianceCheckModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto'
              onClick={e => e.stopPropagation()}
            >
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold'>Compliance Check</h3>
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => setShowComplianceCheckModal(false)}
                >
                  <X className='w-4 h-4' />
                </Button>
              </div>

              {!complianceCheck.results ? (
                <div className='text-center py-8'>
                  <ShieldCheck className='w-16 h-16 text-blue-500 mx-auto mb-4' />
                  <h4 className='text-lg font-medium mb-2'>Run Compliance Check</h4>
                  <p className='text-gray-600 mb-6'>
                    This will analyze your current compliance status and identify any issues or
                    missing requirements.
                  </p>
                  <Button
                    onClick={handleComplianceCheck}
                    disabled={complianceCheck.isRunning}
                    className='w-full'
                  >
                    {complianceCheck.isRunning ? (
                      <>
                        <RefreshCw className='w-4 h-4 mr-2 animate-spin' />
                        Checking Compliance...
                      </>
                    ) : (
                      <>
                        <CheckSquare className='w-4 h-4 mr-2' />
                        Start Compliance Check
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className='space-y-6'>
                  <div className='text-center'>
                    <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4'>
                      <CheckCircle2 className='w-8 h-8 text-green-600' />
                    </div>
                    <h4 className='text-lg font-medium mb-2'>Compliance Check Complete</h4>
                    <p className='text-gray-600'>
                      Last checked: {new Date(complianceCheck.lastChecked!).toLocaleString()}
                    </p>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='text-center p-4 bg-blue-50 rounded-lg'>
                      <div className='text-2xl font-bold text-blue-600'>
                        {complianceCheck.results.overallScore}%
                      </div>
                      <div className='text-sm text-blue-600'>Overall Score</div>
                    </div>
                    <div className='text-center p-4 bg-green-50 rounded-lg'>
                      <div className='text-2xl font-bold text-green-600'>
                        {complianceCheck.results.criticalIssues.length}
                      </div>
                      <div className='text-sm text-green-600'>Critical Issues</div>
                    </div>
                    <div className='text-center p-4 bg-yellow-50 rounded-lg'>
                      <div className='text-2xl font-bold text-yellow-600'>
                        {complianceCheck.results.warnings.length}
                      </div>
                      <div className='text-sm text-yellow-600'>Warnings</div>
                    </div>
                  </div>

                  {complianceCheck.results.recommendations.length > 0 && (
                    <div>
                      <h5 className='font-medium mb-3'>Recommendations</h5>
                      <ul className='space-y-2'>
                        {complianceCheck.results.recommendations.map(
                          (rec: string, index: number) => (
                            <li key={index} className='flex items-start gap-2'>
                              <CheckCircle2 className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
                              <span className='text-sm'>{rec}</span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                  {complianceCheck.results.nextDeadlines.length > 0 && (
                    <div>
                      <h5 className='font-medium mb-3'>Upcoming Deadlines</h5>
                      <div className='space-y-2'>
                        {complianceCheck.results.nextDeadlines.map(
                          (deadline: any, index: number) => (
                            <div
                              key={index}
                              className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                            >
                              <div>
                                <div className='font-medium'>{deadline.item}</div>
                                <div className='text-sm text-gray-600'>{deadline.date}</div>
                              </div>
                              <Badge className={getPriorityColor(deadline.priority)}>
                                {deadline.priority}
                              </Badge>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  <div className='flex gap-2'>
                    <Button variant='outline' onClick={() => setShowComplianceCheckModal(false)}>
                      Close
                    </Button>
                    <Button onClick={handleComplianceCheck} className='flex-1'>
                      <RefreshCw className='w-4 h-4 mr-2' />
                      Run Again
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Guidelines Modal */}
      <AnimatePresence>
        {showGuidelinesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
            onClick={() => setShowGuidelinesModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto'
              onClick={e => e.stopPropagation()}
            >
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xl font-semibold'>Compliance Guidelines</h3>
                <Button variant='ghost' size='sm' onClick={() => setShowGuidelinesModal(false)}>
                  <X className='w-4 h-4' />
                </Button>
              </div>

              <div className='space-y-6'>
                {guidelines.map(guideline => (
                  <div key={guideline.id} className='border border-gray-200 rounded-lg p-6'>
                    <div className='flex items-start justify-between mb-4'>
                      <div>
                        <h4 className='text-lg font-semibold mb-2'>{guideline.title}</h4>
                        <p className='text-gray-600'>{guideline.description}</p>
                      </div>
                      <div className='text-right'>
                        <div className='text-sm text-gray-500'>Timeline</div>
                        <div className='font-medium'>{guideline.timeline}</div>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <h5 className='font-medium mb-3 flex items-center gap-2'>
                          <CheckSquare className='w-4 h-4' />
                          Steps
                        </h5>
                        <ol className='space-y-2 text-sm'>
                          {guideline.steps.map((step, index) => (
                            <li key={index} className='flex items-start gap-2'>
                              <span className='flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center font-medium'>
                                {index + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <h5 className='font-medium mb-3 flex items-center gap-2'>
                          <FileText className='w-4 h-4' />
                          Required Documents
                        </h5>
                        <ul className='space-y-2 text-sm'>
                          {guideline.documents.map((doc, index) => (
                            <li key={index} className='flex items-center gap-2'>
                              <CheckCircle2 className='w-3 h-3 text-green-600' />
                              {doc}
                            </li>
                          ))}
                        </ul>

                        <div className='mt-4 p-3 bg-gray-50 rounded-lg'>
                          <div className='text-sm text-gray-600'>Estimated Cost</div>
                          <div className='font-medium'>{guideline.cost}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className='mt-6 text-center'>
                <Button variant='outline' onClick={() => setShowGuidelinesModal(false)}>
                  Close Guidelines
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Calendar Modal */}
      <AnimatePresence>
        {showCalendarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
            onClick={() => setShowCalendarModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto'
              onClick={e => e.stopPropagation()}
            >
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xl font-semibold'>Compliance Calendar</h3>
                <Button variant='ghost' size='sm' onClick={() => setShowCalendarModal(false)}>
                  <X className='w-4 h-4' />
                </Button>
              </div>

              {/* Calendar View */}
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* Monthly Calendar */}
                <div className='bg-gray-50 rounded-lg p-4'>
                  <h4 className='font-medium mb-4 text-center'>
                    {new Date().toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </h4>

                  <div className='grid grid-cols-7 gap-1 text-xs'>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className='p-2 text-center font-medium text-gray-600'>
                        {day}
                      </div>
                    ))}

                    {Array.from({
                      length: getFirstDayOfMonth(new Date().getFullYear(), new Date().getMonth()),
                    }).map((_, i) => (
                      <div key={`empty-${i}`} className='p-2'></div>
                    ))}

                    {Array.from({
                      length: getDaysInMonth(new Date().getFullYear(), new Date().getMonth()),
                    }).map((_, i) => {
                      const day = i + 1;
                      const dateString = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const dayReminders = getRemindersForDate(dateString);
                      const isToday = new Date().getDate() === day;

                      return (
                        <div
                          key={day}
                          className={`p-2 text-center cursor-pointer hover:bg-blue-100 transition-colors ${
                            isToday ? 'bg-blue-500 text-white rounded' : ''
                          } ${selectedCalendarDate === dateString ? 'bg-blue-200 border-2 border-blue-400' : ''}`}
                          onClick={() => setSelectedCalendarDate(dateString)}
                        >
                          <div className='text-sm'>{day}</div>
                          {dayReminders.length > 0 && (
                            <div className='flex justify-center mt-1'>
                              <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reminders List */}
                <div>
                  <h4 className='font-medium mb-4'>Upcoming Reminders</h4>
                  <div className='space-y-3 max-h-96 overflow-y-auto'>
                    {getCurrentMonthReminders().length > 0 ? (
                      getCurrentMonthReminders().map(reminder => (
                        <div
                          key={reminder.id}
                          className={`p-3 rounded-lg border ${getReminderTypeColor(reminder.type)}`}
                        >
                          <div className='flex items-start justify-between'>
                            <div className='flex-1'>
                              <h5 className='font-medium text-sm'>{reminder.title}</h5>
                              <p className='text-xs text-gray-600 mt-1'>{reminder.description}</p>
                              <div className='flex items-center gap-2 mt-2'>
                                <Calendar className='w-3 h-3 text-gray-500' />
                                <span className='text-xs text-gray-500'>
                                  {formatDate(reminder.date)}
                                </span>
                                <Badge className={`text-xs ${getPriorityColor(reminder.type)}`}>
                                  {reminder.type}
                                </Badge>
                              </div>
                            </div>
                            <div className='flex items-center gap-1 ml-2'>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() => handleSnoozeReminder(reminder.id)}
                                className='text-xs'
                              >
                                Snooze
                              </Button>
                              <Button
                                size='sm'
                                onClick={() => handleReminderAction(reminder)}
                                className='text-xs'
                              >
                                {reminder.action}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='text-center py-8 text-gray-500'>
                        <Calendar className='w-8 h-8 mx-auto mb-2 text-gray-300' />
                        <p className='text-sm'>No reminders for this month</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Selected Date Reminders */}
              {selectedCalendarDate && (
                <div className='mt-6 p-4 bg-blue-50 rounded-lg'>
                  <h4 className='font-medium mb-3 text-blue-800'>
                    Reminders for {formatDate(selectedCalendarDate)}
                  </h4>
                  <div className='space-y-2'>
                    {getRemindersForDate(selectedCalendarDate).length > 0 ? (
                      getRemindersForDate(selectedCalendarDate).map(reminder => (
                        <div
                          key={reminder.id}
                          className={`p-3 rounded-lg border ${getReminderTypeColor(reminder.type)}`}
                        >
                          <div className='flex items-start justify-between'>
                            <div className='flex-1'>
                              <h5 className='font-medium text-sm'>{reminder.title}</h5>
                              <p className='text-xs text-gray-600 mt-1'>{reminder.description}</p>
                              <Badge className={`text-xs mt-2 ${getPriorityColor(reminder.type)}`}>
                                {reminder.type}
                              </Badge>
                            </div>
                            <div className='flex items-center gap-1 ml-2'>
                              <Button
                                size='sm'
                                variant='outline'
                                onClick={() => handleSnoozeReminder(reminder.id)}
                                className='text-xs'
                              >
                                Snooze
                              </Button>
                              <Button
                                size='sm'
                                onClick={() => handleReminderAction(reminder)}
                                className='text-xs'
                              >
                                {reminder.action}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className='text-sm text-gray-600'>No reminders for this date</p>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className='mt-6 grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {getCurrentMonthReminders().length}
                  </div>
                  <div className='text-xs text-gray-600'>Total Reminders</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-red-600'>
                    {getCurrentMonthReminders().filter(r => r.type === 'urgent').length}
                  </div>
                  <div className='text-xs text-gray-600'>Urgent</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-green-600'>
                    {reminders.filter(r => r.completed).length}
                  </div>
                  <div className='text-xs text-gray-600'>Completed</div>
                </div>
              </div>

              <div className='mt-6 text-center'>
                <Button variant='outline' onClick={() => setShowCalendarModal(false)}>
                  Close Calendar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className='bg-white rounded-lg p-6 w-full max-w-2xl'
              onClick={e => e.stopPropagation()}
            >
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold'>Upload Documents</h3>
                <Button variant='ghost' size='sm' onClick={() => setShowUploadModal(false)}>
                  <X className='w-4 h-4' />
                </Button>
              </div>

              {selectedCategory && (
                <div className='mb-4 p-3 bg-blue-50 rounded-lg'>
                  <p className='text-sm text-blue-800'>
                    Category: {categories.find(c => c.id === selectedCategory)?.name}
                  </p>
                </div>
              )}

              <FileUpload
                onFileSelect={handleFileUpload}
                multiple={true}
                accept='.pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx'
                maxSize={10}
                maxFiles={5}
                disabled={uploading}
              />

              {uploading && (
                <div className='mt-4 text-center'>
                  <p className='text-sm text-gray-600'>Uploading documents...</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
