import React, { useState, useEffect, useMemo } from 'react';
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardContent 
  } from "@/components/ui/card";
  
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  
import { Input } from "@/components/ui/input";
  
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
  
import { 
    Star, 
    Filter, 
    Search, 
    Calendar, 
    BarChart,
    Loader2 
} from 'lucide-react';

const FeedbackManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });

  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://swd291-api.duckdns.org/api/feedback');
        
        if (!response.ok) {
          throw new Error('Failed to fetch feedback data');
        }
        
        const result = await response.json();
        
        if (result.success && result.data) {
          const formattedFeedbacks = result.data.map(feedback => ({
            ...feedback,
            service_review: feedback.servicet_review || feedback.service_review
          }));
          
          setFeedbacks(formattedFeedbacks);
        } else {
          throw new Error(result.message || 'Unknown error occurred');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching feedbacks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter(feedback => {
      const matchesSearch = searchTerm 
        ? (feedback.therapist_review.toLowerCase().includes(searchTerm.toLowerCase()) ||
           feedback.service_review.toLowerCase().includes(searchTerm.toLowerCase()))
        : true;

      const matchesRating = filterRating === 'all' 
        ? true 
        : (feedback.therapist_rating === parseInt(filterRating) || 
           feedback.service_rating === parseInt(filterRating));

      const matchesDateRange = (dateRange.from && dateRange.to)
        ? (new Date(feedback.date) >= new Date(dateRange.from) && 
           new Date(feedback.date) <= new Date(dateRange.to))
        : true;

      return matchesSearch && matchesRating && matchesDateRange;
    });
  }, [searchTerm, filterRating, dateRange, feedbacks]);

  const feedbackAnalytics = useMemo(() => {
    const totalFeedbacks = filteredFeedbacks.length;
    const avgTherapistRating = totalFeedbacks > 0 
      ? filteredFeedbacks.reduce((sum, f) => sum + f.therapist_rating, 0) / totalFeedbacks 
      : 0;
    const avgServiceRating = totalFeedbacks > 0
      ? filteredFeedbacks.reduce((sum, f) => sum + f.service_rating, 0) / totalFeedbacks
      : 0;

    return {
      totalFeedbacks,
      avgTherapistRating: avgTherapistRating.toFixed(1),
      avgServiceRating: avgServiceRating.toFixed(1)
    };
  }, [filteredFeedbacks]);

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
        Không thể tải dữ liệu phản hồi. Vui lòng thử lại sau.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Analytics Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số phản hồi</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbackAnalytics.totalFeedbacks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đánh giá TB Therapist</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbackAnalytics.avgTherapistRating}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đánh giá TB Dịch vụ</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbackAnalytics.avgServiceRating}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtering and Search */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-grow">
          <Input 
            className="pl-10" 
            placeholder="Tìm kiếm phản hồi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select 
          value={filterRating} 
          onValueChange={setFilterRating}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lọc theo đánh giá" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả đánh giá</SelectItem>
            {[1,2,3,4,5].map(rating => (
              <SelectItem key={rating} value={rating.toString()}>
                {rating} Sao
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Feedback List with Pagination */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Danh sách phản hồi</TabsTrigger>
          <TabsTrigger value="analytics">Phân tích chi tiết</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          {/* Paginated Feedback List */}
          <div className="space-y-4">
            {filteredFeedbacks.map(feedback => (
              <Card key={feedback.review_id}>
                {/* Feedback card content */}
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Phản hồi Therapist</h3>
                      <p>{feedback.therapist_review}</p>
                      <div className="flex items-center mt-2">
                        {[...Array(feedback.therapist_rating)].map((_, i) => (
                          <Star key={i} className="text-yellow-500 w-4 h-4" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{feedback.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          {/* Detailed Analytics View */}
          <Card>
            <CardContent>
              {/* Advanced charts and analytics would be placed here */}
              <p>Báo cáo phân tích chi tiết</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeedbackManagement;