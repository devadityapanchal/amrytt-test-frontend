import { axiosGet } from "../axios/config";

export const getProfileInSights = (data: object) => {
  return axiosGet("profile/insights", data);
};

export const getProfiles = (data: object) => {
  return axiosGet("profile", data);
};

export const getProfileDetails = (id: string, data: object) => {
  return axiosGet(`profile/${id}`, data);
};
