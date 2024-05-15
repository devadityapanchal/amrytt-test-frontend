import { axiosPost } from "../axios/config";

export const register = (data: object) => {
  return axiosPost("auth/register", data);
};

export const login = (data: object) => {
  return axiosPost("auth/login", data);
};
