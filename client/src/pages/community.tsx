import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import {
  Users,
  MessageSquare,
  Search,
  Plus,
  Eye,
  ThumbsUp,
  Star,
  Calendar,
  Clock,
  CheckCircle,
  GraduationCap,
  Network,
  Heart,
  Share2,
  Filter,
  TrendingUp,
  Award,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

const communityPosts = [
  {
    id: 1,
    title: "How to handle GST filing for multiple states?",
    author: "Rahul Sharma",
    authorRole: "Founder",
    company: "TechCorp Solutions",
    category: "Compliance",
    replies: 12,
    likes: 45,
    views: 234,
    timeAgo: "2 hours ago",
    solved: true
  },
  {
    id: 2,
    title: "Best practices for remote team management",
    author: "Priya Patel",
    authorRole: "HR Manager",
    company: "Innovate Labs",
    category: "HR",
    replies: 8,
    likes: 32,
    views: 156,
    timeAgo: "5 hours ago",
    solved: false
  },
  {
    id: 3,
    title: "Marketing budget allocation for small businesses",
    author: "Amit Kumar",
    authorRole: "Marketing Director",
    company: "StartupXYZ",
    category: "Marketing",
    replies: 15,
    likes: 67,
    views: 445,
    timeAgo: "1 day ago",
    solved: true
  },
  {
    id: 4,
    title: "Funding options for early-stage startups",
    author: "Neha Singh",
    authorRole: "CEO",
    company: "Growth Ventures",
    category: "Finance",
    replies: 23,
    likes: 89,
    views: 567,
    timeAgo: "2 days ago",
    solved: false
  }
];

const mentors = [
  {
    id: 1,
    name: "CA Priya Sharma",
    expertise: "Tax & Compliance",
    experience: "15+ years",
    rating: 4.9,
    sessions: 45,
    availability: "Available",
    avatar: "PS",
    location: "Mumbai",
    hourlyRate: "₹2,500"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    expertise: "Digital Marketing",
    experience: "12+ years",
    rating: 4.8,
    sessions: 38,
    availability: "Available",
    avatar: "RK",
    location: "Delhi",
    hourlyRate: "₹1,800"
  },
  {
    id: 3,
    name: "Anita Desai",
    expertise: "Business Strategy",
    experience: "18+ years",
    rating: 4.9,
    sessions: 52,
    availability: "Busy",
    avatar: "AD",
    location: "Bangalore",
    hourlyRate: "₹3,200"
  },
  {
    id: 4,
    name: "Dr. Sanjay Mehta",
    expertise: "Startup Funding",
    experience: "20+ years",
    rating: 4.7,
    sessions: 28,
    availability: "Available",
    avatar: "SM",
    location: "Chennai",
    hourlyRate: "₹4,000"
  }
];

const events = [
  {
    id: 1,
    title: "Startup Networking Meetup",
    date: "2024-01-25",
    time: "6:00 PM",
    location: "Mumbai",
    attendees: 45,
    type: "Networking",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Digital Marketing Workshop",
    date: "2024-01-28",
    time: "2:00 PM",
    location: "Delhi",
    attendees: 32,
    type: "Workshop",
    status: "upcoming"
  },
  {
    id: 3,
    title: "Funding Pitch Competition",
    date: "2024-02-05",
    time: "10:00 AM",
    location: "Bangalore",
    attendees: 78,
    type: "Competition",
    status: "upcoming"
  }
];

const categories = [
  { name: "All", count: 156, color: "bg-blue-100 text-blue-600" },
  { name: "Compliance", count: 34, color: "bg-green-100 text-green-600" },
  { name: "Marketing", count: 28, color: "bg-orange-100 text-orange-600" },
  { name: "HR", count: 22, color: "bg-purple-100 text-purple-600" },
  { name: "Finance", count: 19, color: "bg-red-100 text-red-600" },
  { name: "Technology", count: 31, color: "bg-indigo-100 text-indigo-600" }
];

export default function Community() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Community</h1>
        <p className="text-neutral-600">Connect with entrepreneurs, share experiences, and get expert advice</p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search discussions, mentors, events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 text-lg"
          />
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Total Members</p>
                <p className="text-2xl font-bold text-neutral-900">2,847</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Active Discussions</p>
                <p className="text-2xl font-bold text-neutral-900">156</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Questions Solved</p>
                <p className="text-2xl font-bold text-neutral-900">892</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Expert Mentors</p>
                <p className="text-2xl font-bold text-neutral-900">45</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700">
              <MessageSquare className="w-6 h-6" />
              <span>Ask Question</span>
            </Button>

            <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700">
              <Users className="w-6 h-6" />
              <span>Join Discussion</span>
            </Button>

            <Button className="h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700">
              <GraduationCap className="w-6 h-6" />
              <span>Find Mentors</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-neutral-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedCategory === category.name
                  ? "border-blue-500 bg-blue-50"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="text-center">
                <p className="font-medium text-neutral-900 mb-1">{category.name}</p>
                <p className="text-sm text-neutral-600">{category.count} posts</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Community Discussions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Recent Discussions
                </CardTitle>
                <Button size="sm" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Post
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communityPosts.map((post) => (
                  <div key={post.id} className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-blue-100 text-blue-800">{post.category}</Badge>
                          {post.solved && <Badge className="bg-green-100 text-green-800">Solved</Badge>}
                        </div>
                        <h4 className="font-medium text-neutral-900 mb-1">{post.title}</h4>
                        <p className="text-sm text-neutral-600">
                          By {post.author} ({post.authorRole} at {post.company})
                        </p>
                      </div>
                      <span className="text-sm text-neutral-500">{post.timeAgo}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-neutral-600">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          {post.replies} replies
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {post.likes} likes
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views} views
                        </span>
                      </div>
                      <Button size="sm" variant="outline">Reply</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Expert Mentors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Expert Mentors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mentors.map((mentor) => (
                  <div key={mentor.id} className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-blue-600">{mentor.avatar}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-neutral-900">{mentor.name}</h4>
                        <p className="text-sm text-neutral-600">{mentor.expertise}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-neutral-600 mb-3">
                      <div className="flex justify-between">
                        <span>Experience:</span>
                        <span>{mentor.experience}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rating:</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {mentor.rating}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate:</span>
                        <span>{mentor.hourlyRate}/hr</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className={mentor.availability === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {mentor.availability}
                      </Badge>
                      <Button size="sm" variant="outline">Connect</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-neutral-900">{event.title}</h4>
                      {getStatusBadge(event.status)}
                    </div>
                    <div className="space-y-2 text-sm text-neutral-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-neutral-600">{event.attendees} attendees</span>
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

