import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ServicePackage } from "@shared/schema";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { authService } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Check } from "lucide-react";

export default function Services() {
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: packages = [], isLoading } = useQuery<ServicePackage[]>({
    queryKey: ["/api/packages"],
  });

  const user = authService.getUser();

  const orderMutation = useMutation({
    mutationFn: async (packageId: string) => {
      if (!user) throw new Error("Please log in to place an order");
      
      const response = await apiRequest("POST", "/api/orders", {
        packageId,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Order Placed Successfully",
        description: "Your order has been submitted and is being processed.",
      });
      setShowOrderDialog(false);
      setSelectedPackage(null);
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
    },
    onError: (error: any) => {
      toast({
        title: "Order Failed",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleServiceSelect = (packageId: string) => {
    const pkg = packages.find(p => p.id === packageId);
    if (pkg) {
      setSelectedPackage(pkg);
      if (user) {
        setShowOrderDialog(true);
      } else {
        toast({
          title: "Login Required",
          description: "Please log in to view service details and place orders.",
          variant: "destructive",
        });
      }
    }
  };

  const handlePlaceOrder = () => {
    if (selectedPackage) {
      orderMutation.mutate(selectedPackage.id);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-4"
            data-testid="back-button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4" data-testid="services-page-title">
            Business Incorporation Services
          </h1>
          <p className="text-xl text-neutral-600 max-w-3xl" data-testid="services-page-subtitle">
            Choose the perfect business structure for your needs. Our expert team will handle all the paperwork and legal requirements.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-neutral-200 rounded-xl h-64"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="services-grid">
            {packages.map((pkg) => (
              <ServiceCard
                key={pkg.id}
                package={pkg}
                onSelect={handleServiceSelect}
              />
            ))}
          </div>
        )}

        {/* Order Confirmation Dialog */}
        <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Your Order</DialogTitle>
            </DialogHeader>
            
            {selectedPackage && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {selectedPackage.name}
                      {selectedPackage.popular && (
                        <Badge className="bg-primary text-white">Popular</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-semibold">₹{selectedPackage.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Setup Time:</span>
                        <span>{selectedPackage.setupTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Compliance Level:</span>
                        <span>{selectedPackage.compliance}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Features Included:</h4>
                      <ul className="space-y-1">
                        {selectedPackage.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="w-4 h-4 text-green-600 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowOrderDialog(false)}
                    className="flex-1"
                    data-testid="cancel-order"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={orderMutation.isPending}
                    className="flex-1"
                    data-testid="confirm-order"
                  >
                    {orderMutation.isPending ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
