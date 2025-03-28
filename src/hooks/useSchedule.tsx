import { useState, useEffect } from "react";
import { scheduleService } from "@/services/scheduleService";
import { Availability, rescheduleData } from "@/types/schedule";

export const useAvailability = (condition?: boolean, date?: string) => {
    const [data, setData] = useState<Availability[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    useEffect(() => {
        if (!condition || !date) return; // Chỉ fetch khi condition = true và có date

        const fetchAvailability = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await scheduleService.getAvailabilityByDate(date);
                setData(response);
            } catch (err) {
                setError("Error fetching availability");
            } finally {
                setIsLoading(false);
            }
        };

        fetchAvailability();
    }, [condition, date]); // Chạy lại khi condition hoặc date thay đổi

    const doSchedule = async (data: rescheduleData) => {
        try {
            console.log("Rescheduling in Hook...", data);
            const response = await scheduleService.doReschedule(data);
            return response.data;
        } catch (err) {
            console.error("Error rescheduling:", err);
        }
    }
    return { doSchedule , data, isLoading, error };
};
