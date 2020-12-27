import api from "./api_json";

const getAll = () => api.get(`${api.url.userlink}`);
const getbyId = id =>api.get(`${api.url.userlink}/${id}`);
const create = data => api.post(`${api.url.userlink}/create`,data);
const deletebyId = id =>api.delete(`${api.url.userlink}/delete/${id}`);
const disablebyId = id =>api.put(`${api.url.userlink}/disable/${id}`);
const updatebyId =  data => api.put(`${api.url.userlink}/update`,data);

export default {
  getAll,
  getbyId,
  create,
  updatebyId,
  deletebyId,
  disablebyId
};