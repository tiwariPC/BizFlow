import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Palette,
  Users,
  Banknote,
  Wrench,
  TrendingUp,
  PenTool,
  BookOpen,
  Search,
  Filter,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  Download,
  CheckCircle,
  Clock,
  DollarSign,
  Users as UsersIcon,
  Award,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Zap,
  Target,
  BarChart3,
  FileText,
  Calendar,
  Settings,
  X,
  Plus,
  Minus
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Enhanced service data with detailed information
const services = [
  {
    id: 1,
    key: "Compliance",
    label: "Business Compliance Suite",
    icon: ShieldCheck,
    color: "from-green-500 to-green-600",
    description: "Complete compliance management for your business with automated tracking and reporting.",
    price: 299,
    originalPrice: 399,
    currency: "₹",
    period: "month",
    features: [
      "GST Registration & Filing",
      "Company Registration",
      "Tax Compliance",
      "Legal Document Management",
      "Compliance Calendar",
      "Automated Reminders",
      "Expert Consultation",
      "24/7 Support"
    ],
    rating: 4.8,
    reviews: 1247,
    category: "Legal",
    tags: ["Compliance", "Legal", "Tax", "GST"],
    popular: true,
    new: false,
    discount: 25,
    setupTime: "2-3 days",
    support: "24/7",
    users: "5000+",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    key: "Branding",
    label: "Brand Identity Package",
    icon: Palette,
    color: "from-indigo-500 to-indigo-600",
    description: "Professional branding solutions including logo design, brand guidelines, and marketing materials.",
    price: 199,
    originalPrice: 299,
    currency: "₹",
    period: "month",
    features: [
      "Logo Design",
      "Brand Guidelines",
      "Business Cards",
      "Letterheads",
      "Social Media Templates",
      "Brand Strategy",
      "Unlimited Revisions",
      "Source Files"
    ],
    rating: 4.9,
    reviews: 892,
    category: "Design",
    tags: ["Branding", "Design", "Logo", "Identity"],
    popular: true,
    new: false,
    discount: 33,
    setupTime: "1-2 weeks",
    support: "Business Hours",
    users: "3200+",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    key: "CRM",
    label: "Customer Relationship Management",
    icon: Users,
    color: "from-orange-500 to-orange-600",
    description: "Comprehensive CRM solution for managing leads, customers, and sales pipeline.",
    price: 149,
    originalPrice: 199,
    currency: "₹",
    period: "month",
    features: [
      "Lead Management",
      "Customer Database",
      "Sales Pipeline",
      "Email Marketing",
      "Analytics Dashboard",
      "Mobile App",
      "API Integration",
      "Custom Fields"
    ],
    rating: 4.7,
    reviews: 2156,
    category: "Sales",
    tags: ["CRM", "Sales", "Leads", "Customers"],
    popular: true,
    new: false,
    discount: 25,
    setupTime: "1 day",
    support: "24/7",
    users: "8500+",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    key: "Accounting",
    label: "Financial Management Suite",
    icon: Banknote,
    color: "from-emerald-500 to-emerald-600",
    description: "Complete accounting and financial management solution for businesses of all sizes.",
    price: 399,
    originalPrice: 499,
    currency: "₹",
    period: "month",
    features: [
      "Bookkeeping",
      "Financial Reports",
      "Invoice Management",
      "Expense Tracking",
      "Tax Preparation",
      "Bank Reconciliation",
      "Multi-currency",
      "Audit Trail"
    ],
    rating: 4.6,
    reviews: 1678,
    category: "Finance",
    tags: ["Accounting", "Finance", "Bookkeeping", "Tax"],
    popular: false,
    new: false,
    discount: 20,
    setupTime: "3-5 days",
    support: "Business Hours",
    users: "4200+",
    image: "https://images.unsplash.com/photo-1554224154-26032cdc-3044?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    key: "HRMS",
    label: "HR Management System",
    icon: Wrench,
    color: "from-purple-500 to-purple-600",
    description: "Complete HR solution for employee management, payroll, and performance tracking.",
    price: 249,
    originalPrice: 349,
    currency: "₹",
    period: "month",
    features: [
      "Employee Database",
      "Payroll Management",
      "Leave Management",
      "Performance Reviews",
      "Recruitment Tools",
      "Time Tracking",
      "Benefits Management",
      "Compliance Reports"
    ],
    rating: 4.5,
    reviews: 943,
    category: "HR",
    tags: ["HR", "Payroll", "Employees", "Recruitment"],
    popular: false,
    new: true,
    discount: 29,
    setupTime: "1 week",
    support: "24/7",
    users: "1800+",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    key: "Marketing",
    label: "Digital Marketing Suite",
    icon: TrendingUp,
    color: "from-pink-500 to-pink-600",
    description: "Complete digital marketing solution with automation, analytics, and campaign management.",
    price: 179,
    originalPrice: 249,
    currency: "₹",
    period: "month",
    features: [
      "Email Marketing",
      "Social Media Management",
      "SEO Tools",
      "Analytics Dashboard",
      "Campaign Automation",
      "Lead Generation",
      "A/B Testing",
      "ROI Tracking"
    ],
    rating: 4.8,
    reviews: 1345,
    category: "Marketing",
    tags: ["Marketing", "Digital", "SEO", "Social Media"],
    popular: true,
    new: false,
    discount: 28,
    setupTime: "2-3 days",
    support: "24/7",
    users: "6700+",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
  },
  {
    id: 7,
    key: "Design",
    label: "Creative Design Studio",
    icon: PenTool,
    color: "from-blue-500 to-blue-600",
    description: "Professional design services for websites, graphics, and digital assets.",
    price: 129,
    originalPrice: 179,
    currency: "₹",
    period: "month",
    features: [
      "Website Design",
      "Graphic Design",
      "UI/UX Design",
      "Print Materials",
      "Digital Assets",
      "Design Consultation",
      "Unlimited Revisions",
      "Fast Turnaround"
    ],
    rating: 4.9,
    reviews: 756,
    category: "Design",
    tags: ["Design", "Creative", "Web", "Graphics"],
    popular: false,
    new: true,
    discount: 28,
    setupTime: "1-2 weeks",
    support: "Business Hours",
    users: "2100+",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop"
  },
  {
    id: 8,
    key: "Knowledge",
    label: "Business Knowledge Hub",
    icon: BookOpen,
    color: "from-yellow-500 to-yellow-600",
    description: "Comprehensive knowledge base with courses, templates, and business resources.",
    price: 99,
    originalPrice: 149,
    currency: "₹",
    period: "month",
    features: [
      "Online Courses",
      "Business Templates",
      "Expert Webinars",
      "Resource Library",
      "Community Forum",
      "Certification Programs",
      "Mobile Learning",
      "Progress Tracking"
    ],
    rating: 4.7,
    reviews: 2341,
    category: "Education",
    tags: ["Learning", "Courses", "Templates", "Resources"],
    popular: false,
    new: false,
    discount: 34,
    setupTime: "Instant",
    support: "24/7",
    users: "12000+",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop"
  }
];

const categories = ["All", "Legal", "Design", "Sales", "Finance", "HR", "Marketing", "Education"];
const priceRanges = ["All", "Under ₹100", "₹100-200", "₹200-300", "₹300+"];

export default function Store() {
  const [activated, setActivated] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('biz_activated_modules');
    if (saved) {
      try {
        const arr: string[] = JSON.parse(saved);
        const map: Record<string, boolean> = {};
        arr.forEach((k) => (map[k] = true));
        setActivated(map);
      } catch {}
    }
  }, []);

  const toggleModule = (key: string) => {
    setActivated((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const activeKeys = Object.entries(next).filter(([_, v]) => v).map(([k]) => k);
      localStorage.setItem('biz_activated_modules', JSON.stringify(activeKeys));
      return next;
    });
  };

  const addToCart = (service: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.map(item =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...service, quantity: 1 }];
    });
  };

  const removeFromCart = (serviceId: number) => {
    setCart(prev => prev.filter(item => item.id !== serviceId));
  };

  const updateCartQuantity = (serviceId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(serviceId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === serviceId ? { ...item, quantity } : item
    ));
  };

  const toggleWishlist = (service: any) => {
    setWishlist(prev => {
      const existing = prev.find(item => item.id === service.id);
      if (existing) {
        return prev.filter(item => item.id !== service.id);
      }
      return [...prev, service];
    });
  };

  const isInWishlist = (serviceId: number) => {
    return wishlist.some(item => item.id === serviceId);
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;

    const matchesPrice = selectedPriceRange === "All" ||
      (selectedPriceRange === "Under ₹100" && service.price < 100) ||
      (selectedPriceRange === "₹100-200" && service.price >= 100 && service.price <= 200) ||
      (selectedPriceRange === "₹200-300" && service.price >= 200 && service.price <= 300) ||
      (selectedPriceRange === "₹300+" && service.price > 300);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.reviews - a.reviews;
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "new":
        return b.new ? 1 : -1;
      default:
        return 0;
    }
  });

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Service Store</h1>
            <p className="text-neutral-600">Browse and activate modules to customize your workspace</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCart(true)}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price" />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map(range => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="new">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedServices.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                  <service.icon className="w-16 h-16 text-gray-400" />
                </div>
                {service.popular && (
                  <Badge className="absolute top-3 left-3 bg-orange-500">Popular</Badge>
                )}
                {service.new && (
                  <Badge className="absolute top-3 left-3 bg-green-500">New</Badge>
                )}
                {service.discount > 0 && (
                  <Badge className="absolute top-3 right-3 bg-red-500">
                    {service.discount}% OFF
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => toggleWishlist(service)}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(service.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </Button>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{service.label}</CardTitle>
                    <CardDescription className="mt-2">{service.description}</CardDescription>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1">
                    {renderStars(service.rating)}
                    <span className="text-sm text-gray-600 ml-1">({service.reviews})</span>
                  </div>
                  <Badge variant="outline" className="text-xs">{service.category}</Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">{service.currency}{service.price}</span>
                      {service.originalPrice > service.price && (
                        <span className="text-sm text-gray-500 line-through">{service.currency}{service.originalPrice}</span>
                      )}
                      <span className="text-sm text-gray-500">/{service.period}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <UsersIcon className="w-4 h-4" />
                      <span>{service.users} users</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Setup: {service.setupTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MessageCircle className="w-4 h-4" />
                      <span>Support: {service.support}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {service.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setSelectedService(service);
                    setShowServiceModal(true);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => addToCart(service)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Service Detail Modal */}
      {showServiceModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{selectedService.label}</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowServiceModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <selectedService.icon className="w-20 h-20 text-gray-400" />
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-600">{selectedService.description}</p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        {renderStars(selectedService.rating)}
                        <span className="text-sm text-gray-600 ml-1">({selectedService.reviews} reviews)</span>
                      </div>
                      <Badge variant="outline">{selectedService.category}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <UsersIcon className="w-4 h-4 text-gray-400" />
                        <span>{selectedService.users} users</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>Setup: {selectedService.setupTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-gray-400" />
                        <span>Support: {selectedService.support}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-gray-400" />
                        <span>Rating: {selectedService.rating}/5</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl font-bold text-green-600">{selectedService.currency}{selectedService.price}</span>
                      {selectedService.originalPrice > selectedService.price && (
                        <span className="text-lg text-gray-500 line-through">{selectedService.currency}{selectedService.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">per {selectedService.period}</p>
                    {selectedService.discount > 0 && (
                      <Badge className="bg-red-500 mt-2">{selectedService.discount}% OFF</Badge>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Features:</h3>
                    <ul className="space-y-2">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => toggleWishlist(selectedService)}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${isInWishlist(selectedService.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        {isInWishlist(selectedService.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => {
                          addToCart(selectedService);
                          setShowServiceModal(false);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowCart(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.label}</h3>
                        <p className="text-sm text-gray-600">{item.currency}{item.price}/{item.period}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.currency}{item.price * item.quantity}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-green-600">₹{cartTotal}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" onClick={() => setShowCart(false)}>
                        Continue Shopping
                      </Button>
                      <Button className="flex-1">
                        Checkout
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
