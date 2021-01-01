import api from "./api_json";

const getAll = () => api.get(`${api.url.categorylink}`);

export default {
  getAll
};