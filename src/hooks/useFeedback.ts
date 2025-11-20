import { useState } from "react";
import { feedbackService } from "@/services/feedbackService";
import { Feedback } from "@/types/feedback";

export const useFeedback = () => {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const postFeedback = async (feedbackData: Feedback) => {
    setLoading(true);
    setError(null);
    try {
      const data = await feedbackService.createService(feedbackData);
      setFeedback(data);
      return data;
    } catch (err) {
      setError("Failed to post feedback");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { feedback, loading, error, postFeedback };
};
