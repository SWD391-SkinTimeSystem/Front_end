import React, { useState, useMemo, useEffect } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';

import { 
  Star, 
  MessageCircle, 
  TrendingUp, 
} from 'lucide-react';

interface Feedback {
  review_id: string;
  user_id: string;
  username: string;
  rating: number;
  review: string;
  date: string;
}

interface Therapist {
  id: string;
  name: string;
}

const TherapistFeedbackManagement: React.FC = () => {
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [selectedTherapistId, setSelectedTherapistId] = useState<string | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5062/api/therapist?page=1&page_size=20&status=0');
        
        if (!response.ok) {
          throw new Error('Không thể tải danh sách chuyên gia');
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {

          setTherapists(result.data.content.map((therapist: any) => ({
            id: therapist.id,
            name: therapist.name
          })));
        } else {
          throw new Error(result.message || 'Đã xảy ra lỗi không xác định');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định');
        console.error('Lỗi tải danh sách chuyên gia:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  const fetchTherapistFeedbacks = async (therapistId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5062/api/feedback/therapist/${therapistId}`);
      
      if (!response.ok) {
        throw new Error('Không thể tải phản hồi của chuyên gia');
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        setFeedbacks(result.data);
      } else {
        throw new Error(result.message || 'Đã xảy ra lỗi không xác định');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Đã xảy ra lỗi không xác định');
      console.error("Lỗi tải phản hồi chuyên gia:", error);
      setFeedbacks([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle therapist selection
  const handleTherapistChange = (therapistId: string) => {
    setSelectedTherapistId(therapistId);
    fetchTherapistFeedbacks(therapistId);
  };

  // Analytics calculation
  const therapistAnalytics = useMemo(() => {
    const totalFeedbacks = feedbacks.length;
    const averageRating = totalFeedbacks > 0 
      ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalFeedbacks 
      : 0;
    
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Therapist Selection */}
      <div className="mb-6">
        <Select 
          value={selectedTherapistId || ''} 
          onValueChange={handleTherapistChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Chọn chuyên gia" />
          </SelectTrigger>
          <SelectContent>
            {therapists.map(therapist => (
              <SelectItem key={therapist.id} value={therapist.id}>
                {therapist.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedTherapistId && (
        <>
          {/* Therapist Overview */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tổng số phản hồi</CardTitle>
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{therapistAnalytics.totalFeedbacks}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Đánh giá trung bình</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{therapistAnalytics.averageRating}/5</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Xu hướng</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Number(therapistAnalytics.averageRating) >= 4 ? 'Giỏi' : 'Bình thường'}

                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs Management */}
          <Tabs defaultValue="feedbacks" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="feedbacks">Phản hồi</TabsTrigger>
              <TabsTrigger value="ratings">Phân bổ đánh giá</TabsTrigger>
              <TabsTrigger value="details">Chi tiết chuyên gia</TabsTrigger>
            </TabsList>

            {/* Feedbacks Tab */}
            <TabsContent value="feedbacks">
              <div className="space-y-4">
                {feedbacks.length === 0 ? (
                  <div className="text-center text-gray-500 p-4">
                    Chưa có phản hồi cho chuyên gia này
                  </div>
                ) : (
                  feedbacks.map(feedback => (
                    <Card key={feedback.review_id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-start">
                          <div className="w-full">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-semibold">{feedback.username}</h3>
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
                  ))
                )}
              </div>
            </TabsContent>

            {/* Rating Distribution Tab */}
            <TabsContent value="ratings">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Phân bổ đánh giá</h3>
                  <div className="grid grid-cols-5 gap-4">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div 
                        key={rating} 
                        className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
                      >
                        <span>{rating} Sao</span>
                        <span className="font-bold">
                          {therapistAnalytics.ratingDistribution[rating] || 0}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Therapist Details Tab */}
            <TabsContent value="details">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Tổng số unique người dùng </h3>
                      <p className="text-sm text-gray-500">
                        {new Set(feedbacks.map(f => f.user_id)).size}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* If no therapist is selected */}
      {!selectedTherapistId && therapists.length > 0 && (
        <div className="text-center text-gray-500 p-4">
          Vui lòng chọn một chuyên gia để xem chi tiết phản hồi
        </div>
      )}
    </div>
  );
};

export default TherapistFeedbackManagement;