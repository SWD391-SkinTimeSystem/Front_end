import { create } from "zustand";
import {User} from "../types/user";
import authService from "@/services/authService";
type AccountState = {
  account: User | null;
  isLoading: boolean;
  error: string | null;
  fetchAccount: () => Promise<void>;
};

export const useAccountStore = create<AccountState>((set) => ({
  account: null,
  isLoading: false,
  error: null,

  fetchAccount: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await authService.getCurrentUser();
      set({ account: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Không thể tải dữ liệu tài khoản", isLoading: false });
    }
  },
}));
