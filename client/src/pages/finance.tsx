import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  DollarSign,
  FileText,
  TrendingUp,
  TrendingDown,
  PieChart,
  CreditCard,
  Banknote,
  Receipt,
  Download,
  Plus,
  Eye,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Building2,
  Users,
  ShoppingCart,
  Wifi,
  Car
} from "lucide-react";

const invoices = [
  {
    id: "INV-001",
    client: "TechCorp Solutions",
    amount: 25000,
    status: "paid",
    dueDate: "2024-01-15",
    issueDate: "2024-01-01"
  },
  {
    id: "INV-002",
    client: "Digital Marketing Pro",
    amount: 15000,
    status: "pending",
    dueDate: "2024-01-20",
    issueDate: "2024-01-05"
  },
  {
    id: "INV-003",
    client: "StartupXYZ",
    amount: 35000,
    status: "overdue",
    dueDate: "2024-01-10",
    issueDate: "2023-12-20"
  },
  {
    id: "INV-004",
    client: "Innovation Labs",
    amount: 20000,
    status: "paid",
    dueDate: "2024-01-25",
    issueDate: "2024-01-10"
  }
];

const expenses = [
  { category: "Office Rent", amount: 15000, color: "#3B82F6", icon: Building2 },
  { category: "Employee Salaries", amount: 45000, color: "#10B981", icon: Users },
  { category: "Marketing", amount: 12000, color: "#F59E0B", icon: TrendingUp },
  { category: "Utilities", amount: 8000, color: "#EF4444", icon: Wifi },
  { category: "Transportation", amount: 5000, color: "#8B5CF6", icon: Car },
  { category: "Supplies", amount: 3000, color: "#06B6D4", icon: ShoppingCart }
];

const taxSummary = {
  currentQuarter: {
    gst: 45000,
    tds: 12000,
    incomeTax: 25000
  },
  previousQuarter: {
    gst: 42000,
    tds: 11000,
    incomeTax: 23000
  }
};

const bankAccounts = [
  {
    name: "HDFC Business Account",
    accountNumber: "****1234",
    balance: 125000,
    type: "Current Account"
  },
  {
    name: "ICICI Savings",
    accountNumber: "****5678",
    balance: 45000,
    type: "Savings Account"
  }
];

export default function Finance() {
  const [selectedPeriod, setSelectedPeriod] = useState("current");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "overdue":
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalInvoices = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === "paid").reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Finance & Accounting</h1>
        <p className="text-neutral-600">Manage your business finances, invoices, and expenses</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-neutral-900">₹{totalInvoices.toLocaleString()}</p>
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
                <p className="text-sm text-neutral-600 mb-1">Total Expenses</p>
                <p className="text-2xl font-bold text-neutral-900">₹{totalExpenses.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Net Profit</p>
                <p className="text-2xl font-bold text-neutral-900">₹{(totalInvoices - totalExpenses).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Pending Invoices</p>
                <p className="text-2xl font-bold text-neutral-900">₹{(totalInvoices - paidInvoices).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Invoice List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Invoice List
                </CardTitle>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create Invoice
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(invoice.status)}
                      <div>
                        <h4 className="font-medium text-neutral-900">{invoice.id}</h4>
                        <p className="text-sm text-neutral-600">{invoice.client}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-neutral-900">₹{invoice.amount.toLocaleString()}</p>
                        <p className="text-sm text-neutral-600">Due: {invoice.dueDate}</p>
                      </div>
                      {getStatusBadge(invoice.status)}
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expense Tracker */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Expense Tracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pie Chart Placeholder */}
                <div className="flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-neutral-900">₹{totalExpenses.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Expense Categories */}
                <div className="space-y-3">
                  {expenses.map((expense, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: expense.color }}
                        ></div>
                        <div className="flex items-center gap-2">
                          <expense.icon className="w-4 h-4 text-neutral-600" />
                          <span className="text-sm font-medium text-neutral-900">{expense.category}</span>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-neutral-900">₹{expense.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tax Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5" />
                Tax Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">GST</span>
                  <span className="font-semibold text-neutral-900">₹{taxSummary.currentQuarter.gst.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">TDS</span>
                  <span className="font-semibold text-neutral-900">₹{taxSummary.currentQuarter.tds.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Income Tax</span>
                  <span className="font-semibold text-neutral-900">₹{taxSummary.currentQuarter.incomeTax.toLocaleString()}</span>
                </div>
                <hr className="border-neutral-200" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-900">Total Tax</span>
                  <span className="text-lg font-bold text-neutral-900">
                    ₹{(taxSummary.currentQuarter.gst + taxSummary.currentQuarter.tds + taxSummary.currentQuarter.incomeTax).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bank Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Bank Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bankAccounts.map((account, index) => (
                  <div key={index} className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-neutral-900">{account.name}</h4>
                      <Badge className="bg-blue-100 text-blue-800">{account.type}</Badge>
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">****{account.accountNumber}</p>
                    <p className="text-lg font-semibold text-neutral-900">₹{account.balance.toLocaleString()}</p>
                  </div>
                ))}

                <Button className="w-full" variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Connect Bank Account
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
                  <Plus className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Receipt className="w-4 h-4 mr-2" />
                  Record Expense
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Tax Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
