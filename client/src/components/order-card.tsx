import { Order } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Package, AlertCircle } from "lucide-react";

interface OrderCardProps {
  order: Order & {
    package?: {
      id: string;
      name: string;
      setupTime?: string;
    };
    user?: {
      id: string;
      fullName: string;
      email: string;
    };
  };
  isAdmin?: boolean;
  onViewDetails?: (orderId: string) => void;
  onUpdateStatus?: (orderId: string) => void;
}

const statusConfig = {
  pending: {
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
    label: "Pending"
  },
  processing: {
    color: "bg-blue-100 text-blue-800",
    icon: Package,
    label: "Processing"
  },
  completed: {
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
    label: "Completed"
  },
  cancelled: {
    color: "bg-red-100 text-red-800",
    icon: AlertCircle,
    label: "Cancelled"
  }
};

export function OrderCard({ order, isAdmin = false, onViewDetails, onUpdateStatus }: OrderCardProps) {
  const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending;
  const StatusIcon = status.icon;
  
  const formatDate = (date: Date | string | null) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="border border-neutral-200" data-testid={`order-card-${order.id}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h4 className="font-semibold text-neutral-900" data-testid={`order-service-${order.id}`}>
              {order.package?.name || 'Unknown Service'}
            </h4>
            <p className="text-sm text-neutral-600" data-testid={`order-date-${order.id}`}>
              Order placed on {formatDate(order.createdAt)}
            </p>
            {isAdmin && order.user && (
              <p className="text-sm text-neutral-600" data-testid={`order-customer-${order.id}`}>
                Customer: {order.user.fullName}
              </p>
            )}
          </div>
          <div className="text-right">
            <Badge className={status.color} data-testid={`order-status-${order.id}`}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.label}
            </Badge>
            <p className="text-sm font-semibold text-neutral-900 mt-1" data-testid={`order-amount-${order.id}`}>
              ₹{order.amount}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-neutral-600">
            {order.status === 'completed' ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                <span data-testid={`order-completion-${order.id}`}>
                  Completed on {formatDate(order.completedAt)}
                </span>
              </>
            ) : (
              <>
                <Clock className="w-4 h-4 mr-2" />
                <span data-testid={`order-estimate-${order.id}`}>
                  Estimated completion: {order.package?.setupTime || 'N/A'}
                </span>
              </>
            )}
          </div>
          
          <div className="flex space-x-2">
            {onViewDetails && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(order.id)}
                data-testid={`order-view-${order.id}`}
              >
                View Details
              </Button>
            )}
            {isAdmin && onUpdateStatus && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onUpdateStatus(order.id)}
                data-testid={`order-update-${order.id}`}
              >
                Update Status
              </Button>
            )}
            {order.status === 'completed' && !isAdmin && (
              <Button
                variant="ghost"
                size="sm"
                data-testid={`order-download-${order.id}`}
              >
                Download Certificate
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
