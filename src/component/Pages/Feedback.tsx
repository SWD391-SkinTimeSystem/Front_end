import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Rating } from "@mui/material";
import { useFeedback } from "@/hooks/useFeedback";
import { Feedback } from "@/types/feedback";

const FeedbackPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [therapistRating, setTherapistRating] = useState();
  const [therapistFeedback, setTherapistFeedback] = useState<string>("");
  const [serviceRating, setServiceRating] = useState();
  const [serviceFeedback, setServiceFeedback] = useState<string>("");

  // Sử dụng hook useFeedback để có hàm postFeedback call API
  const { postFeedback, loading, error } = useFeedback();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingId) {
      toast.error("Không tìm thấy ID lịch hẹn!");
      return;
    }

    const feedbackData: Feedback = {
      booking_id: bookingId,
      therapist_rating: therapistRating,
      therapist_review: therapistFeedback,
      service_rating: serviceRating,
      service_review: serviceFeedback,
    };

    try {
      const response = await postFeedback(feedbackData);
      toast.success("Gửi feedback thành công!");
      console.log("Feedback submitted:", response);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error("Lỗi khi gửi feedback, vui lòng thử lại!");
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto my-16 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-semibold text-center text-green-600 mb-6">
          Feedback cho HASAKI
        </h1>
        <form onSubmit={handleSubmit} className="w-full mt-4">
          {/* Feedback về Chuyên viên */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-green-500 mb-4">
              Feedback về Chuyên viên
            </h2>
            <Rating
              name="therapist-rating"
              value={therapistRating}
              onChange={(event, newValue) => setTherapistRating(newValue)}
              size="large"
              sx={{ fontSize: "3rem", color: "gold", mb: 2 }}
            />
            <textarea
              className="w-full mt-2 p-2 bg-gray-100 rounded-md border border-gray-300"
              rows={4}
              placeholder="Nhận xét về chuyên viên"
              value={therapistFeedback}
              onChange={(e) => setTherapistFeedback(e.target.value)}
            ></textarea>
          </div>

          {/* Feedback về Dịch vụ */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-green-500 mb-4">
              Feedback về Dịch vụ
            </h2>
            <Rating
              name="service-rating"
              value={serviceRating}
              onChange={(event, newValue) => setServiceRating(newValue)}
              size="large"
              sx={{ fontSize: "3rem", color: "gold", mb: 2 }}
            />
            <textarea
              className="w-full mt-2 p-2 bg-gray-100 rounded-md border border-gray-300"
              rows={4}
              placeholder="Nhận xét về dịch vụ"
              value={serviceFeedback}
              onChange={(e) => setServiceFeedback(e.target.value)}
            ></textarea>
          </div>

          {/* Nút Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi Feedback"}
            </button>
          </div>
          {error && (
            <p className="mt-4 text-center text-red-500">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;


