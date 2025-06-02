import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

export interface IApplication {
  _id: string;
  user: string;
  company_name: string;
  position: string;
  location: string;
  status: string;
  applied_date: Date;
  job_url: string;
  notes: string;
  created_at: Date;
  updated_at: Date;
}

interface IUserState {
  onboardingCompleted: boolean;
  user: any | null;
  loading: boolean;
  isLoggedin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  applications: IApplication[] | null;
}

const initialState: IUserState = {
  onboardingCompleted: false,
  user: null,
  loading: false,
  isLoggedin: false,
  accessToken: null,
  refreshToken: null,
  applications: [],
};

const userStore = combine(initialState, (set) => ({
  setOnboardingCompleted: (onboardingCompleted: boolean) =>
    set((state) => ({ onboardingCompleted: onboardingCompleted })),
  setUser: (user: any) => set((state) => ({ user: user, isLoggedin: true })),
  removeUser: () => set((state) => ({ user: null })),
  setLoading: (loading: boolean) => set((state) => ({ loading: loading })),
  setIsLoggedin: (isLoggedin: boolean) =>
    set((state) => ({ isLoggedin: isLoggedin })),

  setAccessToken: (accessToken: string | null) =>
    set((state) => ({ accessToken: accessToken })),
  setRefreshToken: (refreshToken: string | null) =>
    set((state) => ({ refreshToken: refreshToken })),

  setApplications: (applications: IApplication[] | null) =>
    set((state) => ({ applications: applications })),
}));

export const useUserStore = create(
  persist(userStore, {
    name: "user-store",
    storage: createJSONStorage(() => AsyncStorage),
  })
);
