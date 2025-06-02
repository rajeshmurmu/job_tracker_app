import { create } from "zustand";
import { combine } from "zustand/middleware";

interface UserState {
  onboardingCompleted: boolean;
  user: any | null;
  loading: boolean;
  isLoggedin: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: UserState = {
  onboardingCompleted: false,
  user: null,
  loading: false,
  isLoggedin: false,
  accessToken: null,
  refreshToken: null,
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
}));

export const useUserStore = create(
  // persist(userStore, {
  //   name: "user-store",
  //   storage: createJSONStorage(() => AsyncStorage),
  // })
  userStore
);
