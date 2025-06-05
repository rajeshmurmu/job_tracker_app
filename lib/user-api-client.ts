import { AxiosError } from "axios";
import _config from "../config/appConfig";
import getAxiosInstance from "./axiosInstance";

const userApi: any = getAxiosInstance(
  `${_config.server_base_url}/api/v1/users`
);

export const fetchUser = async () => {
  try {
    const response = await userApi.get("/me");

    if (response.data.success === false) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error fetching user:", error);
      throw new Error(
        error?.response?.data?.message || "Error occured while fetching user"
      );
    }
    console.log("Error fetching user:", error);
    throw new Error("Error occured while fetching user");
  }
};

export const updateUser = async (data: any) => {
  try {
    const response = await userApi.put("/me", data);

    if (response.data.success === false) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error updating user:", error);
      throw new Error(
        error?.response?.data?.message || "Error occured while updating user"
      );
    }
    console.log("Error updating user:", error);
    throw new Error("Error occured while updating user");
  }
};

export const uploadAvatar = async (data: any) => {
  try {
    const response = await userApi.put("/me/avatar", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.success === false) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error data", error?.response);
      console.log("Error updating user:", error);
      throw new Error(
        error?.response?.data?.message || "Error occured while updating user"
      );
    }
    console.log("Error updating user:", error);
    throw new Error("Error occured while updating user");
  }
};

export const deleteAvatar = async () => {
  try {
    const response = await userApi.delete("/me/avatar");

    if (response.data.success === false) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error deleting avatar:", error);
      throw new Error(
        error?.response?.data?.message || "Error occured while deleting avatar"
      );
    }
    console.log("Error deleting avatar:", error);
    throw new Error("Error occured while deleting avatar");
  }
};
