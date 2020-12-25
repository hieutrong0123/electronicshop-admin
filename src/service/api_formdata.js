import axios from "axios";
import Cookies from "js-cookie";

const url = {
  /// tat ca cac duong dan thi nam o day
  baseURL: "https://localhost:5001/api",
  authLink: "/Auth",
  userlink: "/Users",
  productlink: "/Products"
};

const Token = Cookies.get("Token");
console.log(Token);

const instance = axios.create({
  withCredentials: true,
  baseURL: url.baseURL,
  origin: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
    Authorization: `Bearer ${Token}`
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
  put: instance.post,
  delete: instance.delete
};
