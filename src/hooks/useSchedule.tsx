import { useState, useEffect } from "react";
import { scheduleService } from "@/services/scheduleService";
import { Availability } from "@/types/schedule";

export const useAvailability = (condition: boolean, date: string) => {
    const [data, setData] = useState<Availability[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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

    return { data, isLoading, error };
};
