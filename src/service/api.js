import axios from 'axios';
import cookieUlti from './cookieUlti';
const url ={    /// tat ca cac duong dan thi nam o day
    baseURL: "https://localhost:5001/api",
    authLink: "/Auth",
    userlink: "/Users",
};


const instance = axios.create({
    withCredentials: true,
    baseURL: url.baseURL,
    origin: true,
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    // "Access-Control-Allow-Credentials": true
    "Authorization": `Bearer ${cookieUlti.getCookie("Token")}`,
    // 'Cookie': `.AspNetCore.Identity.Application=${cookieUlti.getCookie(".AspNetCore.Identity.Application")}`
  },
}
);


axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2))
    return request
  })
  
export default {   
    url : url,
    axios: instance,
    get : instance.get,
    post : instance.post,
    put : instance.post,
    delete : instance.delete,
};