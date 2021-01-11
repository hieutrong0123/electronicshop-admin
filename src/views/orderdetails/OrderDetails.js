import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
  CDataTable
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import orderservice_json from "src/service/orderservice_json";
import userservice_json from "src/service/userservice_json";
import orderdetailservice_json from "src/service/orderdetailservice_json";
import productservice_json from "src/service/productservice_json";

class OrderDetails extends Component {
  state = {
    id: "",
    createdDate: "",
    deliveryDate: "",
    paid: "",
    receiver: "",
    receiversAddress: "",
    phoneNumber: "",
    totalMoney: "",
    statusId: "",
    userId: null,
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    customerPhoneNumber: "",
    loadingOrderById: true,
    loadingUserById: true,
    loadingOrderDetails: true,
    loadingProduct: true,
    listOrderDetails: null,
    listProduct: null,
    OrderStatus: [
      "",
      "Đặt hàng thành công",
      "Đã tiếp nhận",
      "Đang lấy hàng",
      "Đóng gói xong",
      "Bàn giao vận chuyển",
      "Đang vận chuyển",
      "Giao hàng thành công",
      "Đơn hàng bị huỷ"
    ]
  };

  componentDidMount() {
    this.loadOrderById();
  }

  changeHandler = e => {
    //Do Nothing
  };

  print() {
    var printContents = document.getElementById("print").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }

  cancel() {
    this.props.history.push("/orders");
  }

  loadOrderById() {
    orderservice_json
      .getbyId(this.props.match.params.id)
      .then(res => {
        if (res.data.isSuccessed) {
          if (res.data.resultObj !== null) {
            this.setState({
              id: res.data.resultObj.id,
              createdDate: res.data.resultObj.createdDate.substring(0, 10),
              deliveryDate: res.data.resultObj.deliveryDate.substring(0, 10),
              paid: res.data.resultObj.paid,
              receiver: res.data.resultObj.receiver,
              receiversAddress: res.data.resultObj.receiversAddress,
              phoneNumber: res.data.resultObj.phoneNumber,
              totalMoney: res.data.resultObj.totalMoney,
              statusId: res.data.resultObj.statusId,
              userId: res.data.resultObj.userId,
              loadingOrderById: false
            });
          }
          this.loadUserById();
          console.log("loadingOrderById", this.state.loadingOrderById);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  }

  loadUserById() {
    userservice_json
      .getbyId(this.state.userId)
      .then(res => {
        if (res.data.isSuccessed) {
          if (res.data.resultObj !== null) {
            this.setState({
              customerName: `${res.data.resultObj.firstMiddleName} ${res.data.resultObj.lastName}`,
              customerAddress: res.data.resultObj.address,
              customerEmail: res.data.resultObj.email,
              customerPhoneNumber: res.data.resultObj.phoneNumber,
              loadingUserById: false
            });
          }
          this.loadOrderDetails();
          console.log("loadingUserById", this.state.loadingUserById);
          console.log(res.data.resultObj);
        } else {
          alert(res.dat.message);
        }
      })
      .catch(err => console.log(err));
  }

  loadOrderDetails() {
    orderdetailservice_json
      .getbyId(this.state.id)
      .then(res => {
        if (res.data.isSuccessed) {
          if (res.data.resultObj !== null) {
            this.setState({
              listOrderDetails: res.data.resultObj,
              loadingOrderDetails: false
            });
          }
          this.loadProduct();
          console.log("loadingOrderDetails", this.state.loadingOrderDetails);
        } else {
          alert(res.dat.message);
        }
      })
      .catch(err => console.log(err));
  }

  loadProduct() {
    productservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          if (res.data.resultObj !== null) {
            this.setState({
              listProduct: res.data.resultObj,
              loadingProduct: false
            });
          }
          console.log("loadingProduct", this.state.loadingProduct);
        } else {
          alert(res.dat.message);
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const fields = [
      { key: "nameproduct", label: "Tên sản phẩm" },
      { key: "quantity", label: "Số lượng" },
      { key: "price", label: "Giá" },
      { key: "total", label: "Tổng cộng" }
    ];
    return this.state.loadingProduct === true ? (
      <h1>Đang tải dữ liệu vui vòng chờ trong giây lát</h1>
    ) : (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Xem chi tiết hoá đơn
                <small></small>
              </CCardHeader>
              <CCardBody id="print">
                <CCardHeader>
                  <div>
                    <h2 className="title">Electronic Shop</h2>
                    <span>Số 1, Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP HCM</span>
                    <br />
                    <span>electronicshop0123@gmail.com</span>
                  </div>
                </CCardHeader>
                <CRow>
                  <CCol xs="8" md="8">
                    <p>
                      <span>Tên khách hàng: </span>
                      {this.state.customerName}
                    </p>
                    <p>
                      <span>Địa chỉ: </span>
                      {this.state.customerAddress}
                    </p>
                    <p>
                      <span>Email: </span>
                      {this.state.customerEmail}
                    </p>
                    <p>
                      <span>Số điện thoại: </span>
                      {this.state.customerPhoneNumber}
                    </p>
                  </CCol>
                  <CCol xs="4" md="4">
                    <p>
                      <span>Số hoá đơn</span> {this.state.id}
                    </p>
                    <p>
                      <span>Ngày tạo: </span>
                      {this.state.createdDate}
                    </p>
                    <p>
                      <span> Ngày giao hàng: </span>
                      {this.state.deliveryDate}
                    </p>
                  </CCol>
                  </CRow>
                  <CDataTable 
                    items={this.state.listOrderDetails}
                    fields={fields}
                    hover
                    scopedSlots={{
                      nameproduct: item => {
                        return <td>{item.product.name}</td>;
                      },
                      total: item => {
                        return <td>{item.quantity * item.price}</td>;
                      }
                    }}
                  />
                <hr />
                <CRow>
                  <CCol xs="9" md="9"></CCol>
                  <CCol xs="3" md="3">
                    <h5>
                      Thành tiền: {this.state.totalMoney}
                    </h5>
                  </CCol>
                </CRow>
                <CCardFooter>
                  <p>Cảm ơn quý khách đã mua hàng tại website của chúng tôi</p>
                  <p>
                    Sản phẩm được đổi trả miễn phí trong vòng 7 ngày (nếu lỗi do
                    nhà sản xuất)
                  </p>
                  <p>Ký bởi Electronic Shop {this.state.createdDate}</p>
                </CCardFooter>
              </CCardBody>
              <CCardFooter>
                <CButton size="sm" color="primary" onClick={() => this.print()}>
                  <CIcon name="cil-settings" /> In hoá đơn
                </CButton>
                &nbsp;&nbsp;&nbsp;
                <CButton color="dark" size="" onClick={() => this.cancel()}>
                  <CIcon name="cil-home" />
                  Trở về danh sách
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default OrderDetails;
