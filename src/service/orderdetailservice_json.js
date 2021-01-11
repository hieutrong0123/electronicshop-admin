import api from "./api_json";

const getbyId = id =>api.get(`${api.url.orderdetaillink}/orderId=${id}`);

export default {
  getbyId,
};