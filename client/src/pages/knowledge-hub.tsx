import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  BookOpen,
  Search,
  Play,
  FileText,
  Shield,
  Palette,
  TrendingUp,
  Users,
  Calendar,
  Clock,
  Eye,
  Download,
  Star,
  Video,
  FileVideo,
  Book,
  GraduationCap,
  Target,
  Zap
} from "lucide-react";

const categories = [
  { name: "Compliance", icon: Shield, color: "bg-green-100 text-green-600", count: 25 },
  { name: "Branding", icon: Palette, color: "bg-blue-100 text-blue-600", count: 18 },
  { name: "Marketing", icon: TrendingUp, color: "bg-orange-100 text-orange-600", count: 32 },
  { name: "HR", icon: Users, color: "bg-purple-100 text-purple-600", count: 15 }
];

const articles = [
  {
    id: 1,
    title: "Complete Guide to GST Registration for Startups",
    category: "Compliance",
    author: "Legal Team",
    readTime: "8 min read",
    views: 1250,
    rating: 4.8,
    featured: true,
    tags: ["GST", "Registration", "Startup"]
  },
  {
    id: 2,
    title: "Building a Strong Brand Identity: Step-by-Step Guide",
    category: "Branding",
    author: "Design Team",
    readTime: "12 min read",
    views: 890,
    rating: 4.6,
    featured: false,
    tags: ["Branding", "Identity", "Design"]
  },
  {
    id: 3,
    title: "Digital Marketing Strategies for Small Businesses",
    category: "Marketing",
    author: "Marketing Team",
    readTime: "15 min read",
    views: 2100,
    rating: 4.9,
    featured: true,
    tags: ["Marketing", "Digital", "Strategy"]
  },
  {
    id: 4,
    title: "Employee Onboarding Best Practices",
    category: "HR",
    author: "HR Team",
    readTime: "10 min read",
    views: 650,
    rating: 4.7,
    featured: false,
    tags: ["HR", "Onboarding", "Best Practices"]
  }
];

const playbooks = [
  {
    id: 1,
    title: "Startup Incorporation Playbook",
    description: "Complete guide from idea to incorporation",
    category: "Compliance",
    pages: 45,
    downloads: 1200,
    rating: 4.9
  },
  {
    id: 2,
    title: "Marketing Launch Playbook",
    description: "Launch your product successfully",
    category: "Marketing",
    pages: 38,
    downloads: 890,
    rating: 4.7
  },
  {
    id: 3,
    title: "Team Building Playbook",
    description: "Build and manage high-performing teams",
    category: "HR",
    pages: 52,
    downloads: 650,
    rating: 4.8
  }
];

const videoTutorials = [
  {
    id: 1,
    title: "How to Register Your Business Online",
    duration: "12:30",
    category: "Compliance",
    views: 3400,
    thumbnail: "Video 1"
  },
  {
    id: 2,
    title: "Creating Your First Logo with AI Tools",
    duration: "18:45",
    category: "Branding",
    views: 2100,
    thumbnail: "Video 2"
  },
  {
    id: 3,
    title: "Setting Up Your First Marketing Campaign",
    duration: "25:15",
    category: "Marketing",
    views: 1800,
    thumbnail: "Video 3"
  }
];

const webinars = [
  {
    id: 1,
    title: "Tax Planning for Startups",
    date: "2024-01-25",
    time: "2:00 PM",
    speaker: "CA Priya Sharma",
    attendees: 150,
    status: "upcoming"
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass",
    date: "2024-01-28",
    time: "3:30 PM",
    speaker: "Marketing Expert Rajesh",
    attendees: 200,
    status: "upcoming"
  },
  {
    id: 3,
    title: "Building Customer Relationships",
    date: "2024-01-20",
    time: "1:00 PM",
    speaker: "Sales Guru Anita",
    attendees: 120,
    status: "completed"
  }
];

export default function KnowledgeHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Knowledge Hub</h1>
        <p className="text-neutral-600">Learn, grow, and succeed with our comprehensive resources</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search articles, playbooks, tutorials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 text-lg"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name.toLowerCase())}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedCategory === category.name.toLowerCase()
                  ? "border-blue-500 bg-blue-50"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${category.color}`}>
                  <category.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-neutral-900">{category.name}</p>
                  <p className="text-sm text-neutral-600">{category.count} articles</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Featured Articles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Featured Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {articles.filter(article => article.featured).map((article) => (
                  <div key={article.id} className="border border-neutral-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-100 text-blue-800">{article.category}</Badge>
                          {article.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">{article.title}</h3>
                        <p className="text-sm text-neutral-600 mb-3">By {article.author} • {article.readTime}</p>
                        <div className="flex items-center gap-4 text-sm text-neutral-600">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {article.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            {article.rating}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline">Read More</Button>
                    </div>
                    <div className="flex gap-2">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* All Articles */}
          <Card>
            <CardHeader>
              <CardTitle>All Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-blue-100 text-blue-800">{article.category}</Badge>
                        <span className="text-sm text-neutral-600">By {article.author}</span>
                      </div>
                      <h4 className="font-medium text-neutral-900 mb-1">{article.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <span>{article.readTime}</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {article.rating}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Read</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Playbooks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Playbooks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {playbooks.map((playbook) => (
                  <div key={playbook.id} className="p-4 border border-neutral-200 rounded-lg">
                    <h4 className="font-medium text-neutral-900 mb-2">{playbook.title}</h4>
                    <p className="text-sm text-neutral-600 mb-3">{playbook.description}</p>
                    <div className="flex items-center justify-between text-sm text-neutral-600 mb-3">
                      <span>{playbook.pages} pages</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {playbook.rating}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">{playbook.downloads} downloads</span>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Video Tutorials */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="w-5 h-5" />
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {videoTutorials.map((tutorial) => (
                  <div key={tutorial.id} className="p-4 border border-neutral-200 rounded-lg">
                    <div className="w-full h-24 bg-neutral-100 rounded mb-3 flex items-center justify-center">
                      <Play className="w-8 h-8 text-neutral-400" />
                    </div>
                    <h4 className="font-medium text-neutral-900 mb-2">{tutorial.title}</h4>
                    <div className="flex items-center justify-between text-sm text-neutral-600">
                      <span>{tutorial.duration}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {tutorial.views}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Webinars */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Webinars
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webinars.map((webinar) => (
                  <div key={webinar.id} className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-neutral-900">{webinar.title}</h4>
                      {getStatusBadge(webinar.status)}
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">By {webinar.speaker}</p>
                    <div className="flex items-center gap-4 text-sm text-neutral-600 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {webinar.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {webinar.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">{webinar.attendees} attendees</span>
                      <Button size="sm" variant="outline">
                        Register
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

