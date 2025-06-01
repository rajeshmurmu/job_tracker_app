import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  onboardingCompleted: boolean;
  user: any | null;
  loading: boolean;
  isLoggedin: boolean;
}

const initialState: UserState = {
  onboardingCompleted: true,
  user: null,
  loading: false,
  isLoggedin: false,
};

const userStore = combine(initialState, (set) => ({
  setOnboardingCompleted: (onboardingCompleted: boolean) =>
    set((state) => ({ onboardingCompleted: onboardingCompleted })),
  setUser: (user: any) => set((state) => ({ user: user, isLoggedin: true })),
  removeUser: () => set((state) => ({ user: null })),
  setLoading: (loading: boolean) => set((state) => ({ loading: loading })),
  setIsLoggedin: (isLoggedin: boolean) =>
    set((state) => ({ isLoggedin: isLoggedin })),
}));

export const useUserStore = create(
  persist(userStore, {
    name: "user-store",
    storage: createJSONStorage(() => AsyncStorage),
  })
);
