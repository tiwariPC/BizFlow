import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ServiceCard } from "@/components/service-card";
import { ServicePackage } from "@shared/schema";
import { authService } from "@/lib/auth";

export default function Home() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  
  const { data: packages = [], isLoading } = useQuery<ServicePackage[]>({
    queryKey: ["/api/packages"],
  });

  const user = authService.getUser();

  const handleServiceSelect = (packageId: string) => {
    if (user) {
      // Navigate to order placement or service details
      window.location.href = `/services?package=${packageId}`;
    } else {
      // Show login prompt
      alert("Please log in to select a service package");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-800 text-white py-20" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="hero-title">
              Your One-Stop Business Solutions Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100" data-testid="hero-subtitle">
              Expert guidance for incorporation, compliance, and business growth
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-neutral-100 px-8 py-4 text-lg"
                  data-testid="hero-get-started"
                >
                  Get Started
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg"
                onClick={() => setShowQuestionnaire(true)}
                data-testid="hero-learn-more"
              >
                Take Questionnaire
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Incorporation Options */}
      <section className="py-20 bg-white" data-testid="services-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4" data-testid="services-title">
              Choose Your Business Structure
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto" data-testid="services-subtitle">
              Select the incorporation option that best fits your business needs and goals
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
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-neutral-50" data-testid="benefits-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose BizHub?
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              We make business incorporation simple, fast, and reliable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-neutral-600">Quick and efficient processing of all incorporation documents</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted & Secure</h3>
              <p className="text-neutral-600">Your data and documents are completely secure with us</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
              <p className="text-neutral-600">Professional support throughout your incorporation journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary" data-testid="cta-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Business?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of entrepreneurs who trust BizHub for their business needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-neutral-100 px-8 py-4 text-lg"
                data-testid="cta-get-started"
              >
                Get Started Now
              </Button>
            </Link>
            <Link href="/questionnaire">
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg"
                data-testid="cta-questionnaire"
              >
                Take Our Quiz
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
