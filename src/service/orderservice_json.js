import api from "./api_json";

const getAll = () => api.get(`${api.url.orderlink}`);
const getbyId = id =>api.get(`${api.url.orderlink}/${id}`);
const changeStatus = id => api.post(`${api.url.orderlink}/${id}/change-status`);
const canclebyId = id =>api.post(`${api.url.orderlink}/cancle-order/id=${id}`);
const sellingProducts = (month, year) =>api.get(`${api.url.orderlink}/sellingProducts/m=${month}/y=${year}`);

export default {
  getAll,
  getbyId,
  changeStatus,
  canclebyId,
  sellingProducts
};