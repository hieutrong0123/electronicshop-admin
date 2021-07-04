import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CInputRadio,
  CLabel,
  CRow,
  CTextarea,
  CDataTable
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import productservice_json from "src/service/productservice_json";
import orderdetailservice_json from "src/service/orderdetailservice_json";

class OrderCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receiver: "",
      phoneNumber: "",
      email: "email@example.com",
      totalMoney: 0,
      note: "",
      orderDetails: [{ productId: 0, quantity: 0, total: 0 }],
      listOrderDetails: [],
      productNameItem: "",
      productIdItem: "",
      quantityItem: "",
      productPriceItem: 0,
      loadingProductById: true
    };
  }

  changeHandler = e => {
    if (e.target.name === "productIdItem") {
      this.setState({ productIdItem: Number(e.target.value) });
    } else if (e.target.name === "quantityItem") {
      this.setState({ quantityItem: Number(e.target.value) });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  cancel() {
    this.props.history.push("/orders");
  }

  validateEmail(email) {
    if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return true;
    }
    return false;
  }
  submitHandlerProduct() {
    if (!this.state.productIdItem) {
      alert("Mã sản phẩm không đúng định dạng");
    } 
    else if (!this.state.quantityItem) {
      alert("Số lượng sản phẩm không đúng định dạng");
    } 
    else
    {
      productservice_json
        .getbyId(this.state.productIdItem)
        .then(res => {
          if (res.data.isSuccessed) {
            if (res.data.resultObj !== null) {
              this.setState({
                productNameItem: res.data.resultObj.name,
                productPriceItem: res.data.resultObj.price
              });
            }
            console.log("loadingProductById", this.state.loadingProductById);
            this.setListOrderDetail();
            console.log("setListOrderDetail");
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
    }
  }

  setListOrderDetail() {
    const listObject = {
      productId: this.state.productIdItem,
      productName: this.state.productNameItem,
      productQuantity: this.state.quantityItem,
      productPrice: this.state.productPriceItem,
      total: this.state.productPriceItem * this.state.quantityItem
    };
    console.log(listObject);
    this.setState({
      listOrderDetails: this.state.listOrderDetails.concat(listObject)
    });
    console.log(this.state.listOrderDetails);
  }

  edit = () => {
    let newListOrderDetails = this.state.listOrderDetails,
      objIndex = newListOrderDetails.findIndex(
        obj => obj.productId == this.state.productIdItem
      );
    newListOrderDetails[objIndex].productQuantity = this.state.quantityItem;
    newListOrderDetails[objIndex].total =
      this.state.productPriceItem * this.state.quantityItem;
    this.setState({ listOrderDetails: newListOrderDetails });
  };

  delete() {
    const listOrderDetails = this.state.listOrderDetails.filter(
      item => item.productId !== this.state.productIdItem
    );
    this.setState({ listOrderDetails });
  }

  submitHandler() {
    let totalPrice = this.state.listOrderDetails.reduce(function(
      accumulator,
      item
    ) {
      return accumulator + item.productQuantity * item.productPrice;
    },
    0);

    if (!this.validateEmail(this.state.email)) {
      alert("Email không đúng định dạng");
    } else if (!this.state.phoneNumber) {
      alert("Số điện thoại không đúng định dạng");
    } else if (this.state.receiver == "") {
      alert("Vui lòng nhập tên khách hàng");
    } else {
      const data = {
        receiver: this.state.receiver,
        phoneNumber: this.state.phoneNumber,
        email: this.state.email,
        totalMoney: totalPrice,
        note: this.state.note,
        orderDetails: this.state.listOrderDetails
      };
      console.log(data);
      orderdetailservice_json
        .emp_create(data)
        .then(res => {
          if (res.data.isSuccessed) {
            alert("Thêm đơn hàng thành công");
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
    }
  }
  render() {
    const fields = [
      { key: "productId", label: "Mã sản phẩm" },
      { key: "productName", label: "Tên sản phẩm" },
      { key: "productQuantity", label: "Số lượng" },
      { key: "productPrice", label: "Giá" },
      { key: "total", label: "Tổng cộng" }
    ];
    return (
      <>
        <CRow>
          <CCol xs="12" md="10">
            <CCard>
              <CCardHeader>
                Thêm đơn hàng
                <small></small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Tên khách hàng *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="receiver"
                        placeholder="Họ và tên lót"
                        value={this.state.receiver}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Số điện thoại *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="number"
                        name="phoneNumber"
                        placeholder="0987654321"
                        value={this.state.phoneNumber}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="email-input">Email *</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        autoComplete="email"
                        value={this.state.email}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">Ghi chú</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea
                        name="note"
                        rows="3"
                        placeholder="Ghi chú thông tin khác"
                        value={this.state.note}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Danh sách sản phẩm</CLabel>
                    </CCol>

                    <CCol xs="12" md="12">
                      <CCard>
                        <CCardHeader>
                          Lần lượt thêm sản phẩm
                          <small></small>
                        </CCardHeader>
                        <CCardBody>
                          <CForm
                            encType="multipart/form-data"
                            className="form-horizontal"
                          >
                            <CFormGroup row>
                              <CCol md="3">
                                <CLabel htmlFor="text-input">
                                  Mã sản phẩm *
                                </CLabel>
                              </CCol>
                              <CCol xs="12" md="9">
                                <CInput
                                  type="number"
                                  name="productIdItem"
                                  placeholder="123"
                                  value={this.state.productIdItem}
                                  onChange={this.changeHandler}
                                />
                              </CCol>
                            </CFormGroup>

                            <CFormGroup row>
                              <CCol md="3">
                                <CLabel htmlFor="text-input">Số lượng *</CLabel>
                              </CCol>
                              <CCol xs="12" md="9">
                                <CInput
                                  type="number"
                                  name="quantityItem"
                                  placeholder="10"
                                  value={this.state.quantityItem}
                                  onChange={this.changeHandler}
                                />
                              </CCol>
                            </CFormGroup>
                          </CForm>
                        </CCardBody>
                        <CCardFooter>
                          <CButton
                            size="sm"
                            color="primary"
                            onClick={() => this.submitHandlerProduct()}
                          >
                            <CIcon name="cil-scrubber" /> Thêm sản phẩm
                          </CButton>
                          &nbsp;&nbsp;&nbsp;
                          <CButton
                            size="sm"
                            color="success"
                            onClick={() => this.edit()}
                          >
                            <CIcon name="cil-settings" /> Cập nhật sản phẩm
                          </CButton>
                          &nbsp;&nbsp;&nbsp;
                          <CButton
                            size="sm"
                            color="danger"
                            onClick={() => this.delete()}
                          >
                            <CIcon name="cil-ban" /> Xoá sản phẩm
                          </CButton>
                        </CCardFooter>
                      </CCard>
                    </CCol>
                  </CFormGroup>

                  <CDataTable
                    items={this.state.listOrderDetails}
                    fields={fields}
                    hover
                    scopedSlots={{
                      productId: item => {
                        return <td>{item.productId}</td>;
                      },
                      productName: item => {
                        return <td>{item.productName}</td>;
                      },
                      productQuantity: item => {
                        return <td>{item.productQuantity}</td>;
                      },
                      productPrice: item => {
                        return <td>{item.productPrice}</td>;
                      },
                      total: item => {
                        return <td>{item.total}</td>;
                      }
                    }}
                  />
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton
                  size="sm"
                  color="primary"
                  onClick={() => this.submitHandler()}
                >
                  <CIcon name="cil-scrubber" /> Thêm đơn hàng
                </CButton>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <CButton
                  size="sm"
                  color="secondary"
                  onClick={() => this.cancel()}
                >
                  <CIcon name="cil-home" />
                  Huỷ bỏ và trở về danh sách
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default OrderCreate;
