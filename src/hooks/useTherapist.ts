import { useState, useEffect } from "react";
import { therapistService } from "@/services/therapistService";
import { Skintherapist } from "@/types/skintherapist";
import { TherapistAvailabilityResponse } from "@/types/schedule";

export const useTherapist = () => {
  const [therapists, setTherapists] = useState<Skintherapist[]>([]);
  const [schedule, setSchedule] = useState<TherapistAvailabilityResponse | null>(null);
  const [IsTherapistloading, setIsTherapistLoading] = useState<boolean>(true);
  const [IsTherapistError, setIsTherapistError] = useState<string | null>(null);
  const [therapistDetail, setTherapistDetail] = useState<Skintherapist | null>(null);
  const [submitTherapist, setSubmitTherapist] = useState<string | null>(null);
  useEffect(() => {
    const fetchTherapists = async () => {
      setIsTherapistLoading(true);
      setIsTherapistError(null);
      try {
        const data = await therapistService.getListTherapists();
        setTherapists(data);
      } catch (err) {
        setIsTherapistError("Failed to fetch therapists.");
        console.error(err);
      } finally {
        setIsTherapistLoading(false);
      }
    };
    fetchTherapists();
  }, []);

  const fetchTherapistAvailability = async (therapistId?: string) => {
    setIsTherapistError(null);
  
    // Chỉ fetch nếu therapistId tồn tại và không phải là chuỗi rỗng
    if (!therapistId) {
      console.warn("No therapist ID provided, skipping fetch.");
      setSchedule(null); // Reset schedule khi therapist không hợp lệ
      return;
    }
    try {
      const data = await therapistService.getTherapistAvailability(therapistId);
      setSchedule(data);
    } catch (err) {
      setIsTherapistError("Failed to fetch therapist availability.");
      console.error(err);
    }
  };

  const fetchTherapistById = async (id?: string) => {
    if (!id) return; // Chỉ fetch khi có id hợp lệ
    setIsTherapistLoading(true);
    setIsTherapistError(null);
    try {
        const data = await therapistService.getTherapist(id);
        setTherapistDetail(data.data);
    } catch (err) {
      setIsTherapistError("Failed to fetch therapist.");
        console.error(err);
    } finally {
      setIsTherapistLoading(false);
    }
};

const fetchAvailableTherapist = async (date?: string, time?: string, duration?: number) => {
  // Kiểm tra nếu bất kỳ tham số nào bị thiếu
  if (!date || !time || duration === undefined) {
    console.warn("Missing required parameters. Fetch aborted.");
    return null;
  }

  setIsTherapistError(null);
  try {
    const data = await therapistService.getSkinTherapistByDateTime(date, time, duration);
    setSubmitTherapist(data.data.id);
    return data.data.id;
  } catch (err) {
    setIsTherapistError("Failed to fetch available therapists.");
    console.error(err);
    return null;
  }
};


 
  return { therapistDetail, submitTherapist, fetchTherapistById, schedule, therapists, IsTherapistloading, IsTherapistError, fetchTherapistAvailability, fetchAvailableTherapist};
};