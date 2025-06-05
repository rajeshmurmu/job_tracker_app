import _config from "@/config/appConfig";
import { useUserStore } from "@/store/store";
import axios from "axios";

const getAxiosInstance = (base_url?: string) => {
  const axiosInstance = axios.create({
    baseURL: base_url || `${_config.server_base_url}/api/v1`,
    // withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // auto refresh accessToken
  let isRefreshing = false;
  let failedRequests: any[] = [];

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      // If access token expired
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          // Wait for refresh to finish
          return new Promise((resolve, reject) => {
            failedRequests.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return axiosInstance(originalRequest);
          });
        }

        isRefreshing = true;

        try {
          // const refreshToken = useUserStore.getState().refreshToken;
          const response = await axios.get(
            `${_config.server_base_url}/api/v1/refresh-token`
          );

          const newAccessToken = response.data.accessToken;
          useUserStore.getState().setAccessToken(newAccessToken);

          // Retry failed requests
          failedRequests.forEach((req) => req.resolve(newAccessToken));
          failedRequests = [];

          originalRequest.headers.Authorization = "Bearer " + newAccessToken;
          return axiosInstance(originalRequest);
        } catch (err) {
          useUserStore.getState().setIsLoggedin(false); // Logout if refresh also fails
          useUserStore.getState().setOnboardingCompleted(false); // Logout if refresh also fails
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  // Add accessToken to all requests
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = useUserStore.getState().accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default getAxiosInstance;
