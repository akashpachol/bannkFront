
import { apiCall } from "./apiCall";
import { authUrls } from "../endpoint";

export const postRegister = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", authUrls.register, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { 
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Somethings wrong." });
    }
  });
};
export const postLogin = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", authUrls.login, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { 
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Somethings wrong." });
    }
  });
};


export const refreshAccessToken = (refreshToken
) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${authUrls.refreshToken}`;
 

      apiCall("post", url, {refreshToken})
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Something wrong" });
    }
  });
};


export const posAdminLogin = (userData) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", authUrls.adminLogin, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => { 
          reject(err);
        });
    } catch (error) {
      resolve({ status: "500", message: "Somethings wrong." });
    }
  });
};
