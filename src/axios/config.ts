import axios from "axios";
import { Store } from "redux";
import { ToastShow } from "../redux/slices/ToastSlice";
import { setLogoutData } from "../redux/slices/AuthSlice";

const setupAxios = (store: Store) => {
  axios.interceptors.request.use(
    (request: any) => {
      const storeData = store.getState();
      const authToken = storeData.auth.token;
      if (authToken) {
        request.headers.Authorization = `${authToken}`;
      }
      return request;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  axios.interceptors.response.use(
    (res) => {
      const toast = res.data?.toast;
      if (toast) {
        store.dispatch(
          ToastShow({
            message: res.data?.message,
            type: res.data?.responseType,
          })
        );
      }
      return res;
    },
    (err) => {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        const toast = err.response?.data?.toast;
        if (toast) {
          store.dispatch(
            ToastShow({
              message: err.response?.data?.message,
              type: err.response?.data?.responseType,
            })
          );
        }
        if (err.response?.status === 401) {
          store.dispatch(setLogoutData());

          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        }
        return Promise.reject(new Error("Bad status code"));
      } else {
        return err.response;
      }
    }
  );
};

export default setupAxios;

export function axiosGet<T>(url: string, data: T | null = null) {
  return axios.get(`${process.env.REACT_APP_API_URL}${url}`, {
    params: data,
  });
}

export function axiosPost<T>(url: string, data: T | object) {
  return axios.post(`${process.env.REACT_APP_API_URL}${url}`, data);
}

export const axiosConfig = (
  method: string,
  url: string,
  config: any,
  data: object
) => {
  return axios({
    method: method,
    url: `${process.env.REACT_APP_API_URL}${url}`,
    ...config,
    data,
  });
};

export const axiosPatch = (url: string, data: object) => {
  return axios.patch(`${process.env.REACT_APP_API_URL}${url}`, data);
};

export const axiosPut = (url: string, data: object) => {
  return axios.put(`${process.env.REACT_APP_API_URL}${url}`, data);
};

export const axiosDelete = (url: string) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}${url}`);
};
