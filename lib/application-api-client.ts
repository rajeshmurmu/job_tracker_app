import { AxiosError, AxiosInstance } from "axios";
import _config from "../config/appConfig";
import getAxiosInstance from "./axiosInstance";

const appllicationApi: AxiosInstance = getAxiosInstance(
  `${_config.server_base_url}/api/v1/applications`
);

export const createApplication = async (data: any) => {
  try {
    const response = await appllicationApi.post("/", data);

    if (response?.data?.success === false) {
      throw new Error(response?.data?.message);
    }
    return response.data;
  } catch (error) {
    // handle axios error
    if (error instanceof AxiosError) {
      console.log("Error adding application:", error);
      throw new Error(
        error.response?.data?.message ||
          `${
            error.response?.data?.error &&
            "Please fill all field carefully if this error occured continousily contact us"
          }` ||
          "An error occurred while adding the application"
      );
    }
    console.log("Error adding application:", error);
    throw new Error("An error occurred while adding the application");
  }
};

export const fetchApplications = async () => {
  try {
    const response = await appllicationApi.get(`/`);

    if (response?.data?.success === false) {
      throw new Error(response?.data?.message);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(JSON.stringify(error?.response?.data));
      console.log("Error fetching application:", error);
      throw new Error(
        error.response?.data?.message ||
          `${
            error.response?.data?.error &&
            "Please fill all field carefully if this error occured continousily contact us"
          }` ||
          "An error occurred while fetching the application"
      );
    }
    console.log("Error fetching application:", error);
    throw new Error("An error occurred while fetching the application");
  }
};

export const fetchApplication = async (application_id: any) => {
  try {
    const response = await appllicationApi.get(`/${application_id}`);

    if (response?.data?.success === false) {
      throw new Error(response?.data?.message);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error fetching application:", error);
      throw new Error(
        error.response?.data?.message ||
          `${
            error.response?.data?.error &&
            "Error while fetching application, if this error occured continousily contact us"
          }` ||
          "An error occurred while fetching the application"
      );
    }
    console.log("Error fetching application:", error);
    throw new Error("An error occurred while fetching the application");
  }
};

export const updateApplication = async (data: any) => {
  try {
    const application_id = data.application_id;
    const response = await appllicationApi.put(`/${application_id}`, data);

    if (response?.data?.success === false) {
      throw new Error(response?.data?.message);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error updating application:", error);
      console.log("Error new ", error.response?.data);
      throw new Error(
        error.response?.data?.message ||
          `${
            error.response?.data?.error &&
            "Please fill all field carefully if this error occured continousily contact us"
          }` ||
          "An error occurred while updating the application"
      );
    }
    console.log("Error updating application:", error);
    throw new Error("An error occurred while updating the application");
  }
};

export const deleteApplication = async (application_id: string) => {
  try {
    const response = await appllicationApi.delete(`/${application_id}`);

    if (response?.data?.success === false) {
      throw new Error(response?.data?.message);
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Error deleting application:", error);
      throw new Error(
        error.response?.data?.message ||
          `${
            error.response?.data?.error &&
            "Error while deleting application, if this error occured continousily contact us"
          }` ||
          "An error occurred while deleting the application"
      );
    }
    console.log("Error deleting application:", error);
    throw new Error("An error occurred while deleting the application");
  }
};
