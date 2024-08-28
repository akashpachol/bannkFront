
import { apiCall } from "./apiCall";
import { userUrls } from "../endpoint";


export const deposit = (
  amount
) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${userUrls.deposit}`;
    

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



export const getTransaction = (

)=> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${userUrls.transaction}`;

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



export const withdraw = (
  amount
) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${userUrls.withdraw}`;

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










export const getProductDetails = (
id
)=> {
  return new Promise((resolve, reject) => {
    try {
      const url = `${userUrls.productDetails}/${id}`;

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