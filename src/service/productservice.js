import api from "./api_formdata";

// const getAll = () => api.get(`${api.url.userlink}`);
// const getbyId = id =>api.get(`${api.url.userlink}/${id}`);
const create = data => api.post(`${api.url.productlink}/create`,data);

export default {
  // getAll,
  // getbyId,
  create
};