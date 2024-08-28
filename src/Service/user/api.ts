import axios from "axios";
import { store } from "../../redux/app/store";
import { BASE_URL } from "../baseurl";
import { refreshAccessToken } from "../auth/apiMethod";
import { loginSuccess, logout } from "../../redux/slice/UserAuthSlice";
import { toast } from "react-toastify";

export const api = axios.create({
  withCredentials: true,
  baseURL: `${BASE_URL}/`,
});

api.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    const authToken = state.user?.token;

    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


