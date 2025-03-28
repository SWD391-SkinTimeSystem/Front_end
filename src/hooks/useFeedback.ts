import { useState } from "react";
import { feedbackService } from "@/services/feedbackService";
import { Feedback } from "@/types/feedback";

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const postFeedback = async (feedbackData: Feedback) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const data = await feedbackService.createService(feedbackData);
      setFeedback(data);
      setSuccess(true);
      return data;
    } catch (err) {
      setError("Failed to post feedback");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { feedback,success, loading, error, postFeedback };
};
