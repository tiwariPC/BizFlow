import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import {
  Bot,
  Send,
  Sparkles,
  Shield,
  Palette,
  TrendingUp,
  DollarSign,
  Users,
  FileText,
  Target,
  Lightbulb,
  MessageSquare,
  Clock,
  Zap,
  BookOpen,
  Settings,
  HelpCircle,
  CheckCircle,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  topic?: string;
}

const suggestedTopics = [
  {
    icon: Shield,
    title: 'Compliance',
    description: 'GST filing, ROC compliance, legal requirements',
    color: 'bg-red-100 text-red-600',
    examples: [
      'How do I file my GST return?',
      'What documents do I need for ROC filing?',
      'When is my next compliance deadline?',
    ],
  },
  {
    icon: Palette,
    title: 'Branding',
    description: 'Logo design, brand identity, marketing materials',
    color: 'bg-blue-100 text-blue-600',
    examples: [
      'How to create a strong brand identity?',
      'What colors work best for my industry?',
      'Tips for designing a professional logo',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Growth',
    description: 'Business expansion, marketing strategies, scaling',
    color: 'bg-green-100 text-green-600',
    examples: [
      'How to scale my business operations?',
      'Best marketing strategies for startups',
      'When should I consider funding?',
    ],
  },
  {
    icon: DollarSign,
    title: 'Finance',
    description: 'Accounting, invoicing, tax planning',
    color: 'bg-purple-100 text-purple-600',
    examples: [
      'How to manage cash flow effectively?',
      'Tax planning strategies for small businesses',
      'Best practices for invoicing',
    ],
  },
  {
    icon: Users,
    title: 'HR & Team',
    description: 'Hiring, employee management, payroll',
    color: 'bg-orange-100 text-orange-600',
    examples: [
      'How to hire the right employees?',
      'Employee onboarding best practices',
      'Payroll compliance requirements',
    ],
  },
  {
    icon: Target,
    title: 'Strategy',
    description: 'Business planning, market analysis, competitive advantage',
    color: 'bg-indigo-100 text-indigo-600',
    examples: [
      'How to analyze my competition?',
      'Business model canvas for startups',
      'Market entry strategies',
    ],
  },
];

const recentConversations = [
  {
    id: '1',
    title: 'GST Filing Process',
    lastMessage: 'What documents do I need for GST filing?',
    timestamp: '2 hours ago',
    topic: 'Compliance',
  },
  {
    id: '2',
    title: 'Brand Identity Design',
    lastMessage: 'How to create a memorable logo?',
    timestamp: '1 day ago',
    topic: 'Branding',
  },
  {
    id: '3',
    title: 'Marketing Strategy',
    lastMessage: 'Best digital marketing channels for B2B?',
    timestamp: '3 days ago',
    topic: 'Growth',
  },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content:
        "Hello! I'm your AI business assistant. I can help you with compliance, branding, growth strategies, and more. What would you like to know about?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content:
          'This is a placeholder response. In the full implementation, I would provide detailed, contextual answers based on your business needs and current regulations. I can help with compliance deadlines, branding strategies, growth planning, and much more!',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleTopicClick = (topic: string, example: string) => {
    setInputValue(example);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-neutral-900 mb-2'>AI Business Assistant</h1>
        <p className='text-neutral-600'>
          Ask me about compliance, branding, growth strategies, and more
        </p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
        {/* Chat Interface */}
        <div className='lg:col-span-3'>
          <Card className='h-[600px] flex flex-col'>
            <CardHeader className='border-b border-neutral-200'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                  <Bot className='w-5 h-5 text-white' />
                </div>
                <div>
                  <CardTitle className='text-lg'>BizHub AI Assistant</CardTitle>
                  <p className='text-sm text-neutral-600'>Powered by advanced AI</p>
                </div>
                <Badge className='ml-auto bg-green-100 text-green-800'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mr-2'></div>
                  Online
                </Badge>
              </div>
            </CardHeader>

            <CardContent className='flex-1 p-0 flex flex-col'>
              {/* Messages Area */}
              <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-neutral-100 text-neutral-900'
                      }`}
                    >
                      <p className='text-sm'>{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-neutral-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className='flex justify-start'>
                    <div className='bg-neutral-100 text-neutral-900 p-3 rounded-lg'>
                      <div className='flex items-center gap-1'>
                        <div className='w-2 h-2 bg-neutral-400 rounded-full animate-bounce'></div>
                        <div
                          className='w-2 h-2 bg-neutral-400 rounded-full animate-bounce'
                          style={{ animationDelay: '0.1s' }}
                        ></div>
                        <div
                          className='w-2 h-2 bg-neutral-400 rounded-full animate-bounce'
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className='border-t border-neutral-200 p-4'>
                <div className='flex gap-2'>
                  <Input
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder='Ask me anything about your business...'
                    className='flex-1'
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className='px-4'
                  >
                    <Send className='w-4 h-4' />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Suggested Topics */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Sparkles className='w-5 h-5' />
                Suggested Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                {suggestedTopics.map(topic => (
                  <div key={topic.title} className='space-y-2'>
                    <div className='flex items-center gap-2'>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${topic.color}`}
                      >
                        <topic.icon className='w-4 h-4' />
                      </div>
                      <div>
                        <h4 className='font-medium text-neutral-900'>{topic.title}</h4>
                        <p className='text-xs text-neutral-600'>{topic.description}</p>
                      </div>
                    </div>
                    <div className='space-y-1'>
                      {topic.examples.map((example, index) => (
                        <button
                          key={index}
                          onClick={() => handleTopicClick(topic.title, example)}
                          className='block w-full text-left text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded transition-colors'
                        >
                          "{example}"
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Conversations */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <MessageSquare className='w-5 h-5' />
                Recent Conversations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {recentConversations.map(conversation => (
                  <div
                    key={conversation.id}
                    className='p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors'
                  >
                    <div className='flex items-center justify-between mb-1'>
                      <h4 className='font-medium text-neutral-900'>{conversation.title}</h4>
                      <Badge variant='outline' className='text-xs'>
                        {conversation.topic}
                      </Badge>
                    </div>
                    <p className='text-sm text-neutral-600 mb-2'>{conversation.lastMessage}</p>
                    <p className='text-xs text-neutral-500'>{conversation.timestamp}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Zap className='w-5 h-5' />
                AI Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-3 text-sm text-neutral-600'>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='w-4 h-4 text-green-500' />
                  <span>Real-time compliance updates</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='w-4 h-4 text-green-500' />
                  <span>Business strategy guidance</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='w-4 h-4 text-green-500' />
                  <span>Document analysis & review</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='w-4 h-4 text-green-500' />
                  <span>Market research insights</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='w-4 h-4 text-green-500' />
                  <span>Financial planning advice</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coming Soon */}
          <Card className='border-dashed border-2 border-neutral-300'>
            <CardContent className='p-4 text-center'>
              <div className='w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                <Settings className='w-6 h-6 text-neutral-500' />
              </div>
              <h4 className='font-medium text-neutral-900 mb-2'>Advanced Features</h4>
              <p className='text-sm text-neutral-600 mb-3'>
                Voice commands, document upload, and personalized insights coming soon!
              </p>
              <Badge variant='outline' className='text-xs'>
                Coming Soon
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
