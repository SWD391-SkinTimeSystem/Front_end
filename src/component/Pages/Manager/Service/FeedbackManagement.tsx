import React, { useState, useMemo } from 'react';
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
  BarChart 
} from 'lucide-react';

const FeedbackManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });

  const [feedbacks, setFeedbacks] = useState([
    {
        review_id: "3c4d5e6f-3456-7891-1121-cdef34567891",
        user_id: "user-003",
        therapist_rating: 3,
        therapist_review: "It was okay. The therapist was friendly but seemed distracted.",
        service_rating: 4,
        service_review: "Overall good, but could improve scheduling.",
        date: "2025-03-23"
      },
    {
      review_id: "1a2b3c4d-1234-5678-9101-abcdef123456",
      user_id: "user-001",
      therapist_rating: 5,
      therapist_review: "Amazing experience! The therapist was very professional.",
      service_rating: 5,
      service_review: "Super smooth booking process and great service.",
      date: "2025-03-25"
    },
    {
      review_id: "2b3c4d5e-2345-6789-1011-bcdef2345678",
      user_id: "user-002",
      therapist_rating: 4,
      therapist_review: "Very relaxing session, but could have been a bit longer.",
      service_rating: 5,
      service_review: "The app is easy to use and convenient.",
      date: "2025-03-24"
    },
  
    {
      review_id: "4d5e6f7g-4567-8911-1221-def456789123",
      user_id: "user-004",
      therapist_rating: 2,
      therapist_review: "Not satisfied. The therapist seemed inexperienced.",
      service_rating: 3,
      service_review: "Had some trouble with the payment process.",
      date: "2025-03-22"
    },
    {
      review_id: "5e6f7g8h-5678-9111-1321-ef5678912345",
      user_id: "user-005",
      therapist_rating: 5,
      therapist_review: "Best session I’ve ever had! Highly recommend.",
      service_rating: 5,
      service_review: "Great customer support and easy booking.",
      date: "2025-03-21"
    },
    {
      review_id: "6f7g8h9i-6789-1121-1421-f67891234567",
      user_id: "user-006",
      therapist_rating: 3,
      therapist_review: "The therapist was kind but seemed rushed.",
      service_rating: 4,
      service_review: "Good experience, but appointment started late.",
      date: "2025-03-20"
    },
    {
      review_id: "7g8h9i0j-7891-1221-1521-g78912345678",
      user_id: "user-007",
      therapist_rating: 4,
      therapist_review: "Very professional and attentive therapist.",
      service_rating: 5,
      service_review: "Great value for money.",
      date: "2025-03-19"
    },
    {
      review_id: "8h9i0j1k-8911-1321-1621-h89123456789",
      user_id: "user-008",
      therapist_rating: 1,
      therapist_review: "Not a great experience. The therapist was late and unprepared.",
      service_rating: 2,
      service_review: "Difficult to contact support when needed.",
      date: "2025-03-18"
    },
    {
      review_id: "9i0j1k2l-9111-1421-1721-i91234567890",
      user_id: "user-009",
      therapist_rating: 5,
      therapist_review: "Super friendly and knowledgeable therapist!",
      service_rating: 5,
      service_review: "Smooth experience from start to finish.",
      date: "2025-03-17"
    },
    {
      review_id: "0j1k2l3m-1121-1521-1821-j12345678901",
      user_id: "user-010",
      therapist_rating: 4,
      therapist_review: "The therapist was very skilled, but the room was a bit cold.",
      service_rating: 4,
      service_review: "Good service, but waiting time should be reduced.",
      date: "2025-03-16"
    }
  ]);
  

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
    const avgTherapistRating = filteredFeedbacks.reduce((sum, f) => sum + f.therapist_rating, 0) / totalFeedbacks;
    const avgServiceRating = filteredFeedbacks.reduce((sum, f) => sum + f.service_rating, 0) / totalFeedbacks;

    return {
      totalFeedbacks,
      avgTherapistRating: avgTherapistRating.toFixed(1),
      avgServiceRating: avgServiceRating.toFixed(1)
    };
  }, [filteredFeedbacks]);

  return (
    <div className="container mx-auto p-4">
      {/* Analytics Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Feedbacks</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbackAnalytics.totalFeedbacks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Therapist Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feedbackAnalytics.avgTherapistRating}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Service Rating</CardTitle>
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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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