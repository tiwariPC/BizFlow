import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ServicePackage } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { authService } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: Array<{
    value: string;
    label: string;
    score: Record<string, number>; // Package ID -> score
  }>;
}

const questions: Question[] = [
  {
    id: "revenue",
    text: "What is your expected annual revenue?",
    options: [
      {
        value: "under-20-lakhs",
        label: "Under ₹20 lakhs",
        score: { "sole-proprietorship": 3, "partnership": 2, "llp": 1, "opc": 1, "private": 0, "public": 0 }
      },
      {
        value: "20-lakhs-2-crores",
        label: "₹20 lakhs - ₹2 crores",
        score: { "sole-proprietorship": 1, "partnership": 2, "llp": 3, "opc": 2, "private": 3, "public": 1 }
      },
      {
        value: "above-2-crores",
        label: "Above ₹2 crores",
        score: { "sole-proprietorship": 0, "partnership": 1, "llp": 2, "opc": 1, "private": 3, "public": 3 }
      },
      {
        value: "not-sure",
        label: "I'm not sure yet",
        score: { "sole-proprietorship": 2, "partnership": 1, "llp": 1, "opc": 2, "private": 2, "public": 0 }
      }
    ]
  },
  {
    id: "business-type",
    text: "What type of business are you starting?",
    options: [
      {
        value: "professional-services",
        label: "Professional Services (Consulting, Legal, etc.)",
        score: { "sole-proprietorship": 2, "partnership": 3, "llp": 3, "opc": 2, "private": 2, "public": 0 }
      },
      {
        value: "product-business",
        label: "Product Business (Manufacturing, Retail)",
        score: { "sole-proprietorship": 1, "partnership": 2, "llp": 1, "opc": 2, "private": 3, "public": 2 }
      },
      {
        value: "technology",
        label: "Technology/Software",
        score: { "sole-proprietorship": 0, "partnership": 1, "llp": 1, "opc": 3, "private": 3, "public": 1 }
      },
      {
        value: "trading",
        label: "Trading/Import-Export",
        score: { "sole-proprietorship": 2, "partnership": 3, "llp": 2, "opc": 1, "private": 2, "public": 1 }
      }
    ]
  },
  {
    id: "partners",
    text: "How many people will be involved in the business?",
    options: [
      {
        value: "just-me",
        label: "Just me",
        score: { "sole-proprietorship": 3, "partnership": 0, "llp": 0, "opc": 3, "private": 1, "public": 0 }
      },
      {
        value: "2-5-people",
        label: "2-5 people",
        score: { "sole-proprietorship": 0, "partnership": 3, "llp": 3, "opc": 0, "private": 3, "public": 1 }
      },
      {
        value: "6-20-people",
        label: "6-20 people",
        score: { "sole-proprietorship": 0, "partnership": 1, "llp": 2, "opc": 0, "private": 3, "public": 2 }
      },
      {
        value: "more-than-20",
        label: "More than 20 people",
        score: { "sole-proprietorship": 0, "partnership": 0, "llp": 1, "opc": 0, "private": 2, "public": 3 }
      }
    ]
  },
  {
    id: "funding",
    text: "Do you plan to raise funding or investment?",
    options: [
      {
        value: "no-funding",
        label: "No, self-funded",
        score: { "sole-proprietorship": 3, "partnership": 2, "llp": 2, "opc": 2, "private": 1, "public": 0 }
      },
      {
        value: "small-funding",
        label: "Small funding from friends/family",
        score: { "sole-proprietorship": 1, "partnership": 2, "llp": 2, "opc": 2, "private": 3, "public": 1 }
      },
      {
        value: "vc-funding",
        label: "Venture capital/angel investment",
        score: { "sole-proprietorship": 0, "partnership": 0, "llp": 1, "opc": 1, "private": 3, "public": 2 }
      },
      {
        value: "public-funding",
        label: "Planning to go public eventually",
        score: { "sole-proprietorship": 0, "partnership": 0, "llp": 0, "opc": 0, "private": 2, "public": 3 }
      }
    ]
  },
  {
    id: "compliance",
    text: "How comfortable are you with compliance and paperwork?",
    options: [
      {
        value: "minimal",
        label: "I prefer minimal compliance",
        score: { "sole-proprietorship": 3, "partnership": 2, "llp": 1, "opc": 1, "private": 0, "public": 0 }
      },
      {
        value: "moderate",
        label: "I can handle moderate compliance",
        score: { "sole-proprietorship": 2, "partnership": 3, "llp": 3, "opc": 2, "private": 2, "public": 1 }
      },
      {
        value: "complex",
        label: "I'm okay with complex compliance",
        score: { "sole-proprietorship": 0, "partnership": 1, "llp": 2, "opc": 2, "private": 3, "public": 2 }
      },
      {
        value: "very-complex",
        label: "I can manage very complex compliance",
        score: { "sole-proprietorship": 0, "partnership": 0, "llp": 1, "opc": 1, "private": 2, "public": 3 }
      }
    ]
  }
];

export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendation, setRecommendation] = useState<ServicePackage | null>(null);
  const { toast } = useToast();
  const user = authService.getUser();

  const { data: packages = [] } = useQuery<ServicePackage[]>({
    queryKey: ["/api/packages"],
  });

  const saveMutation = useMutation({
    mutationFn: async (data: { answers: string; recommendation?: string }) => {
      const response = await apiRequest("POST", "/api/questionnaire", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Questionnaire Saved",
        description: "Your answers have been saved to your account.",
      });
    },
  });

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRecommendation();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateRecommendation = () => {
    const scores: Record<string, number> = {
      "sole-proprietorship": 0,
      "partnership": 0,
      "llp": 0,
      "opc": 0,
      "private": 0,
      "public": 0
    };

    // Calculate scores based on answers
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(o => o.value === answer);
      if (option) {
        Object.entries(option.score).forEach(([packageType, score]) => {
          scores[packageType] += score;
        });
      }
    });

    // Find the package type with highest score
    const topPackageType = Object.entries(scores).reduce((a, b) =>
      scores[a[0]] > scores[b[0]] ? a : b
    )[0];

    // Map package types to actual packages
    const packageMapping: Record<string, string> = {
      "sole-proprietorship": "Sole Proprietorship",
      "partnership": "Partnership Firm",
      "llp": "Limited Liability Partnership",
      "opc": "One Person Company",
      "private": "Private Limited Company",
      "public": "Public Limited Company"
    };

    const recommendedPackage = packages.find(p =>
      p.name === packageMapping[topPackageType]
    );

    setRecommendation(recommendedPackage || packages[0]);
    setShowResults(true);

    // Save questionnaire if user is logged in
    if (user && recommendedPackage) {
      saveMutation.mutate({
        answers: JSON.stringify(answers),
        recommendation: recommendedPackage.id,
      });
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults && recommendation) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-neutral-900">
                Your Recommendation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  {recommendation.name}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {recommendation.description}
                </p>
                {recommendation.popular && (
                  <Badge className="bg-blue-600 text-white mb-4">Most Popular Choice</Badge>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 border border-neutral-200 rounded-lg">
                  <p className="text-sm text-neutral-600">Setup Time</p>
                  <p className="text-lg font-semibold">{recommendation.setupTime}</p>
                </div>
                <div className="p-4 border border-neutral-200 rounded-lg">
                  <p className="text-sm text-neutral-600">Cost</p>
                  <p className="text-lg font-semibold text-primary">₹{recommendation.price}</p>
                </div>
                <div className="p-4 border border-neutral-200 rounded-lg">
                  <p className="text-sm text-neutral-600">Compliance</p>
                  <p className="text-lg font-semibold">{recommendation.compliance}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {recommendation.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={() => {
                    setShowResults(false);
                    setCurrentQuestion(0);
                    setAnswers({});
                  }}
                  variant="outline"
                  className="flex-1"
                  data-testid="retake-quiz"
                >
                  Retake Quiz
                </Button>
                <Button
                  onClick={() => window.location.href = `/services?package=${recommendation.id}`}
                  className="flex-1"
                  data-testid="proceed-with-recommendation"
                >
                  Proceed with This Option
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedAnswer = answers[currentQ.id];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4" data-testid="questionnaire-title">
            Business Structure Questionnaire
          </h1>
          <p className="text-xl text-neutral-600" data-testid="questionnaire-subtitle">
            Answer a few questions to get personalized recommendations
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-neutral-600" data-testid="question-progress">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-primary" data-testid="progress-percentage">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-neutral-900 mb-6" data-testid="current-question">
                {currentQ.text}
              </h3>

              <RadioGroup
                value={selectedAnswer || ""}
                onValueChange={handleAnswerChange}
                className="space-y-4"
              >
                {currentQ.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:bg-blue-50 cursor-pointer"
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      data-testid={`option-${option.value}`}
                    />
                    <Label
                      htmlFor={option.value}
                      className="flex-1 cursor-pointer text-neutral-700"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                data-testid="previous-question"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={!selectedAnswer}
                data-testid="next-question"
              >
                {currentQuestion === questions.length - 1 ? "Get Recommendation" : "Next Question"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
