import axios from "axios";
import { store } from "../../redux/app/store";
import { BASE_URL } from "../baseurl";

export const api = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}/admin/`,
});

api.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const authToken = state.admin?.token;

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


