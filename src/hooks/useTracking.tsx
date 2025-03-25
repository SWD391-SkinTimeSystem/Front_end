
import { trackingService } from "@/services/trackingService";
import { useState } from "react";

export const useTracking = () => {
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<string | null>(null);

     const fetchCheckin = async (scheduleId: string, otpInput: string) => {
          try {
               const data = await trackingService.checkinTracking(scheduleId, otpInput);
               return data.data;
          } catch (error) {
               setError("failed to fetch services");
          } finally {
               setLoading(false);
          }
     }

     const fetchCheckout = async (scheduleId: string) => {
          try {
               const data = await trackingService.checkoutTracking(scheduleId);
               return data.data;
          } catch (error) {
               setError("failed to fetch services");
          } finally {
               setLoading(false);
          }
     }
     return { fetchCheckin, fetchCheckout, loading, error };
}