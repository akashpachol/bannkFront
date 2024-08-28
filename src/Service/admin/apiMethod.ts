
import { apiCall } from "./apiCall";
import { adminUrls } from "../endpoint";


export const deposit = (
  amount
) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${adminUrls.deposit}`;
    

      apiCall("post", url, amount)
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



export const getAllUser = (
id
)=> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${adminUrls.users}`;

      apiCall("get", url, null)
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



export const userDisabled = (
  id
) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${adminUrls.disabled}`;

      apiCall("patch", url, {id})
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










export const getUserDetails = (
id
)=> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${adminUrls.users}/${id}`;

      apiCall("get", url, null)
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