import api from "./api";

const getAll = () => api.get(`${api.url.userlink}`);
const getbyId = id =>api.get(`${api.url.userlink}/${id}`);

export default {
  getAll,
  getbyId
};