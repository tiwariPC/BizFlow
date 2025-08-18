import { ServicePackage } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Users, 
  Handshake, 
  Bus, 
  Building, 
  TrendingUp,
  LucideIcon
} from "lucide-react";

interface ServiceCardProps {
  package: ServicePackage;
  onSelect: (packageId: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  user: User,
  users: Users,
  handshake: Handshake,
  "user-tie": Bus,
  building: Building,
  "chart-line": TrendingUp,
};

export function ServiceCard({ package: pkg, onSelect }: ServiceCardProps) {
  const IconComponent = iconMap[pkg.icon] || Building;

  return (
    <Card className="relative hover:shadow-lg transition-shadow cursor-pointer group" data-testid={`service-card-${pkg.id}`}>
      {pkg.popular && (
        <Badge className="absolute top-4 right-4 bg-primary text-white">
          Popular
        </Badge>
      )}
      
      <CardContent className="p-6">
        <div className="mb-4">
          <IconComponent className="text-primary text-3xl mb-3 w-8 h-8" />
          <h3 className="text-xl font-semibold text-neutral-900 mb-2" data-testid={`service-title-${pkg.id}`}>
            {pkg.name}
          </h3>
          <p className="text-neutral-600 text-sm mb-4" data-testid={`service-description-${pkg.id}`}>
            {pkg.description}
          </p>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
            <span>Setup Time:</span>
            <span className="font-medium" data-testid={`service-setup-time-${pkg.id}`}>
              {pkg.setupTime}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
            <span>Cost:</span>
            <span className="font-medium text-primary" data-testid={`service-price-${pkg.id}`}>
              ₹{pkg.price}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <span>Compliance:</span>
            <span className="font-medium" data-testid={`service-compliance-${pkg.id}`}>
              {pkg.compliance}
            </span>
          </div>
        </div>
        
        <Button
          className="w-full group-hover:bg-primary-700 transition-colors"
          onClick={() => onSelect(pkg.id)}
          data-testid={`service-select-${pkg.id}`}
        >
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}
