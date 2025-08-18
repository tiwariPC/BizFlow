import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Order } from "@shared/schema";
import { OrderCard } from "@/components/order-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authService } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { useState } from "react";
import { 
  ShoppingCart, 
  Users, 
  Clock, 
  DollarSign,
  Download,
  Eye,
  Edit
} from "lucide-react";

interface AdminStats {
  totalOrders: number;
  activeCustomers: number;
  pendingOrders: number;
  monthlyRevenue: number;
}

interface OrderWithDetails extends Order {
  package?: {
    id: string;
    name: string;
  };
  user?: {
    id: string;
    fullName: string;
    email: string;
  };
}

export default function Admin() {
  const user = authService.getUser();
  const [selectedOrder, setSelectedOrder] = useState<OrderWithDetails | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stats } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
    enabled: !!user && user.role === 'admin',
  });

  const { data: orders = [], isLoading } = useQuery<OrderWithDetails[]>({
    queryKey: ["/api/orders"],
    enabled: !!user && user.role === 'admin',
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      const response = await apiRequest("PATCH", `/api/orders/${orderId}/status`, {
        status,
        notes: `Status updated to ${status} by admin`,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Status Updated",
        description: "Order status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setSelectedOrder(null);
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update order status.",
        variant: "destructive",
      });
    },
  });

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-4">Admin access required to view this page.</p>
            <Link href="/">
              <Button>Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredOrders = statusFilter === "all" 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const handleUpdateStatus = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
    }
  };

  const statsCards = [
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Customers",
      value: stats?.activeCustomers || 0,
      icon: Users,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Orders",
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Monthly Revenue",
      value: `₹${stats?.monthlyRevenue || 0}`,
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2" data-testid="admin-title">
            Admin Dashboard
          </h1>
          <p className="text-neutral-600" data-testid="admin-subtitle">
            Manage orders, customers, and service packages
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.title} data-testid={`stat-${stat.title.toLowerCase().replace(' ', '-')}`}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-neutral-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Order Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle data-testid="order-management-title">Order Management</CardTitle>
              <div className="flex items-center space-x-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40" data-testid="status-filter">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" data-testid="export-button">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-neutral-200 rounded-lg h-24"></div>
                  </div>
                ))}
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="space-y-4" data-testid="admin-orders-list">
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    isAdmin={true}
                    onViewDetails={(orderId) => {
                      console.log('View order details:', orderId);
                    }}
                    onUpdateStatus={handleUpdateStatus}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8" data-testid="no-orders-admin">
                <ShoppingCart className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">No orders found</h3>
                <p className="text-neutral-600">No orders match the current filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Update Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Order Status</DialogTitle>
            </DialogHeader>
            
            {selectedOrder && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                  <p><strong>Customer:</strong> {selectedOrder.user?.fullName}</p>
                  <p><strong>Service:</strong> {selectedOrder.package?.name}</p>
                  <p><strong>Current Status:</strong> 
                    <Badge className="ml-2">{selectedOrder.status}</Badge>
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Status:</label>
                  <Select
                    onValueChange={(status) => {
                      updateStatusMutation.mutate({
                        orderId: selectedOrder.id,
                        status,
                      });
                    }}
                  >
                    <SelectTrigger data-testid="status-update-select">
                      <SelectValue placeholder="Select new status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
