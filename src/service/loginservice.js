import api from "./api";

const login = data => api.post(`${api.url.authLink}`,data);

export default {
    login
};