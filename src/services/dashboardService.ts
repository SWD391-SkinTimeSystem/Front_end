import axiosInstance from "@/lib/axiosInstance";

const API_URL = "/statistic";

export const dashboardService = {
    getRevenue: async (from: string, to: string) => {
        const response = await axiosInstance.get(`${API_URL}/revenue`, {
            params: { from, to }
        });
        if (response.data.success) {
            return response.data.data;
          } else {
            throw new Error(response.data.message);
          }
    },

    getBookingStatus: async (from: string, to: string) => {
      const response = await axiosInstance.get(`${API_URL}/booking/status`, {
          params: { from, to }
      });
      if (response.data.success) {
          return response.data.data;
        } else {
          throw new Error(response.data.message);
        }
  },

    getOverview: async (from: string, to: string) => {
        const response = await axiosInstance.get(`${API_URL}/overview`, {
            params: { from, to }
        });
        if (response.data.success) {
            return response.data.data;
          } else {
            throw new Error(response.data.message);
          }
    },

    getPopularService: async (limit: number) => {
        const response = await axiosInstance.get(`${API_URL}/popular/service`, {
          params: { limit }
        });
        if (response.data.success) {
            return response.data.data;
          } else {
            throw new Error(response.data.message);
          }
    },

    getEventDashboard: async (from: string, to: string) => {
        const response = await axiosInstance.get(`${API_URL}/event`, {
            params: { from, to }
        });
        if (response.data.success) {
            return response.data.data;
          } else {
            throw new Error(response.data.message);
          }
    },

    getEventStatusDashboard: async (from: string, to: string) => {
        const response = await axiosInstance.get(`${API_URL}/event/status`, {
            params: { from, to }
        });
        if (response.data.success) {
            return response.data.data;
          } else {
            throw new Error(response.data.message);
          }
    },
    
}