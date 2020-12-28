import axios from "axios";
import Cookies from "js-cookie";

const url = {
  /// tat ca cac duong dan thi nam o day
  baseURL: "https://localhost:5001/api",
  authLink: "/Auth",
  userlink: "/Users",
  productlink: "/Products",
  categorylink: "/Categories"
};

const Token = Cookies.get("Token");
console.log(Token);

const instance = axios.create({
  withCredentials: true,
  baseURL: url.baseURL,
  origin: true,
  headers: {
    "Content-Type": "application/json",
    //"Content-Type": "multipart/form-data",
    Accept: "application/json",
    // "Access-Control-Allow-Credentials": true
    //"Authorization": `Bearer ${cookieUlti.getCookie("Token")}`,
    Authorization: `Bearer ${Token}`

    // 'Cookie': `.AspNetCore.Identity.Application=${cookieUlti.getCookie(".AspNetCore.Identity.Application")}`
  }
});


axios.interceptors.request.use(request => {
  console.log("Starting Request", JSON.stringify(request, null, 2));
  return request;
});

export default {
  url: url,
  axios: instance,
  get: instance.get,
  post: instance.post,
  put: instance.put,
  delete: instance.delete
};