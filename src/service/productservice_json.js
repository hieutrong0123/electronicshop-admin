import api from "./api_formdata";

const getAll = () => api.get(`${api.url.productlink}`);
const getbyId = id =>api.get(`${api.url.productlink}/${id}`);
const updatebyId =  data => api.put(`${api.url.productlink}/update`,data);

export default {
  getAll,
  getbyId,
  updatebyId,
};