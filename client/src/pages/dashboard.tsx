import { useQuery } from "@tanstack/react-query";
import { Order } from "@shared/schema";
import { OrderCard } from "@/components/order-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authService } from "@/lib/auth";
import { Link } from "wouter";
import { Package, FileText, Headphones, Plus, User } from "lucide-react";

interface OrderWithDetails extends Order {
  package?: {
    id: string;
    name: string;
    setupTime?: string;
  };
}

export default function Dashboard() {
  const user = authService.getUser();
  
  const { data: orders = [], isLoading } = useQuery<OrderWithDetails[]>({
    queryKey: ["/api/orders"],
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-4">Please log in to access your dashboard.</p>
            <Link href="/">
              <Button>Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const recentOrders = orders.slice(0, 5);
  const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing');
  const completedOrders = orders.filter(o => o.status === 'completed');

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2" data-testid="dashboard-title">
            Customer Dashboard
          </h1>
          <p className="text-neutral-600" data-testid="dashboard-subtitle">
            Track your orders, manage your account, and access important documents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle data-testid="recent-orders-title">Recent Orders</CardTitle>
                  <Link href="/services">
                    <Button variant="outline" size="sm" data-testid="view-all-orders">
                      View All Services
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="bg-neutral-200 rounded-lg h-24"></div>
                      </div>
                    ))}
                  </div>
                ) : recentOrders.length > 0 ? (
                  <div className="space-y-4" data-testid="orders-list">
                    {recentOrders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        onViewDetails={(orderId) => {
                          // TODO: Navigate to order details
                          console.log('View order details:', orderId);
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8" data-testid="no-orders">
                    <Package className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">No orders yet</h3>
                    <p className="text-neutral-600 mb-4">Start by exploring our services</p>
                    <Link href="/services">
                      <Button data-testid="browse-services">Browse Services</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Overview */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="account-overview-title">Account Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      <User className="text-primary w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900" data-testid="user-name">
                        {user.fullName}
                      </p>
                      <p className="text-sm text-neutral-600" data-testid="user-email">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  
                  <hr className="border-neutral-200" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-600">Total Orders:</span>
                      <span className="text-sm font-medium" data-testid="total-orders">
                        {orders.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-600">Active Orders:</span>
                      <span className="text-sm font-medium" data-testid="active-orders">
                        {activeOrders.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-600">Completed:</span>
                      <span className="text-sm font-medium" data-testid="completed-orders">
                        {completedOrders.length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle data-testid="quick-actions-title">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/services">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      data-testid="new-order-action"
                    >
                      <Plus className="w-4 h-4 mr-3" />
                      New Order
                    </Button>
                  </Link>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    data-testid="view-invoices-action"
                  >
                    <FileText className="w-4 h-4 mr-3" />
                    View Invoices
                  </Button>
                  
                  <Link href="/questionnaire">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      data-testid="questionnaire-action"
                    >
                      <Headphones className="w-4 h-4 mr-3" />
                      Take Questionnaire
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
