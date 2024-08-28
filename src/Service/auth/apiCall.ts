
import { api } from "./api";

export const apiCall = async (method, url, data) => {
  try {
    let response;

    if (method === "post") {
      response = await api.post(url, data);
    } else if (method === "get") {
      response = await api.get(url);
    } else if (method === "patch") {
      response = await api.patch(url, data);
    }
    return Promise.resolve(response?.data);
  } catch (error) {
    const apiError = error ;
    return Promise.reject(apiError.response.data);
  }
};
