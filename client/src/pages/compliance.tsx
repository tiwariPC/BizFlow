import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
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
  X
} from "lucide-react";

const complianceSteps = [
  {
    id: 1,
    title: "Incorporation",
    description: "Register your business entity",
    status: "completed",
    icon: Building2,
    documents: ["Certificate of Incorporation", "MOA & AOA", "PAN Card"]
  },
  {
    id: 2,
    title: "GST Registration",
    description: "Register for Goods & Services Tax",
    status: "completed",
    icon: Receipt,
    documents: ["GST Certificate", "GST Login Credentials"]
  },
  {
    id: 3,
    title: "Bank Account",
    description: "Open business current account",
    status: "in-progress",
    icon: CreditCard,
    documents: ["Bank Account Details", "Cheque Book", "Online Banking"]
  },
  {
    id: 4,
    title: "Compliance Calendar",
    description: "Set up compliance reminders",
    status: "pending",
    icon: ShieldCheck,
    documents: ["Compliance Checklist", "Reminder Settings"]
  }
];

const upcomingReminders = [
  {
    id: 1,
    title: "GST Filing Due",
    date: "2024-01-20",
    type: "urgent",
    description: "File GSTR-3B for December 2023"
  },
  {
    id: 2,
    title: "TDS Payment Due",
    date: "2024-01-31",
    type: "important",
    description: "Pay TDS for Q3 FY 2023-24"
  },
  {
    id: 3,
    title: "ROC Annual Filing",
    date: "2024-02-15",
    type: "normal",
    description: "File MGT-7 and AOC-4"
  }
];

const documents = [
  {
    id: 1,
    name: "Certificate of Incorporation",
    type: "pdf",
    size: "2.3 MB",
    uploaded: "2024-01-10",
    status: "verified"
  },
  {
    id: 2,
    name: "GST Certificate",
    type: "pdf",
    size: "1.8 MB",
    uploaded: "2024-01-12",
    status: "verified"
  },
  {
    id: 3,
    name: "Bank Account Details",
    type: "pdf",
    size: "1.2 MB",
    uploaded: "2024-01-15",
    status: "pending"
  }
];

export default function Compliance() {
  const [selectedStep, setSelectedStep] = useState(1);
  const [uploading, setUploading] = useState(false);

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

  const getReminderTypeColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "border-red-200 bg-red-50";
      case "important":
        return "border-orange-200 bg-orange-50";
      case "normal":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Business Setup & Compliance</h1>
        <p className="text-neutral-600">Track your business setup progress and stay compliant</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Setup Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                Setup Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedStep === step.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-neutral-200 hover:border-neutral-300"
                    }`}
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
                            <Button size="sm" className="flex items-center gap-2">
                              <Upload className="w-4 h-4" />
                              Upload Documents
                            </Button>
                            <Button size="sm" variant="outline" className="flex items-center gap-2">
                              <Download className="w-4 h-4" />
                              Download Templates
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
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Document Library
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-neutral-900">{doc.name}</h4>
                        <p className="text-sm text-neutral-600">{doc.size} • Uploaded {doc.uploaded}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.status === "verified" ? (
                        <Badge className="bg-green-100 text-green-800">Verified</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                      )}
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-600 mb-2">Upload new documents</p>
                  <Button variant="outline">Choose Files</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Compliance Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingReminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className={`p-4 rounded-lg border ${getReminderTypeColor(reminder.type)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-neutral-900">{reminder.title}</h4>
                      {reminder.type === "urgent" && (
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">{reminder.description}</p>
                    <p className="text-xs text-neutral-500">Due: {reminder.date}</p>
                  </div>
                ))}

                <Button className="w-full" variant="outline">
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
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Reminder
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Compliance Check
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
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Overall Progress</span>
                  <span className="text-lg font-semibold text-neutral-900">75%</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Completed</span>
                    <span className="text-green-600">2/4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">In Progress</span>
                    <span className="text-blue-600">1/4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Pending</span>
                    <span className="text-gray-600">1/4</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
