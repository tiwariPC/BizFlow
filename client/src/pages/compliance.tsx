import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Upload,
  Download,
  Plus,
  X,
  Calendar,
  Bell,
  CheckCircle2,
  Clock,
  Circle,
  AlertTriangle,
  FileDown,
  CheckSquare,
  Info,
  ExternalLink,
} from "lucide-react";

// Mock document service
const documentService = {
  uploadDocument: async (file: File, category: string) => {
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      document: {
        id: Date.now().toString(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'pending',
        uploadedAt: new Date().toISOString(),
        category
      }
    };
  },
  validateFile: (file: File, category: any) => {
    if (file.size > 10 * 1024 * 1024) {
      return 'File size must be less than 10MB';
    }
    return null;
  },
  downloadDocument: async (id: string) => {
    // Simulate download
    return new Blob(['Mock document content'], { type: 'text/plain' });
  },
  deleteDocument: async (id: string) => {
    return true;
  },
  verifyDocument: async (id: string) => {
    return true;
  },
  getComplianceStatus: async () => {
    return {
      overallProgress: 65,
      completedSteps: 3,
      totalSteps: 5,
      categories: {
        'business-registration': { completed: 2, total: 3 },
        'tax-compliance': { completed: 1, total: 2 }
      }
    };
  },
  formatFileSize: (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
};

// Types
interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'verified' | 'rejected';
  uploadedAt: string;
  category: string;
}

interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'normal' | 'urgent' | 'critical';
  action: string;
  completed: boolean;
}

interface ComplianceStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  category: string;
  documents: string[];
}

const Compliance = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [complianceStatus, setComplianceStatus] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string | null>(null);

  const [reminderForm, setReminderForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'normal'
  });

  const categories = [
    { id: 'business-registration', name: 'Business Registration', icon: FileText },
    { id: 'tax-compliance', name: 'Tax Compliance', icon: FileText },
    { id: 'licenses', name: 'Licenses & Permits', icon: FileText },
    { id: 'insurance', name: 'Insurance', icon: FileText },
    { id: 'employment', name: 'Employment Law', icon: FileText }
  ];

  const complianceSteps: ComplianceStep[] = [
    {
      id: 1,
      title: 'Business Registration',
      description: 'Register your business with the appropriate authorities',
      status: 'completed',
      category: 'business-registration',
      documents: ['Business Registration Certificate', 'PAN Card', 'Aadhaar Card']
    },
    {
      id: 2,
      title: 'GST Registration',
      description: 'Register for Goods and Services Tax',
      status: 'in-progress',
      category: 'tax-compliance',
      documents: ['GST Registration Certificate', 'Business Address Proof']
    },
    {
      id: 3,
      title: 'Professional Licenses',
      description: 'Obtain required professional licenses',
      status: 'pending',
      category: 'licenses',
      documents: ['Professional License', 'Qualification Certificates']
    }
  ];

  useEffect(() => {
    // Load initial data
    loadComplianceStatus();
    loadReminders();
  }, []);

  const loadComplianceStatus = async () => {
    const status = await documentService.getComplianceStatus();
    setComplianceStatus(status);
  };

  const loadReminders = () => {
    // Mock reminders
    setReminders([
      {
        id: '1',
        title: 'GST Filing Due',
        description: 'Monthly GST return filing is due',
        date: '2024-01-20',
        type: 'urgent',
        action: 'File Now',
        completed: false
      },
      {
        id: '2',
        title: 'Annual Compliance Review',
        description: 'Schedule annual compliance review meeting',
        date: '2024-02-15',
        type: 'normal',
        action: 'Schedule',
        completed: false
      }
    ]);
  };

  const handleFileUpload = async (files: FileList) => {
    setUploading(true);
    const category = categories.find(cat => cat.id === selectedCategory);

    for (const file of files) {
      if (category) {
        const validationError = documentService.validateFile(file, category);
        if (validationError) {
          alert('Error with ' + file.name + ': ' + validationError);
          continue;
        }
      }

      const result = await documentService.uploadDocument(file, selectedCategory);
      if (result.success && result.document) {
        setDocuments(prev => [...prev, result.document!]);
        const newStatus = await documentService.getComplianceStatus();
        setComplianceStatus(newStatus);
      } else {
        alert('Failed to upload ' + file.name + ': ' + result.error);
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

  const handleReminderAction = async (reminder: Reminder) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReminders(prev =>
        prev.map(r =>
          r.id === reminder.id
            ? { ...r, completed: true }
            : r
        )
      );
      alert(reminder.action + ' completed successfully!');
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
    newDate.setDate(newDate.getDate() + 7);
    setReminders(prev =>
      prev.map(r =>
        r.id === reminderId
          ? { ...r, date: newDate.toISOString().split('T')[0] }
          : r
      )
    );
  };

  const getRemindersForDate = (date: string) => {
    return reminders.filter(r => r.date === date && !r.completed);
  };

  const getCurrentMonthReminders = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    return reminders.filter(r => {
      const reminderDate = new Date(r.date);
      return reminderDate.getMonth() === currentMonth &&
             reminderDate.getFullYear() === currentYear &&
             !r.completed;
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
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
        prev.map(doc =>
          doc.id === documentId
            ? { ...doc, status: 'verified' as const }
            : doc
        )
      );
    } else {
      alert('Failed to verify document');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "pending":
        return <Circle className="w-5 h-5 text-gray-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Pending</Badge>;
    }
  };

  const getDocumentStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getReminderTypeColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "border-red-200 bg-red-50";
      case "critical":
        return "border-red-300 bg-red-100";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getPriorityColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "critical":
        return "bg-red-200 text-red-900";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const openUploadModal = (category: string) => {
    setSelectedCategory(category);
    setShowUploadModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Management</h1>
          <p className="text-gray-600">Manage your business compliance requirements and documents</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Compliance Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Compliance Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceSteps.map((step) => (
                    <div
                      key={step.id}
                      className={'p-4 rounded-lg border-2 cursor-pointer transition-colors ' + (
                        selectedStep === step.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-neutral-200 hover:border-neutral-300"
                      )}
                      onClick={() => setSelectedStep(step.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(step.status)}
                          <div>
                            <h3 className="font-semibold text-neutral-900">Step {step.id}: {step.title}</h3>
                            <p className="text-sm text-neutral-600">{step.description}</p>
                          </div>
                        </div>
                        {getStatusBadge(step.status)}
                      </div>

                      {selectedStep === step.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 pt-4 border-t border-neutral-200"
                        >
                          <div className="space-y-3">
                            <h4 className="font-medium text-neutral-900">Required Documents:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {step.documents.map((doc, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm">
                                  <FileText className="w-4 h-4 text-neutral-400" />
                                  <span className="text-neutral-700">{doc}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2 mt-4">
                              <Button
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={() => openUploadModal(step.category)}
                              >
                                <Upload className="w-4 h-4" />
                                Upload Documents
                              </Button>
                              <Button size="sm" variant="outline" className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Download Templates
                              </Button>
                              <Button size="sm" variant="outline" className="flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" />
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
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Document Library
                  </CardTitle>
                  <Button size="sm" onClick={() => setShowUploadModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Upload New
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-neutral-900">{doc.name}</h4>
                          <p className="text-sm text-neutral-600">
                            {documentService.formatFileSize(doc.size)} • Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getDocumentStatusBadge(doc.status)}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDownload(doc)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        {doc.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleVerify(doc.id)}
                          >
                            Verify
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(doc.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {documents.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">No documents uploaded</p>
                      <p className="text-sm mb-4">Upload your compliance documents to get started</p>
                      <Button onClick={() => setShowUploadModal(true)}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload First Document
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Setup Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-neutral-600">Overall Progress</span>
                      <span className="text-neutral-900">{complianceStatus?.overallProgress || 0}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: (complianceStatus?.overallProgress || 0) + '%' }}
                      ></div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Completed</span>
                        <span className="text-green-600">{complianceStatus?.completedSteps || 0}/{complianceStatus?.totalSteps || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Documents</span>
                        <span className="text-blue-600">{documents.length} uploaded</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Verified</span>
                        <span className="text-green-600">
                          {documents.filter(d => d.status === 'verified').length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Upcoming Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reminders.filter(r => !r.completed).map((reminder) => (
                    <div
                      key={reminder.id}
                      className={'p-4 rounded-lg border ' + getReminderTypeColor(reminder.type) + ' hover:shadow-sm transition-shadow'}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-neutral-900">{reminder.title}</h4>
                          <p className="text-sm text-neutral-600 mt-1">{reminder.description}</p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          {reminder.type === "urgent" && (
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteReminder(reminder.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-gray-500" />
                          <p className="text-xs text-neutral-500">Due: {reminder.date}</p>
                          <Badge className={'text-xs ' + getPriorityColor(reminder.type)}>
                            {reminder.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSnoozeReminder(reminder.id)}
                            className="text-xs"
                          >
                            Snooze
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleReminderAction(reminder)}
                            className="text-xs"
                          >
                            {reminder.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {reminders.filter(r => !r.completed).length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No upcoming reminders</p>
                      <p className="text-xs">All tasks are completed!</p>
                    </div>
                  )}

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => setShowCalendarModal(true)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
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
                <div className="space-y-3">
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                    onClick={() => setShowReminderModal(true)}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Schedule Reminder
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <FileDown className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <CheckSquare className="w-4 h-4 mr-2" />
                    Compliance Check
                  </Button>
                  <Button
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    View Guidelines
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Upload Document</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUploadModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="file">File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files) {
                        handleFileUpload(e.target.files);
                      }
                    }}
                    disabled={uploading}
                  />
                </div>

                {uploading && (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-sm text-gray-600 mt-2">Uploading...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reminder Modal */}
      <AnimatePresence>
        {showReminderModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowReminderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Schedule Reminder</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReminderModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="reminder-title">Title *</Label>
                  <Input
                    id="reminder-title"
                    value={reminderForm.title}
                    onChange={(e) => setReminderForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., GST Filing Due"
                  />
                </div>

                <div>
                  <Label htmlFor="reminder-description">Description</Label>
                  <Textarea
                    id="reminder-description"
                    value={reminderForm.description}
                    onChange={(e) => setReminderForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Additional details about the reminder"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="reminder-date">Due Date *</Label>
                  <Input
                    id="reminder-date"
                    type="date"
                    value={reminderForm.dueDate}
                    onChange={(e) => setReminderForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="reminder-priority">Priority</Label>
                  <Select
                    value={reminderForm.priority}
                    onValueChange={(value) => setReminderForm(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1"
                    onClick={() => {
                      if (reminderForm.title && reminderForm.dueDate) {
                        const newReminder: Reminder = {
                          id: Date.now().toString(),
                          title: reminderForm.title,
                          description: reminderForm.description,
                          date: reminderForm.dueDate,
                          type: reminderForm.priority as any,
                          action: 'Complete',
                          completed: false
                        };
                        setReminders(prev => [...prev, newReminder]);
                        setReminderForm({ title: '', description: '', dueDate: '', priority: 'normal' });
                        setShowReminderModal(false);
                      } else {
                        alert('Please fill in all required fields');
                      }
                    }}
                  >
                    Schedule Reminder
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowReminderModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCalendarModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Calendar View</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCalendarModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <h4 className="font-medium mb-4">Calendar</h4>
                  <div className="bg-white border rounded-lg p-4">
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="p-2 text-center font-medium text-gray-600">
                          {day}
                        </div>
                      ))}

                      {Array.from({ length: getFirstDayOfMonth(new Date().getFullYear(), new Date().getMonth()) }).map((_, i) => (
                        <div key={'empty-' + i} className="p-2"></div>
                      ))}

                      {Array.from({ length: getDaysInMonth(new Date().getFullYear(), new Date().getMonth()) }).map((_, i) => {
                        const day = i + 1;
                        const dateString = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
                        const dayReminders = getRemindersForDate(dateString);
                        const isToday = new Date().getDate() === day;

                        return (
                          <div
                            key={day}
                            className={'p-2 text-center cursor-pointer hover:bg-blue-100 transition-colors ' + (
                              isToday ? 'bg-blue-500 text-white rounded' : ''
                            ) + ' ' + (selectedCalendarDate === dateString ? 'bg-blue-200 border-2 border-blue-400' : '')}
                            onClick={() => setSelectedCalendarDate(dateString)}
                          >
                            <div className="text-sm">{day}</div>
                            {dayReminders.length > 0 && (
                              <div className="flex justify-center mt-1">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Reminders List */}
                <div>
                  <h4 className="font-medium mb-4">Upcoming Reminders</h4>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {getCurrentMonthReminders().length > 0 ? (
                      getCurrentMonthReminders().map((reminder) => (
                        <div
                          key={reminder.id}
                          className={'p-3 rounded-lg border ' + getReminderTypeColor(reminder.type)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{reminder.title}</h5>
                              <p className="text-xs text-gray-600 mt-1">{reminder.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Calendar className="w-3 h-3 text-gray-500" />
                                <span className="text-xs text-gray-500">{formatDate(reminder.date)}</span>
                                <Badge className={'text-xs ' + getPriorityColor(reminder.type)}>
                                  {reminder.type}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 ml-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleSnoozeReminder(reminder.id)}
                                className="text-xs"
                              >
                                Snooze
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleReminderAction(reminder)}
                                className="text-xs"
                              >
                                {reminder.action}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-sm">No reminders for this month</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Selected Date Reminders */}
              {selectedCalendarDate && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-3 text-blue-800">
                    Reminders for {formatDate(selectedCalendarDate)}
                  </h4>
                  <div className="space-y-2">
                    {getRemindersForDate(selectedCalendarDate).length > 0 ? (
                      getRemindersForDate(selectedCalendarDate).map((reminder) => (
                        <div
                          key={reminder.id}
                          className={'p-3 rounded-lg border ' + getReminderTypeColor(reminder.type)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{reminder.title}</h5>
                              <p className="text-xs text-gray-600 mt-1">{reminder.description}</p>
                              <Badge className={'text-xs mt-2 ' + getPriorityColor(reminder.type)}>
                                {reminder.type}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 ml-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleSnoozeReminder(reminder.id)}
                                className="text-xs"
                              >
                                Snooze
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleReminderAction(reminder)}
                                className="text-xs"
                              >
                                {reminder.action}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600">No reminders for this date</p>
                    )}
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {getCurrentMonthReminders().length}
                  </div>
                  <div className="text-sm text-gray-600">Total Reminders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {reminders.filter(r => r.completed).length}
                  </div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {reminders.filter(r => !r.completed && r.type === 'urgent').length}
                  </div>
                  <div className="text-sm text-gray-600">Urgent</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Compliance;
