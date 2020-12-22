import api from "./api";

const getAll = () => api.get(`${api.url.userlink}`);
const getbyId = id =>api.get(`${api.url.userlink}/${id}`);
const create = data => api.post(`${api.url.userlink}/create`,data);

export default {
  getAll,
  getbyId,
  create
};