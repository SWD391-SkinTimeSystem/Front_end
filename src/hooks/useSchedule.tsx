import { useState, useEffect } from "react";
import { scheduleService } from "@/services/scheduleService";
import { Availability, rescheduleData, TherapistSchedule } from "@/types/schedule";

export const useAvailability = (condition?: boolean, date?: string) => {
    const [data, setData] = useState<Availability[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [schedule, setSchedule] = useState<TherapistSchedule>();
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
    const getSchedules = async () => {
        try {
            console.log("Get scheduleschedule in Hook...", );
            const response = await scheduleService.getTherapistSchedule();
            setSchedule(response.data);
            return response;
        }
        catch (error) {
            console.error("Error get scheduleschedule:", error);
            throw error;
        }
    }
    return { schedule, doSchedule, data, isLoading, error, success, getSchedules };
};
