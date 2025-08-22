import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { authService } from "@/lib/auth";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
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
  Car,
  X,
  Save,
  Edit,
  Trash2,
  Filter,
  Search,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  BarChart3,
  Target,
  ImageIcon,
  Crown,
  User,
  Calculator,
  Package
} from "lucide-react";

interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  issueDate: string;
  description?: string;
  items?: InvoiceItem[];
  designData?: {
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    companyEmail: string;
    terms: string;
  };
}

interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

interface Expense {
  id: string;
  category: string;
  amount: number;
  color: string;
  icon: any;
  date: string;
  description: string;
  paymentMethod: string;
}

interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  type: string;
  bankName: string;
  lastSync?: string;
}

const defaultInvoices: Invoice[] = [
  {
    id: "INV-001",
    client: "TechCorp Solutions",
    amount: 25000,
    status: "paid",
    dueDate: "2024-01-15",
    issueDate: "2024-01-01",
    description: "Web Development Services",
    items: [
      { description: "Frontend Development", quantity: 1, rate: 15000, amount: 15000 },
      { description: "Backend API", quantity: 1, rate: 10000, amount: 10000 }
    ],
    designData: {
      companyName: "BizFlow Solutions",
      companyAddress: "123 Business Street, Tech City, TC 12345",
      companyPhone: "+1 (555) 123-4567",
      companyEmail: "info@bizflow.com",
      terms: "Payment is due within 30 days of invoice date."
    }
  },
  {
    id: "INV-002",
    client: "Digital Marketing Pro",
    amount: 15000,
    status: "pending",
    dueDate: "2024-01-20",
    issueDate: "2024-01-05",
    description: "SEO and Content Marketing",
    items: [
      { description: "SEO Optimization", quantity: 1, rate: 8000, amount: 8000 },
      { description: "Content Creation", quantity: 1, rate: 7000, amount: 7000 }
    ],
    designData: {
      companyName: "BizFlow Solutions",
      companyAddress: "123 Business Street, Tech City, TC 12345",
      companyPhone: "+1 (555) 123-4567",
      companyEmail: "info@bizflow.com",
      terms: "Payment is due within 30 days of invoice date."
    }
  },
  {
    id: "INV-003",
    client: "StartupXYZ",
    amount: 35000,
    status: "overdue",
    dueDate: "2024-01-10",
    issueDate: "2023-12-20",
    description: "Mobile App Development",
    items: [
      { description: "iOS App Development", quantity: 1, rate: 20000, amount: 20000 },
      { description: "Android App Development", quantity: 1, rate: 15000, amount: 15000 }
    ],
    designData: {
      companyName: "BizFlow Solutions",
      companyAddress: "123 Business Street, Tech City, TC 12345",
      companyPhone: "+1 (555) 123-4567",
      companyEmail: "info@bizflow.com",
      terms: "Payment is due within 30 days of invoice date."
    }
  },
  {
    id: "INV-004",
    client: "Innovation Labs",
    amount: 20000,
    status: "paid",
    dueDate: "2024-01-25",
    issueDate: "2024-01-10",
    description: "UI/UX Design Services",
    items: [
      { description: "User Interface Design", quantity: 1, rate: 12000, amount: 12000 },
      { description: "User Experience Design", quantity: 1, rate: 8000, amount: 8000 }
    ],
    designData: {
      companyName: "BizFlow Solutions",
      companyAddress: "123 Business Street, Tech City, TC 12345",
      companyPhone: "+1 (555) 123-4567",
      companyEmail: "info@bizflow.com",
      terms: "Payment is due within 30 days of invoice date."
    }
  }
];

const defaultExpenses: Expense[] = [
  { id: "1", category: "Office Rent", amount: 15000, color: "#3B82F6", icon: Building2, date: "2024-01-15", description: "Monthly office rent payment", paymentMethod: "Bank Transfer" },
  { id: "2", category: "Employee Salaries", amount: 45000, color: "#10B981", icon: Users, date: "2024-01-01", description: "January 2024 salary payments", paymentMethod: "Bank Transfer" },
  { id: "3", category: "Marketing", amount: 12000, color: "#F59E0B", icon: TrendingUp, date: "2024-01-10", description: "Digital marketing campaign", paymentMethod: "Credit Card" },
  { id: "4", category: "Utilities", amount: 8000, color: "#EF4444", icon: Wifi, date: "2024-01-05", description: "Electricity, internet, and phone bills", paymentMethod: "Auto Debit" },
  { id: "5", category: "Transportation", amount: 5000, color: "#8B5CF6", icon: Car, date: "2024-01-12", description: "Fuel and maintenance costs", paymentMethod: "Cash" },
  { id: "6", category: "Supplies", amount: 3000, color: "#06B6D4", icon: ShoppingCart, date: "2024-01-08", description: "Office supplies and equipment", paymentMethod: "Credit Card" }
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

const defaultBankAccounts: BankAccount[] = [
  {
    id: "1",
    name: "HDFC Business Account",
    accountNumber: "****1234",
    balance: 125000,
    type: "Current Account",
    bankName: "HDFC Bank",
    lastSync: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "ICICI Savings",
    accountNumber: "****5678",
    balance: 45000,
    type: "Savings Account",
    bankName: "ICICI Bank",
    lastSync: "2024-01-15T09:15:00Z"
  }
];

export default function Finance() {
  const user = authService.getUser();
  const isTier1Or2 = user && (user.role === 'admin' || user.role === 'tier2');

  // State management
  const [invoices, setInvoices] = useState<Invoice[]>(defaultInvoices);
  const [expenses, setExpenses] = useState<Expense[]>(defaultExpenses);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(defaultBankAccounts);
  const [selectedPeriod, setSelectedPeriod] = useState("current");

  // Modal states
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showInvoiceDetailModal, setShowInvoiceDetailModal] = useState(false);
  const [showInvoiceDesigner, setShowInvoiceDesigner] = useState(false);
  const [showInvoiceSuccessModal, setShowInvoiceSuccessModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [lastCreatedInvoice, setLastCreatedInvoice] = useState<Invoice | null>(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    // Load invoices
    const storedInvoices = localStorage.getItem('bizflow_invoices');
    if (storedInvoices) {
      try {
        const parsedInvoices = JSON.parse(storedInvoices);
        setInvoices(parsedInvoices);
      } catch (error) {
        console.error('Error loading invoices from localStorage:', error);
      }
    }

    // Load expenses
    const storedExpenses = localStorage.getItem('bizflow_expenses');
    if (storedExpenses) {
      try {
        const parsedExpenses = JSON.parse(storedExpenses);
        setExpenses(parsedExpenses);
      } catch (error) {
        console.error('Error loading expenses from localStorage:', error);
      }
    }

    // Load bank accounts
    const storedBankAccounts = localStorage.getItem('bizflow_bank_accounts');
    if (storedBankAccounts) {
      try {
        const parsedBankAccounts = JSON.parse(storedBankAccounts);
        setBankAccounts(parsedBankAccounts);
      } catch (error) {
        console.error('Error loading bank accounts from localStorage:', error);
      }
    }
  }, []);

  // Form states
  const [invoiceForm, setInvoiceForm] = useState({
    client: '',
    description: '',
    amount: '',
    dueDate: '',
    items: [{ description: '', quantity: 1, rate: '', amount: 0 }]
  });

  const [expenseForm, setExpenseForm] = useState({
    category: '',
    amount: '',
    description: '',
    date: '',
    paymentMethod: ''
  });

  const [bankForm, setBankForm] = useState({
    bankName: '',
    accountNumber: '',
    accountType: '',
    accountName: ''
  });

  // Invoice Designer state
  const [invoiceDesign, setInvoiceDesign] = useState({
    companyName: 'BizFlow Solutions',
    companyAddress: '123 Business Street, Tech City, TC 12345',
    companyPhone: '+1 (555) 123-4567',
    companyEmail: 'info@bizflow.com',
    companyLogo: '',
    headerText: 'Professional Business Solutions',
    footerText: 'Thank you for your business!',
    headerImage: '',
    footerImage: '',
    invoiceNumber: 'INV-001',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clientName: 'Sample Client',
    clientAddress: '123 Client Street, Client City, CC 12345',
    clientEmail: 'client@example.com',
    clientPhone: '+1 (555) 987-6543',
    items: [{ description: 'Sample Item', quantity: 1, rate: 100, amount: 100 }],
    subtotal: 100,
    taxRate: 18,
    taxAmount: 18,
    total: 118,
    notes: 'Sample invoice notes',
    terms: 'Payment is due within 30 days of invoice date.',
    template: 'modern',
    headerColor: '#1f2937',
    footerColor: '#6b7280',
    accentColor: '#3b82f6'
  });

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

  // Calculations
  const totalExpenses = expenses.reduce((sum: number, expense: Expense) => sum + expense.amount, 0);
  const totalInvoices = invoices.reduce((sum: number, invoice: Invoice) => sum + invoice.amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === "paid").reduce((sum: number, invoice: Invoice) => sum + invoice.amount, 0);

  // Functions
  const handleCreateInvoice = () => {
    setInvoiceForm({
      client: '',
      description: '',
      amount: '',
      dueDate: '',
      items: [{ description: '', quantity: 1, rate: '', amount: 0 }]
    });
    setShowInvoiceModal(true);
  };

    const handleSaveInvoice = () => {
    if (!invoiceForm.client || !invoiceForm.amount || !invoiceForm.dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    const newInvoice: Invoice = {
      id: `INV-${Date.now()}`,
      client: invoiceForm.client,
      amount: parseFloat(invoiceForm.amount),
      status: 'pending',
      dueDate: invoiceForm.dueDate,
      issueDate: new Date().toISOString().split('T')[0],
      description: invoiceForm.description,
      items: invoiceForm.items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        rate: parseFloat(item.rate || '0'),
        amount: item.quantity * parseFloat(item.rate || '0')
      }))
    };

    setInvoices(prev => [newInvoice, ...prev]);
    setLastCreatedInvoice(newInvoice);
    setShowInvoiceModal(false);
    setShowInvoiceSuccessModal(true);

    // Store in localStorage for persistence
    const storedInvoices = JSON.parse(localStorage.getItem('bizflow_invoices') || '[]');
    storedInvoices.unshift(newInvoice);
    localStorage.setItem('bizflow_invoices', JSON.stringify(storedInvoices));
  };

  const handleRecordExpense = () => {
    setExpenseForm({
      category: '',
      amount: '',
      description: '',
      date: '',
      paymentMethod: ''
    });
    setShowExpenseModal(true);
  };

  const handleSaveExpense = () => {
    if (!expenseForm.category || !expenseForm.amount || !expenseForm.date) {
      alert('Please fill in all required fields');
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      category: expenseForm.category,
      amount: parseFloat(expenseForm.amount),
      color: getCategoryColor(expenseForm.category),
      icon: getCategoryIcon(expenseForm.category),
      date: expenseForm.date,
      description: expenseForm.description,
      paymentMethod: expenseForm.paymentMethod
    };

    const updatedExpenses = [newExpense, ...expenses];
    setExpenses(updatedExpenses);
    localStorage.setItem('bizflow_expenses', JSON.stringify(updatedExpenses));
    setShowExpenseModal(false);
    alert('Expense recorded successfully!');
  };

  const handleConnectBank = () => {
    setBankForm({
      bankName: '',
      accountNumber: '',
      accountType: '',
      accountName: ''
    });
    setShowBankModal(true);
  };

  const handleSaveBankAccount = () => {
    if (!bankForm.bankName || !bankForm.accountNumber || !bankForm.accountType) {
      alert('Please fill in all required fields');
      return;
    }

    const newBankAccount: BankAccount = {
      id: Date.now().toString(),
      name: bankForm.accountName || `${bankForm.bankName} Account`,
      accountNumber: `****${bankForm.accountNumber.slice(-4)}`,
      balance: 0,
      type: bankForm.accountType,
      bankName: bankForm.bankName,
      lastSync: new Date().toISOString()
    };

    const updatedBankAccounts = [newBankAccount, ...bankAccounts];
    setBankAccounts(updatedBankAccounts);
    localStorage.setItem('bizflow_bank_accounts', JSON.stringify(updatedBankAccounts));
    setShowBankModal(false);
    alert('Bank account connected successfully!');
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowInvoiceDetailModal(true);
  };

  const handleDeleteInvoice = (invoiceId: string) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
      alert('Invoice deleted successfully!');
    }
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    setInvoices(prev =>
      prev.map(inv =>
        inv.id === invoiceId
          ? { ...inv, status: 'paid' as const }
          : inv
      )
    );
    alert('Invoice marked as paid!');
  };

  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      'Office Rent': '#3B82F6',
      'Employee Salaries': '#10B981',
      'Marketing': '#F59E0B',
      'Utilities': '#EF4444',
      'Transportation': '#8B5CF6',
      'Supplies': '#06B6D4',
      'default': '#6B7280'
    };
    return colors[category] || colors.default;
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      'Office Rent': Building2,
      'Employee Salaries': Users,
      'Marketing': TrendingUp,
      'Utilities': Wifi,
      'Transportation': Car,
      'Supplies': ShoppingCart,
      'default': Receipt
    };
    return icons[category] || icons.default;
  };

    const handleExportReport = () => {
    const report = {
      invoices,
      expenses,
      bankAccounts,
      summary: {
        totalRevenue: totalInvoices,
        totalExpenses,
        netProfit: totalInvoices - totalExpenses,
        pendingInvoices: totalInvoices - paidInvoices
      }
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `finance-report-${new Date().toISOString().split('T')[0]}.json`;
    window.document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    window.document.body.removeChild(a);
    alert('Report exported successfully!');
  };

  // Test PDF Generation
  const testPDF = () => {
    try {
      console.log('=== Testing PDF Generation ===');
      console.log('jsPDF available:', typeof jsPDF !== 'undefined');

      if (typeof jsPDF === 'undefined') {
        console.error('jsPDF is not available');
        return;
      }

      const testDoc = new jsPDF();
      testDoc.text('Test PDF', 20, 20);

      try {
        testDoc.save('test.pdf');
        console.log('Test PDF saved successfully!');
        alert('Test PDF generated successfully! Check your downloads folder.');
      } catch (error) {
        console.error('Test PDF save failed:', error);
        alert('Test PDF generation failed. Check console for details.');
      }
    } catch (error) {
      console.error('Test PDF generation error:', error);
      alert('Test PDF generation error. Check console for details.');
    }
  };

  // PDF Generation Functions
  const generatePDF = (invoice: Invoice) => {
    try {
      console.log('=== PDF Generation Started ===');
      console.log('Invoice data:', invoice);
      console.log('invoiceDesign state:', invoiceDesign);
      console.log('jsPDF available:', typeof jsPDF !== 'undefined');
      console.log('jsPDF constructor:', jsPDF);

      if (typeof jsPDF === 'undefined') {
        throw new Error('jsPDF library not loaded');
      }

      const doc = new jsPDF();
      console.log('PDF document created successfully');

      // Add company header - use invoice design data if available, otherwise use defaults
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(invoice.designData?.companyName || invoiceDesign.companyName || 'BizFlow Solutions', 20, 30);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(invoice.designData?.companyAddress || invoiceDesign.companyAddress || '123 Business Street, Tech City, TC 12345', 20, 40);
      doc.text(`Phone: ${invoice.designData?.companyPhone || invoiceDesign.companyPhone || '+1 (555) 123-4567'}`, 20, 45);
      doc.text(`Email: ${invoice.designData?.companyEmail || invoiceDesign.companyEmail || 'info@bizflow.com'}`, 20, 50);

      // Add invoice details
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('INVOICE', 150, 30);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Invoice #: ${invoice.id}`, 150, 40);
      doc.text(`Issue Date: ${invoice.issueDate}`, 150, 45);
      doc.text(`Due Date: ${invoice.dueDate}`, 150, 50);

      // Add client information
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Bill To:', 20, 70);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(invoice.client, 20, 80);
      if (invoice.description) {
        doc.text(invoice.description, 20, 85);
      }

      // Add items table and totals
      let tableData: string[][] = [];
      let finalY = 100;

      try {
        console.log('Processing invoice items:', invoice.items);
        tableData = invoice.items?.map(item => [
          item.description || 'Item',
          item.quantity.toString(),
          `₹${item.rate.toLocaleString()}`,
          `₹${item.amount.toLocaleString()}`
        ]) || [];

        console.log('Table data prepared:', tableData);

        if (tableData.length > 0) {
          console.log('Adding autoTable to PDF...');
          (doc as any).autoTable({
            startY: 100,
            head: [['Description', 'Qty', 'Rate', 'Amount']],
            body: tableData,
            theme: 'grid',
            headStyles: { fillColor: [66, 139, 202] },
            styles: { fontSize: 10 }
          });
          console.log('autoTable added successfully');
          finalY = (doc as any).lastAutoTable.finalY + 10;
        } else {
          console.log('No items to add to table');
        }
      } catch (tableError) {
        console.error('Error adding items table:', tableError);
        // Continue without table if it fails
        doc.text('Items table could not be generated', 20, 100);
      }

      // Add totals
      try {
        console.log('Calculating final Y position...');
        console.log('Final Y position:', finalY);

        console.log('Adding totals to PDF...');
        doc.text(`Subtotal: ₹${invoice.amount.toLocaleString()}`, 150, finalY);
        doc.text(`Tax (18%): ₹${(Number(invoice.amount) * 0.18).toLocaleString()}`, 150, finalY + 10);
        doc.text(`Total: ₹${(Number(invoice.amount) * 1.18).toLocaleString()}`, 150, finalY + 20);
        console.log('Totals added successfully');
      } catch (totalsError) {
        console.error('Error adding totals:', totalsError);
        // Use fallback position
        const fallbackY = 100;
        doc.text(`Subtotal: ₹${invoice.amount.toLocaleString()}`, 150, fallbackY);
        doc.text(`Tax (18%): ₹${(Number(invoice.amount) * 0.18).toLocaleString()}`, 150, fallbackY + 10);
        doc.text(`Total: ₹${(Number(invoice.amount) * 1.18).toLocaleString()}`, 150, fallbackY + 20);
      }

      // Add footer
      doc.setFontSize(8);
      doc.text(invoice.designData?.terms || invoiceDesign.terms || 'Payment is due within 30 days of invoice date.', 20, finalY + 40);

      // Save the PDF with error handling
      try {
        console.log('Attempting to save PDF...');
        console.log('PDF filename:', `invoice-${invoice.id}.pdf`);

        // Try multiple save methods
        try {
          doc.save(`invoice-${invoice.id}.pdf`);
          console.log('PDF saved successfully using doc.save()!');
        } catch (saveError1) {
          console.log('doc.save() failed, trying alternative method...');
          console.error('Save error 1:', saveError1);

          // Alternative method 1: Create blob and download
          try {
            const pdfBlob = doc.output('blob');
            const url = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `invoice-${invoice.id}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            console.log('PDF saved successfully using blob method!');
          } catch (saveError2) {
            console.log('Blob method failed, trying data URI...');
            console.error('Save error 2:', saveError2);

            // Alternative method 2: Open in new window
            try {
              const pdfDataUri = doc.output('datauristring');
              const newWindow = window.open();
              if (newWindow) {
                newWindow.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
                console.log('PDF opened in new window successfully!');
              } else {
                throw new Error('Could not open new window');
              }
            } catch (saveError3) {
              console.error('All save methods failed:', saveError3);
              alert('PDF generated successfully but could not be downloaded. Please check your browser settings and try again.');
            }
          }
        }
      } catch (saveError) {
        console.error('Unexpected error during PDF save:', saveError);
        alert('Error saving PDF. Please try again.');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const generateDesignerPDF = () => {
    const doc = new jsPDF();

    // Add company header
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(invoiceDesign.companyName, 20, 30);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceDesign.companyAddress, 20, 40);
    doc.text(`Phone: ${invoiceDesign.companyPhone}`, 20, 45);
    doc.text(`Email: ${invoiceDesign.companyEmail}`, 20, 50);

    // Add invoice details
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 150, 30);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice #: ${invoiceDesign.invoiceNumber}`, 150, 40);
    doc.text(`Issue Date: ${invoiceDesign.issueDate}`, 150, 45);
    doc.text(`Due Date: ${invoiceDesign.dueDate}`, 150, 50);

    // Add client information
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 20, 70);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(invoiceDesign.clientName, 20, 80);
    doc.text(invoiceDesign.clientAddress, 20, 85);
    doc.text(`Email: ${invoiceDesign.clientEmail}`, 20, 90);
    doc.text(`Phone: ${invoiceDesign.clientPhone}`, 20, 95);

    // Add items table
    const tableData = invoiceDesign.items.map(item => [
      item.description,
      item.quantity.toString(),
      `₹${item.rate.toLocaleString()}`,
      `₹${item.amount.toLocaleString()}`
    ]);

    (doc as any).autoTable({
      startY: 110,
      head: [['Description', 'Qty', 'Rate', 'Amount']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [66, 139, 202] },
      styles: { fontSize: 10 }
    });

    // Add totals
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text(`Subtotal: ₹${invoiceDesign.subtotal.toLocaleString()}`, 150, finalY);
    doc.text(`Tax (${invoiceDesign.taxRate}%): ₹${invoiceDesign.taxAmount.toLocaleString()}`, 150, finalY + 10);
    doc.text(`Total: ₹${invoiceDesign.total.toLocaleString()}`, 150, finalY + 20);

    // Add notes and terms
    if (invoiceDesign.notes) {
      doc.text(`Notes: ${invoiceDesign.notes}`, 20, finalY + 40);
    }
    doc.setFontSize(8);
    doc.text(invoiceDesign.terms, 20, finalY + 50);

    // Save the PDF
    doc.save(`invoice-${invoiceDesign.invoiceNumber}.pdf`);
  };

  // Invoice Designer Functions
  const handleAddItem = () => {
    setInvoiceDesign(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
    }));
  };

  const handleRemoveItem = (index: number) => {
    setInvoiceDesign(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    setInvoiceDesign(prev => {
      const newItems = [...prev.items];

      // Handle rate field specifically
      if (field === 'rate') {
        newItems[index] = { ...newItems[index], [field]: Number(value) || 0 };
      } else {
        newItems[index] = { ...newItems[index], [field]: value };
      }

      // Calculate amounts
      if (field === 'quantity' || field === 'rate') {
        const quantity = field === 'quantity' ? Number(value) : newItems[index].quantity;
        const rate = field === 'rate' ? Number(value) : newItems[index].rate;
        newItems[index].amount = quantity * rate;
      }

      // Calculate totals
      const subtotal = newItems.reduce((sum, item) => sum + (item.amount || 0), 0);
      const taxAmount = subtotal * (Number(prev.taxRate) / 100);
      const total = subtotal + taxAmount;

      return {
        ...prev,
        items: newItems,
        subtotal,
        taxAmount,
        total
      };
    });
  };

  const handleSaveDesignerInvoice = () => {
    console.log('=== handleSaveDesignerInvoice START ===');
    console.log('Function called successfully');
    console.log('Current invoiceDesign state:', invoiceDesign);
    console.log('Required fields check:');
    console.log('- clientName:', invoiceDesign.clientName, '| Valid:', !!invoiceDesign.clientName);
    console.log('- invoiceNumber:', invoiceDesign.invoiceNumber, '| Valid:', !!invoiceDesign.invoiceNumber);
    console.log('- dueDate:', invoiceDesign.dueDate, '| Valid:', !!invoiceDesign.dueDate);

    if (!invoiceDesign.clientName || !invoiceDesign.invoiceNumber || !invoiceDesign.dueDate) {
      console.log('❌ VALIDATION FAILED - Missing required fields');
      console.log('Validation details:', {
        clientName: invoiceDesign.clientName,
        invoiceNumber: invoiceDesign.invoiceNumber,
        dueDate: invoiceDesign.dueDate
      });
      alert('Please fill in all required fields');
      return;
    }

    const newInvoice: Invoice = {
      id: invoiceDesign.invoiceNumber,
      client: invoiceDesign.clientName,
      amount: invoiceDesign.total,
      status: 'pending',
      dueDate: invoiceDesign.dueDate,
      issueDate: invoiceDesign.issueDate,
      description: invoiceDesign.notes,
      items: invoiceDesign.items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.rate,
        amount: item.amount
      })),
      // Store design data for PDF generation
      designData: {
        companyName: invoiceDesign.companyName,
        companyAddress: invoiceDesign.companyAddress,
        companyPhone: invoiceDesign.companyPhone,
        companyEmail: invoiceDesign.companyEmail,
        terms: invoiceDesign.terms
      }
    };

    // Save to invoices state
    setInvoices(prev => [newInvoice, ...prev]);

    // Save to localStorage
    const updatedInvoices = [newInvoice, ...invoices];
    localStorage.setItem('bizflow_invoices', JSON.stringify(updatedInvoices));

    // Close the modal
    setShowInvoiceModal(false);

    // Show success modal
    setLastCreatedInvoice(newInvoice);
    setShowInvoiceSuccessModal(true);

    // Reset the form
    setInvoiceDesign({
      companyName: '',
      companyAddress: '',
      companyPhone: '',
      companyEmail: '',
      companyLogo: '',
      headerText: '',
      footerText: '',
      headerImage: '',
      footerImage: '',
      invoiceNumber: '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      clientName: '',
      clientAddress: '',
      clientEmail: '',
      clientPhone: '',
      items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
      subtotal: 0,
      taxRate: 18,
      taxAmount: 0,
      total: 0,
      notes: '',
      terms: '',
      template: 'modern',
      headerColor: '#1f2937',
      footerColor: '#6b7280',
      accentColor: '#3b82f6'
    });
  };

  // Image upload functions
  const handleImageUpload = (field: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setInvoiceDesign(prev => ({ ...prev, [field]: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (field: string) => {
    setInvoiceDesign(prev => ({ ...prev, [field]: '' }));
  };

  // Excel Export Functions
  const exportInvoiceToExcel = (invoice: Invoice) => {
    const workbook = XLSX.utils.book_new();

    // Invoice Details Sheet
    const invoiceDetails = [
      ['Invoice Details'],
      ['Invoice ID', invoice.id],
      ['Client', invoice.client],
      ['Amount', `₹${invoice.amount.toLocaleString()}`],
      ['Status', invoice.status],
      ['Issue Date', invoice.issueDate],
      ['Due Date', invoice.dueDate],
      ['Description', invoice.description || ''],
      [],
      ['Invoice Items'],
      ['Description', 'Quantity', 'Rate (₹)', 'Amount (₹)']
    ];

    // Add items
    if (invoice.items && invoice.items.length > 0) {
              invoice.items.forEach(item => {
          invoiceDetails.push([
            item.description,
            item.quantity.toString(),
            item.rate.toString(),
            item.amount.toLocaleString()
          ]);
        });
    }

    // Add totals
    invoiceDetails.push([], ['Subtotal', '', '', `₹${invoice.amount.toLocaleString()}`]);
    invoiceDetails.push(['Tax (18%)', '', '', `₹${(invoice.amount * 0.18).toLocaleString()}`]);
    invoiceDetails.push(['Total', '', '', `₹${(invoice.amount * 1.18).toLocaleString()}`]);

    const worksheet = XLSX.utils.aoa_to_sheet(invoiceDetails);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoice');

    // Save the file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, `invoice-${invoice.id}.xlsx`);
  };

  const exportAllInvoicesToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Summary Sheet
    const summaryData = [
      ['Invoices Summary'],
      ['Total Invoices', invoices.length],
      ['Total Revenue', `₹${totalInvoices.toLocaleString()}`],
      ['Paid Invoices', invoices.filter(inv => inv.status === 'paid').length],
      ['Pending Invoices', invoices.filter(inv => inv.status === 'pending').length],
      ['Overdue Invoices', invoices.filter(inv => inv.status === 'overdue').length],
      [],
      ['Invoice List'],
      ['ID', 'Client', 'Amount', 'Status', 'Issue Date', 'Due Date', 'Description']
    ];

    invoices.forEach(invoice => {
      summaryData.push([
        invoice.id,
        invoice.client,
        `₹${invoice.amount.toLocaleString()}`,
        invoice.status,
        invoice.issueDate,
        invoice.dueDate,
        invoice.description || ''
      ]);
    });

    const summaryWorksheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summaryWorksheet, 'Summary');

    // Individual Invoice Sheets
    invoices.forEach(invoice => {
      const invoiceData = [
        ['Invoice Details'],
        ['Invoice ID', invoice.id],
        ['Client', invoice.client],
        ['Amount', `₹${invoice.amount.toLocaleString()}`],
        ['Status', invoice.status],
        ['Issue Date', invoice.issueDate],
        ['Due Date', invoice.dueDate],
        ['Description', invoice.description || ''],
        [],
        ['Invoice Items'],
        ['Description', 'Quantity', 'Rate (₹)', 'Amount (₹)']
      ];

      if (invoice.items && invoice.items.length > 0) {
        invoice.items.forEach(item => {
          invoiceData.push([
            item.description,
            item.quantity.toString(),
            item.rate.toString(),
            item.amount.toLocaleString()
          ]);
        });
      }

      invoiceData.push([], ['Subtotal', '', '', `₹${invoice.amount.toLocaleString()}`]);
      invoiceData.push(['Tax (18%)', '', '', `₹${(invoice.amount * 0.18).toLocaleString()}`]);
      invoiceData.push(['Total', '', '', `₹${(invoice.amount * 1.18).toLocaleString()}`]);

      const invoiceWorksheet = XLSX.utils.aoa_to_sheet(invoiceData);
      XLSX.utils.book_append_sheet(workbook, invoiceWorksheet, `Invoice-${invoice.id}`);
    });

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(data, `all-invoices-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

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
                <Button className="flex items-center gap-2" onClick={handleCreateInvoice}>
                  <Plus className="w-4 h-4" />
                  Create Invoice
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search and Export */}
              <div className="mb-4 flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search invoices by client, ID, or description..."
                    className="pl-10"
                    onChange={(e) => {
                      const searchTerm = e.target.value.toLowerCase();
                      if (searchTerm === '') {
                        // Load all invoices from localStorage
                        const storedInvoices = localStorage.getItem('bizflow_invoices');
                        if (storedInvoices) {
                          try {
                            const parsedInvoices = JSON.parse(storedInvoices);
                            setInvoices(parsedInvoices);
                          } catch (error) {
                            console.error('Error loading invoices from localStorage:', error);
                          }
                        }
                      } else {
                        // Filter invoices
                        const storedInvoices = JSON.parse(localStorage.getItem('bizflow_invoices') || '[]');
                        const filtered = storedInvoices.filter((invoice: Invoice) =>
                          invoice.client.toLowerCase().includes(searchTerm) ||
                          invoice.id.toLowerCase().includes(searchTerm) ||
                          (invoice.description && invoice.description.toLowerCase().includes(searchTerm))
                        );
                        setInvoices(filtered);
                      }
                    }}
                  />
                </div>
                <Button onClick={exportAllInvoicesToExcel} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </Button>
                <Button onClick={testPDF} variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                  <Download className="w-4 h-4 mr-2" />
                  Test PDF
                </Button>
              </div>

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
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewInvoice(invoice)}
                        >
                        <Eye className="w-4 h-4" />
                      </Button>
                        {invoice.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkAsPaid(invoice.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteInvoice(invoice.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                      </Button>
                      </div>
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

                <Button className="w-full" variant="outline" onClick={handleConnectBank}>
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
                <Button className="w-full justify-start" variant="outline" onClick={handleCreateInvoice}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
                {isTier1Or2 ? (
                  <Button className="w-full justify-start" variant="outline" onClick={() => setShowInvoiceDesigner(true)}>
                    <FileText className="w-4 h-4 mr-2" />
                    Invoice Designer
                  </Button>
                ) : (
                  <div className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Crown className="w-4 h-4" />
                      <span>Invoice Designer available for Tier 1 & 2 users</span>
                    </div>
                  </div>
                )}
                <Button className="w-full justify-start" variant="outline" onClick={handleRecordExpense}>
                  <Receipt className="w-4 h-4 mr-2" />
                  Record Expense
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={handleExportReport}>
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

      {/* Invoice Modal - Now uses WYSIWYG Designer */}
      <AnimatePresence>
        {showInvoiceModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowInvoiceModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Create New Invoice - WYSIWYG Designer</h3>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-600">
                    <div>Client: <span className="font-medium">{invoiceDesign.clientName || 'Not set'}</span></div>
                    <div>Invoice #: <span className="font-medium">{invoiceDesign.invoiceNumber || 'Not set'}</span></div>
                    <div>Due Date: <span className="font-medium">{invoiceDesign.dueDate || 'Not set'}</span></div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowInvoiceModal(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* WYSIWYG Invoice Designer - Looks exactly like the final invoice */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-8 max-w-4xl mx-auto shadow-lg">
                {/* Company Header Section */}
                <div className="flex justify-between items-start mb-8">
                  {/* Company Info - Left Side */}
                  <div className="flex-1">
                    <div className="mb-4">
                      <Input
                        value={invoiceDesign.companyName}
                        onChange={(e) => setInvoiceDesign(prev => ({ ...prev, companyName: e.target.value }))}
                        className="text-2xl font-bold text-gray-900 border-0 bg-transparent p-0 focus:ring-0 focus:border-b-2 focus:border-blue-500"
                        placeholder="Your Company Name"
                      />
                    </div>
                    <div className="mb-2">
                      <Textarea
                        value={invoiceDesign.companyAddress}
                        onChange={(e) => setInvoiceDesign(prev => ({ ...prev, companyAddress: e.target.value }))}
                        className="text-sm text-gray-600 border-0 bg-transparent p-0 resize-none focus:ring-0 focus:border-b-2 focus:border-blue-500"
                        placeholder="123 Business Street, City, State, ZIP"
                        rows={2}
                      />
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>
                        <span className="font-medium">Phone:</span>
                        <Input
                          value={invoiceDesign.companyPhone}
                          onChange={(e) => setInvoiceDesign(prev => ({ ...prev, companyPhone: e.target.value }))}
                          className="ml-2 border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>
                        <Input
                          value={invoiceDesign.companyEmail}
                          onChange={(e) => setInvoiceDesign(prev => ({ ...prev, companyEmail: e.target.value }))}
                          className="ml-2 border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                          placeholder="info@company.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Invoice Title and Details - Right Side */}
                  <div className="text-right">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">INVOICE</h1>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Invoice #:</span>
                        <Input
                          value={invoiceDesign.invoiceNumber}
                          onChange={(e) => setInvoiceDesign(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                          className="ml-2 border-0 bg-transparent p-0 text-sm font-mono focus:ring-0 focus:border-b-2 focus:border-blue-500"
                          placeholder="INV-001"
                        />
                      </div>
                      <div>
                        <span className="font-medium">Issue Date:</span>
                        <Input
                          type="date"
                          value={invoiceDesign.issueDate}
                          onChange={(e) => setInvoiceDesign(prev => ({ ...prev, issueDate: e.target.value }))}
                          className="ml-2 border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <span className="font-medium">Due Date:</span>
                        <Input
                          type="date"
                          value={invoiceDesign.dueDate}
                          onChange={(e) => setInvoiceDesign(prev => ({ ...prev, dueDate: e.target.value }))}
                          className="ml-2 border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Information Section */}
                <div className="mb-8">
                  <h2 className="text-lg font-bold text-gray-800 mb-3">Bill To:</h2>
                  <div className="pl-4">
                    <div className="mb-2">
                      <Input
                        value={invoiceDesign.clientName}
                        onChange={(e) => setInvoiceDesign(prev => ({ ...prev, clientName: e.target.value }))}
                        className="text-lg font-semibold text-gray-900 border-0 bg-transparent p-0 focus:ring-0 focus:border-b-2 focus:border-blue-500"
                        placeholder="Client or Company Name"
                      />
                    </div>
                    <div className="mb-2">
                      <Textarea
                        value={invoiceDesign.clientAddress}
                        onChange={(e) => setInvoiceDesign(prev => ({ ...prev, clientAddress: e.target.value }))}
                        className="text-sm text-gray-600 border-0 bg-transparent p-0 resize-none focus:ring-0 focus:border-b-2 focus:border-blue-500"
                        placeholder="Client's billing address"
                        rows={2}
                      />
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>
                        <span className="font-medium">Email:</span>
                        <Input
                          value={invoiceDesign.clientEmail}
                          onChange={(e) => setInvoiceDesign(prev => ({ ...prev, clientEmail: e.target.value }))}
                          className="ml-2 border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                          placeholder="client@email.com"
                        />
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span>
                        <Input
                          value={invoiceDesign.clientPhone}
                          onChange={(e) => setInvoiceDesign(prev => ({ ...prev, clientPhone: e.target.value }))}
                          className="ml-2 border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                          placeholder="+1 (555) 987-6543"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Invoice Items Table */}
                <div className="mb-8">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left py-3 px-4 font-bold text-gray-800">Description</th>
                        <th className="text-center py-3 px-4 font-bold text-gray-800">Quantity</th>
                        <th className="text-center py-3 px-4 font-bold text-gray-800">Rate (₹)</th>
                        <th className="text-right py-3 px-4 font-bold text-gray-800">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceDesign.items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="py-3 px-4">
                            <Input
                              value={item.description}
                              onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                              className="w-full border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                              placeholder="Item description"
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                              min="1"
                              className="w-20 text-center border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Input
                              type="number"
                              value={item.rate}
                              onChange={(e) => handleItemChange(index, 'rate', Number(e.target.value) || 0)}
                              placeholder="0.00"
                              className="w-24 text-center border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                            />
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-gray-900">
                            ₹{item.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Add Item Button */}
                  <div className="mt-4">
                    <Button onClick={handleAddItem} size="sm" variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </div>

                {/* Totals Section */}
                <div className="flex justify-end mb-8">
                  <div className="w-80 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">₹{invoiceDesign.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax ({invoiceDesign.taxRate}%):</span>
                      <span className="font-medium">₹{invoiceDesign.taxAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-3 text-blue-600">
                      <span>Total:</span>
                      <span>₹{invoiceDesign.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Notes and Terms */}
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-800">Notes:</span>
                    <Textarea
                      value={invoiceDesign.notes}
                      onChange={(e) => setInvoiceDesign(prev => ({ ...prev, notes: e.target.value }))}
                      className="ml-2 border-0 bg-transparent p-0 text-sm text-gray-600 resize-none focus:ring-0 focus:border-b-2 focus:border-blue-500"
                      placeholder="Additional notes..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <span className="font-medium text-gray-800">Terms & Conditions:</span>
                    <Textarea
                      value={invoiceDesign.terms}
                      onChange={(e) => setInvoiceDesign(prev => ({ ...prev, terms: e.target.value }))}
                      className="ml-2 border-0 bg-transparent p-0 text-sm text-gray-600 resize-none focus:ring-0 focus:border-b-2 focus:border-blue-500"
                      placeholder="Payment terms and conditions..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('🎯 CREATE INVOICE BUTTON CLICKED!');
                    console.log('Event:', e);
                    console.log('Button element:', e.currentTarget);
                    console.log('Current invoiceDesign state:', invoiceDesign);
                    console.log('About to call handleSaveDesignerInvoice...');
                    handleSaveDesignerInvoice();
                    console.log('handleSaveDesignerInvoice call completed');
                  }}
                  className="flex-1"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Create Invoice
                </Button>
                <Button variant="outline" onClick={() => setShowInvoiceModal(false)}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expense Modal */}
      <AnimatePresence>
        {showExpenseModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowExpenseModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Record New Expense</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExpenseModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={expenseForm.category} onValueChange={(value) => setExpenseForm(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Office Rent">Office Rent</SelectItem>
                      <SelectItem value="Employee Salaries">Employee Salaries</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Transportation">Transportation</SelectItem>
                      <SelectItem value="Supplies">Supplies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="expenseAmount">Amount *</Label>
                  <Input
                    id="expenseAmount"
                    type="number"
                    value={expenseForm.amount}
                    onChange={(e) => setExpenseForm(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <Label htmlFor="expenseDescription">Description</Label>
                  <Textarea
                    id="expenseDescription"
                    value={expenseForm.description}
                    onChange={(e) => setExpenseForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter expense description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expenseDate">Date *</Label>
                    <Input
                      id="expenseDate"
                      type="date"
                      value={expenseForm.date}
                      onChange={(e) => setExpenseForm(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select value={expenseForm.paymentMethod} onValueChange={(value) => setExpenseForm(prev => ({ ...prev, paymentMethod: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                        <SelectItem value="Auto Debit">Auto Debit</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSaveExpense} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Record Expense
                  </Button>
                  <Button variant="outline" onClick={() => setShowExpenseModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bank Account Modal */}
      <AnimatePresence>
        {showBankModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowBankModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Connect Bank Account</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBankModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="bankName">Bank Name *</Label>
                  <Input
                    id="bankName"
                    value={bankForm.bankName}
                    onChange={(e) => setBankForm(prev => ({ ...prev, bankName: e.target.value }))}
                    placeholder="Enter bank name"
                  />
                </div>

                <div>
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    value={bankForm.accountNumber}
                    onChange={(e) => setBankForm(prev => ({ ...prev, accountNumber: e.target.value }))}
                    placeholder="Enter account number"
                  />
                </div>

                <div>
                  <Label htmlFor="accountType">Account Type *</Label>
                  <Select value={bankForm.accountType} onValueChange={(value) => setBankForm(prev => ({ ...prev, accountType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Savings Account">Savings Account</SelectItem>
                      <SelectItem value="Current Account">Current Account</SelectItem>
                      <SelectItem value="Business Account">Business Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="accountName">Account Name</Label>
                  <Input
                    id="accountName"
                    value={bankForm.accountName}
                    onChange={(e) => setBankForm(prev => ({ ...prev, accountName: e.target.value }))}
                    placeholder="Enter account name (optional)"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSaveBankAccount} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Connect Account
                  </Button>
                  <Button variant="outline" onClick={() => setShowBankModal(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invoice Detail Modal */}
      <AnimatePresence>
        {showInvoiceDetailModal && selectedInvoice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowInvoiceDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Invoice Details</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInvoiceDetailModal(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Invoice ID</h4>
                    <p className="text-gray-600">{selectedInvoice.id}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Status</h4>
                    {getStatusBadge(selectedInvoice.status)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Client</h4>
                    <p className="text-gray-600">{selectedInvoice.client}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Amount</h4>
                    <p className="text-gray-600">₹{selectedInvoice.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Issue Date</h4>
                    <p className="text-gray-600">{selectedInvoice.issueDate}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Due Date</h4>
                    <p className="text-gray-600">{selectedInvoice.dueDate}</p>
                  </div>
                </div>

                {selectedInvoice.description && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">{selectedInvoice.description}</p>
                  </div>
                )}

                {selectedInvoice.items && selectedInvoice.items.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Invoice Items</h4>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">Description</th>
                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-900">Qty</th>
                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-900">Rate</th>
                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-900">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedInvoice.items.map((item, index) => (
                            <tr key={index} className="border-t">
                              <td className="px-4 py-2 text-sm text-gray-600">{item.description}</td>
                              <td className="px-4 py-2 text-sm text-gray-600 text-right">{item.quantity}</td>
                              <td className="px-4 py-2 text-sm text-gray-600 text-right">₹{item.rate.toLocaleString()}</td>
                              <td className="px-4 py-2 text-sm text-gray-600 text-right">₹{item.amount.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowInvoiceDetailModal(false)}>
                    Close
                  </Button>
                  <Button variant="outline" onClick={() => generatePDF(selectedInvoice)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button variant="outline" onClick={() => exportInvoiceToExcel(selectedInvoice)}>
                    <FileText className="w-4 h-4 mr-2" />
                    Export Excel
                  </Button>
                  {selectedInvoice.status === 'pending' && (
                    <Button onClick={() => handleMarkAsPaid(selectedInvoice.id)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark as Paid
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
                 )}
       </AnimatePresence>

      {/* Invoice Designer Modal */}
      <AnimatePresence>
        {showInvoiceDesigner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowInvoiceDesigner(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Invoice Designer</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInvoiceDesigner(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <Tabs defaultValue="design" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="design">Design Invoice</TabsTrigger>
                  <TabsTrigger value="header">Header & Footer</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="design" className="space-y-6">
                  {/* WYSIWYG Invoice Designer - Looks exactly like the final invoice */}
                  <div className="bg-white border-2 border-gray-200 rounded-lg p-8 max-w-4xl mx-auto shadow-lg">
                    {/* Company Header Section */}
                    <div className="flex justify-between items-start mb-8">
                      {/* Company Info - Left Side */}
                      <div className="flex-1">
                        <div className="mb-4">
                          <Input
                            value={invoiceDesign.companyName}
                            onChange={(e) => setInvoiceDesign(prev => ({ ...prev, companyName: e.target.value }))}
                            className="text-2xl font-bold text-gray-900 border-0 bg-transparent p-0 focus:ring-0 focus:border-b-2 focus:border-blue-500"
                            placeholder="Your Company Name"
                          />
                        </div>
                        <div className="mb-2">
                          <Textarea
                            value={invoiceDesign.companyAddress}
                            onChange={(e) => setInvoiceDesign(prev => ({ ...prev, companyAddress: e.target.value }))}
                            className="text-sm text-gray-600 border-0 bg-transparent p-0 resize-none focus:ring-0 focus:border-b-2 focus:border-blue-500"
                            placeholder="123 Business Street, City, State, ZIP"
                            rows={2}
                          />
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>
                            <span className="font-medium">Phone:</span>
                            <Input
                              value={invoiceDesign.companyPhone}
                              onChange={(e) => setInvoiceDesign(prev => ({ ...prev, companyPhone: e.target.value }))}
                              className="ml-2 border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                          <div>
                            <span className="font-medium">Email:</span>
                            <Input
                              value={invoiceDesign.companyEmail}
                              onChange={(e) => setInvoiceDesign(prev => ({ ...prev, companyEmail: e.target.value }))}
                              className="ml-2 border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                              placeholder="info@company.com"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Invoice Title and Details - Right Side */}
                      <div className="text-right">
                        <h1 className="text-4xl font-bold text-gray-800 mb-6">INVOICE</h1>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">Invoice #:</span>
                            <Input
                              value={invoiceDesign.invoiceNumber}
                              onChange={(e) => setInvoiceDesign(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                              className="ml-2 border-0 bg-transparent p-0 text-sm font-mono focus:ring-0 focus:border-b-2 focus:border-blue-500"
                              placeholder="INV-001"
                            />
                          </div>
                          <div>
                            <span className="font-medium">Issue Date:</span>
                            <Input
                              type="date"
                              value={invoiceDesign.issueDate}
                              onChange={(e) => setInvoiceDesign(prev => ({ ...prev, issueDate: e.target.value }))}
                              className="ml-2 border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <span className="font-medium">Due Date:</span>
                            <Input
                              type="date"
                              value={invoiceDesign.dueDate}
                              onChange={(e) => setInvoiceDesign(prev => ({ ...prev, dueDate: e.target.value }))}
                              className="ml-2 border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Client Information Section */}
                    <div className="mb-8">
                      <h2 className="text-lg font-bold text-gray-800 mb-3">Bill To:</h2>
                      <div className="pl-4">
                        <div className="mb-2">
                          <Input
                            value={invoiceDesign.clientName}
                            onChange={(e) => setInvoiceDesign(prev => ({ ...prev, clientName: e.target.value }))}
                            className="text-lg font-semibold text-gray-900 border-0 bg-transparent p-0 focus:ring-0 focus:border-b-2 focus:border-blue-500"
                            placeholder="Client or Company Name"
                          />
                        </div>
                        <div className="mb-2">
                          <Textarea
                            value={invoiceDesign.clientAddress}
                            onChange={(e) => setInvoiceDesign(prev => ({ ...prev, clientAddress: e.target.value }))}
                            className="text-sm text-gray-600 border-0 bg-transparent p-0 resize-none focus:ring-0 focus:border-b-2 focus:border-blue-500"
                            placeholder="Client's billing address"
                            rows={2}
                          />
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>
                            <span className="font-medium">Email:</span>
                            <Input
                              value={invoiceDesign.clientEmail}
                              onChange={(e) => setInvoiceDesign(prev => ({ ...prev, clientEmail: e.target.value }))}
                              className="ml-2 border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                              placeholder="client@email.com"
                            />
                          </div>
                          <div>
                            <span className="font-medium">Phone:</span>
                            <Input
                              value={invoiceDesign.clientPhone}
                              onChange={(e) => setInvoiceDesign(prev => ({ ...prev, clientPhone: e.target.value }))}
                              className="ml-2 border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                              placeholder="+1 (555) 987-6543"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                  {/* Tax Rate Control */}
                  <div className="max-w-4xl mx-auto">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Calculator className="w-5 h-5" />
                          Tax Settings
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <Label htmlFor="taxRate" className="text-sm font-medium text-gray-700">Tax Rate (%)</Label>
                          <Input
                            id="taxRate"
                            type="number"
                            value={invoiceDesign.taxRate}
                            onChange={(e) => {
                              const newTaxRate = parseFloat(e.target.value) || 0;
                              setInvoiceDesign(prev => ({
                                ...prev,
                                taxRate: newTaxRate,
                                taxAmount: prev.subtotal * newTaxRate / 100,
                                total: prev.subtotal + (prev.subtotal * newTaxRate / 100)
                              }));
                            }}
                            placeholder="18"
                            className="w-32"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                    {/* Invoice Items Table */}
                    <div className="mb-8">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b-2 border-gray-300">
                            <th className="text-left py-3 px-4 font-bold text-gray-800">Description</th>
                            <th className="text-center py-3 px-4 font-bold text-gray-800">Quantity</th>
                            <th className="text-center py-3 px-4 font-bold text-gray-800">Rate (₹)</th>
                            <th className="text-right py-3 px-4 font-bold text-gray-800">Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceDesign.items.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200">
                              <td className="py-3 px-4">
                                <Input
                                  value={item.description}
                                  onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                                  className="w-full border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                                  placeholder="Item description"
                                />
                              </td>
                              <td className="py-3 px-4 text-center">
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                                  min="1"
                                  className="w-20 text-center border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                                />
                              </td>
                              <td className="py-3 px-4 text-center">
                                <Input
                                  type="number"
                                  value={item.rate}
                                  onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                                  placeholder="0.00"
                                  className="w-24 text-center border-0 bg-transparent p-0 text-sm focus:ring-0 focus:border-b-2 focus:border-blue-500"
                                />
                              </td>
                              <td className="py-3 px-4 text-right font-medium text-gray-900">
                                ₹{item.amount.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Add Item Button */}
                      <div className="mt-4">
                        <Button onClick={handleAddItem} size="sm" variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Item
                        </Button>
                      </div>
                    </div>

                    {/* Totals Section */}
                    <div className="flex justify-end mb-8">
                      <div className="w-80 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-medium">₹{invoiceDesign.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tax ({invoiceDesign.taxRate}%):</span>
                          <span className="font-medium">₹{invoiceDesign.taxAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t pt-3 text-blue-600">
                          <span>Total:</span>
                          <span>₹{invoiceDesign.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Notes and Terms */}
                    <div className="space-y-4">
                      <div>
                        <span className="font-medium text-gray-800">Notes:</span>
                        <Textarea
                          value={invoiceDesign.notes}
                          onChange={(e) => setInvoiceDesign(prev => ({ ...prev, notes: e.target.value }))}
                          className="ml-2 border-0 bg-transparent p-0 text-sm text-gray-600 resize-none focus:ring-0 focus:border-b-2 focus:border-blue-500"
                          placeholder="Additional notes..."
                          rows={2}
                        />
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Terms & Conditions:</span>
                        <Textarea
                          value={invoiceDesign.terms}
                          onChange={(e) => setInvoiceDesign(prev => ({ ...prev, terms: e.target.value }))}
                          className="ml-2 border-0 bg-transparent p-0 text-sm text-gray-600 resize-none focus:ring-0 focus:border-b-2 focus:border-blue-500"
                          placeholder="Payment terms and conditions..."
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="header" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Header Customization */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Header Customization</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="headerText">Header Text</Label>
                          <Input
                            id="headerText"
                            value={invoiceDesign.headerText}
                            onChange={(e) => setInvoiceDesign(prev => ({ ...prev, headerText: e.target.value }))}
                            placeholder="Enter header text..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="headerColor">Header Color</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="headerColor"
                              type="color"
                              value={invoiceDesign.headerColor}
                              onChange={(e) => setInvoiceDesign(prev => ({ ...prev, headerColor: e.target.value }))}
                              className="w-16 h-10"
                            />
                            <Input
                              value={invoiceDesign.headerColor}
                              onChange={(e) => setInvoiceDesign(prev => ({ ...prev, headerColor: e.target.value }))}
                              placeholder="#1f2937"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Company Logo</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            {invoiceDesign.companyLogo ? (
                              <div className="space-y-2">
                                <img
                                  src={invoiceDesign.companyLogo}
                                  alt="Company Logo"
                                  className="mx-auto max-h-20 max-w-full object-contain"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemoveImage('companyLogo')}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove Logo
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <ImageIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">Upload company logo</p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload('companyLogo', file);
                                  }}
                                  className="hidden"
                                  id="logo-upload"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => document.getElementById('logo-upload')?.click()}
                                  className="mt-2"
                                >
                                  <ImageIcon className="w-4 h-4 mr-2" />
                                  Upload Logo
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <Label>Header Image</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            {invoiceDesign.headerImage ? (
                              <div className="space-y-2">
                                <img
                                  src={invoiceDesign.headerImage}
                                  alt="Header Image"
                                  className="mx-auto max-h-20 max-w-full object-contain"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemoveImage('headerImage')}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove Image
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <ImageIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">Upload header image</p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload('headerImage', file);
                                  }}
                                  className="hidden"
                                  id="header-image-upload"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => document.getElementById('header-image-upload')?.click()}
                                  className="mt-2"
                                >
                                  <ImageIcon className="w-4 h-4 mr-2" />
                                  Upload Image
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Footer Customization */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Footer Customization</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="footerText">Footer Text</Label>
                          <Textarea
                            id="footerText"
                            value={invoiceDesign.footerText}
                            onChange={(e) => setInvoiceDesign(prev => ({ ...prev, footerText: e.target.value }))}
                            placeholder="Enter footer text..."
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="footerColor">Footer Color</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="footerColor"
                              type="color"
                              value={invoiceDesign.footerColor}
                              onChange={(e) => setInvoiceDesign(prev => ({ ...prev, footerColor: e.target.value }))}
                              className="w-16 h-10"
                            />
                            <Input
                              value={invoiceDesign.footerColor}
                              onChange={(e) => setInvoiceDesign(prev => ({ ...prev, footerColor: e.target.value }))}
                              placeholder="#6b7280"
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Footer Image</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            {invoiceDesign.footerImage ? (
                              <div className="space-y-2">
                                <img
                                  src={invoiceDesign.footerImage}
                                  alt="Footer Image"
                                  className="mx-auto max-h-20 max-w-full object-contain"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemoveImage('footerImage')}
                                  className="text-red-600"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove Image
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <ImageIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">Upload footer image</p>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleImageUpload('footerImage', file);
                                  }}
                                  className="hidden"
                                  id="footer-image-upload"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => document.getElementById('footer-image-upload')?.click()}
                                  className="mt-2"
                                >
                                  <ImageIcon className="w-4 h-4 mr-2" />
                                  Upload Image
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="accentColor">Accent Color</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="accentColor"
                              type="color"
                              value={invoiceDesign.accentColor}
                              onChange={(e) => setInvoiceDesign(prev => ({ ...prev, accentColor: e.target.value }))}
                              className="w-16 h-10"
                            />
                            <Input
                              value={invoiceDesign.accentColor}
                              onChange={(e) => setInvoiceDesign(prev => ({ ...prev, accentColor: e.target.value }))}
                              placeholder="#3b82f6"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-4">
                  <div className="border rounded-lg p-6 bg-white">
                    {/* Custom Header */}
                    {invoiceDesign.headerImage && (
                      <div className="mb-4 text-center">
                        <img
                          src={invoiceDesign.headerImage}
                          alt="Header"
                          className="mx-auto max-h-24 max-w-full object-contain"
                        />
                      </div>
                    )}

                    {invoiceDesign.headerText && (
                      <div className="mb-4 text-center">
                        <h3
                          className="text-lg font-semibold"
                          style={{ color: invoiceDesign.headerColor }}
                        >
                          {invoiceDesign.headerText}
                        </h3>
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-6">
                      <div>
                        {invoiceDesign.companyLogo && (
                          <img
                            src={invoiceDesign.companyLogo}
                            alt="Company Logo"
                            className="h-16 w-auto mb-2"
                          />
                        )}
                        <h2 className="text-2xl font-bold">{invoiceDesign.companyName}</h2>
                        <p className="text-gray-600">{invoiceDesign.companyAddress}</p>
                        <p className="text-gray-600">Phone: {invoiceDesign.companyPhone}</p>
                        <p className="text-gray-600">Email: {invoiceDesign.companyEmail}</p>
                      </div>
                      <div className="text-right">
                        <h1
                          className="text-3xl font-bold"
                          style={{ color: invoiceDesign.accentColor }}
                        >
                          INVOICE
                        </h1>
                        <p className="text-gray-600">Invoice #: {invoiceDesign.invoiceNumber}</p>
                        <p className="text-gray-600">Issue Date: {invoiceDesign.issueDate}</p>
                        <p className="text-gray-600">Due Date: {invoiceDesign.dueDate}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 mb-6">
                      <div>
                        <h3 className="font-bold mb-2">Bill To:</h3>
                        <p className="font-medium">{invoiceDesign.clientName}</p>
                        <p className="text-gray-600">{invoiceDesign.clientAddress}</p>
                        <p className="text-gray-600">Email: {invoiceDesign.clientEmail}</p>
                        <p className="text-gray-600">Phone: {invoiceDesign.clientPhone}</p>
                      </div>
                    </div>

                    <div className="border rounded-lg overflow-hidden mb-6">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left">Description</th>
                            <th className="px-4 py-2 text-right">Qty</th>
                            <th className="px-4 py-2 text-right">Rate</th>
                            <th className="px-4 py-2 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceDesign.items.map((item, index) => (
                            <tr key={index} className="border-t">
                              <td className="px-4 py-2">{item.description}</td>
                              <td className="px-4 py-2 text-right">{item.quantity}</td>
                              <td className="px-4 py-2 text-right">₹{item.rate.toLocaleString()}</td>
                              <td className="px-4 py-2 text-right">₹{item.amount.toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <div className="w-64 space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>₹{invoiceDesign.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax ({invoiceDesign.taxRate}%):</span>
                          <span>₹{invoiceDesign.taxAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                          <span>Total:</span>
                          <span>₹{invoiceDesign.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {invoiceDesign.notes && (
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-bold mb-2">Notes:</h4>
                        <p>{invoiceDesign.notes}</p>
                      </div>
                    )}

                    {/* Custom Footer */}
                    {invoiceDesign.footerImage && (
                      <div className="mt-6 text-center">
                        <img
                          src={invoiceDesign.footerImage}
                          alt="Footer"
                          className="mx-auto max-h-20 max-w-full object-contain"
                        />
                      </div>
                    )}

                    {invoiceDesign.footerText && (
                      <div className="mt-6 text-center">
                        <p
                          className="text-sm font-medium"
                          style={{ color: invoiceDesign.footerColor }}
                        >
                          {invoiceDesign.footerText}
                        </p>
                      </div>
                    )}

                    <div className="mt-6 text-sm text-gray-600">
                      <p>{invoiceDesign.terms}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Template Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <Label htmlFor="template">Invoice Template</Label>
                        <Select value={invoiceDesign.template} onValueChange={(value) => setInvoiceDesign(prev => ({ ...prev, template: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="classic">Classic</SelectItem>
                            <SelectItem value="minimal">Minimal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 mt-6">
                <Button onClick={generateDesignerPDF} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Generate PDF
                </Button>
                <Button onClick={handleSaveDesignerInvoice} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save & Create Invoice
                </Button>
                <Button variant="outline" onClick={() => setShowInvoiceDesigner(false)}>
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
                 )}
       </AnimatePresence>

      {/* Invoice Success Modal */}
      <AnimatePresence>
        {showInvoiceSuccessModal && lastCreatedInvoice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowInvoiceSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Invoice Created Successfully!</h3>
                <p className="text-gray-600">
                  Invoice <span className="font-medium">{lastCreatedInvoice.id}</span> has been created and saved.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Client:</span>
                  <span className="font-medium">{lastCreatedInvoice.client}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">₹{lastCreatedInvoice.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Due Date:</span>
                  <span className="font-medium">{lastCreatedInvoice.dueDate}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    console.log('🎯 PDF Download button clicked in success modal!');
                    console.log('lastCreatedInvoice:', lastCreatedInvoice);
                    console.log('About to call generatePDF...');
                    generatePDF(lastCreatedInvoice);
                    console.log('generatePDF call completed');
                  }}
                  className="w-full"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  onClick={() => exportInvoiceToExcel(lastCreatedInvoice)}
                  className="w-full"
                  variant="outline"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export to Excel
                </Button>
                <Button
                  onClick={() => setShowInvoiceSuccessModal(false)}
                  className="w-full"
                >
                  Done
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
