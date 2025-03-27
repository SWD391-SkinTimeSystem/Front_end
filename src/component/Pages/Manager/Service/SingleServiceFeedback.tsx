import React, { useState, useMemo } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { 
  Star, 
  MessageCircle, 
  TrendingUp, 
  Filter 
} from 'lucide-react';

interface Feedback {
  review_id: string;
  user_id: string;
  fullname: string;
  rating: number;
  review: string;
  date: string;
}

interface ServiceFeedbackProps {
  serviceId: string;
}

const SingleServiceFeedbackManagement: React.FC<ServiceFeedbackProps> = ({ serviceId }) => {
  // State for feedbacks specific to the service
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      review_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      fullname: "Khách Hàng X",
      rating: 5,
      review: "Dịch vụ rất chuyên nghiệp và hữu ích.",
      date: "2025-03-25"
    },
    {
      review_id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
      user_id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
      fullname: "Khách Hàng Y",
      rating: 4,
      review: "Dịch vụ tốt, còn một số điểm cần cải thiện.",
      date: "2025-03-26"
    }
  ]);

  // Analytics calculation
  const serviceAnalytics = useMemo(() => {
    const totalFeedbacks = feedbacks.length;
    const averageRating = feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalFeedbacks;
    
    // Categorize ratings
    const ratingDistribution = feedbacks.reduce((acc, feedback) => {
      const roundedRating = Math.floor(feedback.rating);
      acc[roundedRating] = (acc[roundedRating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return {
      totalFeedbacks,
      averageRating: averageRating.toFixed(1),
      ratingDistribution
    };
  }, [feedbacks]);

  const fetchServiceFeedbacks = async (serviceId: string) => {
    try {
     
    } catch (error) {
      console.error("Error fetching service feedbacks:", error);
    }
  };

  React.useEffect(() => {
    fetchServiceFeedbacks(serviceId);
  }, [serviceId]);

  return (
    <div className="container mx-auto p-4">
      {/* Service Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedbacks</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceAnalytics.totalFeedbacks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{serviceAnalytics.averageRating}/5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Positive</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Management */}
      <Tabs defaultValue="feedbacks" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feedbacks">Feedbacks</TabsTrigger>
          <TabsTrigger value="ratings">Rating Distribution</TabsTrigger>
          <TabsTrigger value="details">Service Details</TabsTrigger>
        </TabsList>

        {/* Feedbacks Tab */}
        <TabsContent value="feedbacks">
          <div className="space-y-4">
            {feedbacks.map(feedback => (
              <Card key={feedback.review_id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{feedback.fullname}</h3>
                        <span className="text-sm text-gray-500">{feedback.date}</span>
                      </div>
                      <p className="mb-2">{feedback.review}</p>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <Star 
                            key={index} 
                            className={`w-4 h-4 ${index < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                            fill={index < feedback.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Rating Distribution Tab */}
        <TabsContent value="ratings">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Rating Distribution</h3>
              <div className="grid grid-cols-5 gap-4">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div 
                    key={rating} 
                    className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
                  >
                    <span>{rating} Star</span>
                    <span className="font-bold">
                      {serviceAnalytics.ratingDistribution[rating] || 0}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Service Details Tab */}
        <TabsContent value="details">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Service ID</h3>
                  <p className="text-sm text-gray-500">{serviceId}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Total Unique Users</h3>
                  <p className="text-sm text-gray-500">
                    {new Set(feedbacks.map(f => f.user_id)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SingleServiceFeedbackManagement;


