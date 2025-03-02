import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api"; 
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Rating,
  Paper,
} from "@mui/material";

const FeedbackPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>(); 
  const [therapistRating, setTherapistRating] = useState<number | null>(null);
  const [therapistFeedback, setTherapistFeedback] = useState<string>("");
  const [serviceRating, setServiceRating] = useState<number | null>(null);
  const [serviceFeedback, setServiceFeedback] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingId) {
      toast.error("Không tìm thấy ID lịch hẹn!");
      return;
    }

    const feedbackData = {
      bookingId: Number(bookingId), 
      therapistRating,
      therapistFeedback,
      serviceRating,
      serviceFeedback,
    };

    try {
      const response = await api.post("/feedbacks", feedbackData);
      toast.success("Gửi feedback thành công!");
      console.log("Feedback submitted:", response.data);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Lỗi khi gửi feedback, vui lòng thử lại!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, backgroundColor: "#fff", borderRadius: 10 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: "#4caf50", textAlign: "center" }}
          >
            Feedback cho HASAKI
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", mt: 2 }}>
            {/* Feedback về Chuyên viên */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: "#81c784" }}>
                Feedback về Chuyên viên
              </Typography>
              <Rating
                name="therapist-rating"
                value={therapistRating}
                onChange={(event, newValue) => setTherapistRating(newValue)}
                size="large"
                sx={{ fontSize: "3rem", color: "gold", mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Nhận xét về chuyên viên"
                variant="outlined"
                value={therapistFeedback}
                onChange={(e) => setTherapistFeedback(e.target.value)}
                sx={{ backgroundColor: "#fafafa", borderRadius: 10 }}
                InputProps={{ sx: { borderRadius: 10 } }}
              />
            </Box>

            {/* Feedback về Dịch vụ */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="h6" gutterBottom sx={{ color: "#81c784" }}>
                Feedback về Dịch vụ
              </Typography>
              <Rating
                name="service-rating"
                value={serviceRating}
                onChange={(event, newValue) => setServiceRating(newValue)}
                size="large"
                sx={{ fontSize: "3rem", color: "gold", mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Nhận xét về dịch vụ"
                variant="outlined"
                value={serviceFeedback}
                onChange={(e) => setServiceFeedback(e.target.value)}
                sx={{ backgroundColor: "#fafafa", borderRadius: 10 }}
                InputProps={{ sx: { borderRadius: 10 } }}
              />
            </Box>

            {/* Nút Submit */}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button type="submit" variant="contained" color="success" sx={{ px: 4, py: 1 }}>
                Gửi Feedback
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default FeedbackPage;
