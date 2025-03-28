import { useState } from "react";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Feedback } from "@/types/feedback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFormattedDate } from "@/lib/utils";
import { toast } from "react-toastify";

interface FeedbackProps {
  BookingId: string;
  TherapistName: string;
}
import { useFeedback } from "@/hooks/useFeedback";
const FeedbackModal: React.FC<FeedbackProps> = ({ 
  BookingId, 
  TherapistName 
}) => {
  const [open, setOpen] = useState(false);
  const [therapistRating, setTherapistRating] = useState(0);
  const [therapistFeedback, setTherapistFeedback] = useState('');
  const [serviceRating, setServiceRating] = useState(0);
  const [serviceFeedback, setServiceFeedback] = useState('');
  const { success,loading, error, postFeedback } = useFeedback();
  var date = getFormattedDate();
  const handleSubmit = async () => {
    if(therapistRating === 0 || serviceRating === 0){
      toast.error("Vui lòng đánh giá cho Skin Therapist và Dịch vụ");
      return;
    }
    if(therapistFeedback === '' || serviceFeedback === ''){
      toast.error("Vui lòng viết nhận xét cho Skin Therapist và Dịch vụ");
      return;
    }

    const FeedbackData:Feedback = {
      booking_id: BookingId,
      therapist_rating: therapistRating,
      therapist_review: therapistFeedback,
      service_rating: serviceRating,
      servicet_review: serviceFeedback,
      date: date
    }
    await postFeedback(FeedbackData);
    console.log(FeedbackData);
    // TODO: Implement actual submission logic
    if(success){
      alert("Gửi phản hồi thành công");
    }
    if(error){
      alert("Gửi phản hồi thất bại");
    }
    // Reset form and close modal
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setTherapistRating(0);
    setTherapistFeedback('');
    setServiceRating(0);
    setServiceFeedback('');
  };

  interface StarRatingProps {
    rating: number;
    setRating: (rating: number) => void;
    className?: string;
  }

  const StarRating: React.FC<StarRatingProps> = ({ 
    rating, 
    setRating, 
    className = '' 
  }) => (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={20}
          fill="currentColor"
          className={`cursor-pointer ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          } ${className}`}
          onClick={() => setRating(star)}
        />
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-emerald-700 text-white">Gửi phản hồi</Button>
      </DialogTrigger>

      <DialogContent className="max-w-[1200px] w-full mx-auto">
        <DialogHeader>
          <DialogTitle>
            <span className="relative after:block after:w-full after:h-[2px] after:bg-green-400 after:absolute after:bottom-[-2px] after:left-0">
              Gửi phản hồi
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-row items-start">
          {/* Skin Therapist Feedback Section */}
          <Card className="flex-1 border-l-4 border-r-0 border-emerald-500 shadow-none">
            <CardHeader>
              <CardTitle>{TherapistName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                {/* <Label>Đánh giá</Label> */}
                <StarRating 
                  rating={therapistRating} 
                  setRating={setTherapistRating} 
                />
              </div>

              <div>
                <Label>Nhận xét</Label>
                <Textarea 
                  value={therapistFeedback} 
                  onChange={(e) => setTherapistFeedback(e.target.value)} 
                  placeholder="Viết đánh giá về Skin Therapist..." 
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 resize-none"
                  rows={4} // Đặt số dòng mặc định

                />
              </div>
            </CardContent>
          </Card>

          {/* Service Feedback Section */}
          <Card className="flex-1 border-r-4 border-l-0 border-emerald-500 shadow-none">
            <CardHeader>
              <CardTitle>Đánh giá Dịch vụ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                {/* <Label>Đánh giá</Label> */}
                <StarRating 
                  rating={serviceRating} 
                  setRating={setServiceRating} 
                />
              </div>

              <div>
                <Label>Nhận xét</Label>
                <Textarea 
                  value={serviceFeedback} 
                  onChange={(e) => setServiceFeedback(e.target.value)} 
                  placeholder="Viết đánh giá về dịch vụ..." 
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 resize-none"
                  rows={4} // Đặt số dòng mặc định

                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          
        </div>
        <DialogFooter>
      <div className="flex justify-end space-x-2 mt-4">
            <Button 
              variant="outline" 
              onClick={resetForm}
            >
              Hủy
            </Button>
            <Button className="bg-emerald-800" onClick={handleSubmit}>Gửi phản hồi</Button>
          </div>
      </DialogFooter>
      </DialogContent>
     
    </Dialog>
  );
};

export default FeedbackModal;