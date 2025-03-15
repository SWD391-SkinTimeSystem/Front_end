import { useState } from "react";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { BookingDetail } from "@/types/booking";
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
interface FeedbackProps {
  BookingId: string;
  TherapistName: string;
}
const FeedbackModal: React.FC<FeedbackProps> = ({ BookingId,
  TherapistName }) => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"skinTherapist" | "booking">("skinTherapist");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    console.log({
      type: selectedType,
      name,
      rating,
      feedback,
    });
    alert("Phản hồi đã được gửi!");
    setOpen(false); // Đóng popup sau khi gửi
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Nút mở popup */}
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-emerald-700 text-white">Gửi phản hồi</Button>
      </DialogTrigger>

      {/* Nội dung popup */}
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Gửi phản hồi</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Chọn đối tượng đánh giá */}
          {/* <div>
            <Label>Chọn đối tượng</Label>
            <Select onValueChange={(value: string) => setSelectedType(value as "skinTherapist" | "booking")} defaultValue={selectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn đối tượng" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="skinTherapist">Skin Therapist</SelectItem>
                <SelectItem value="booking">Booking</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* Nhập tên */}
          <div>
            <Label>Họ và tên</Label>
            <p>{TherapistName}</p>
            {/* <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập tên của bạn" /> */}
          </div>

          {/* Đánh giá sao */}
          <div>
            <Label>Đánh giá</Label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={15}
                  fill="currentColor"
                  className={`mt-2 cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          {/* Nhập nhận xét */}
          <div>
            <Label>Nhận xét</Label>
            <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Viết đánh giá của bạn..." />
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSubmit}>Gửi phản hồi</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;
