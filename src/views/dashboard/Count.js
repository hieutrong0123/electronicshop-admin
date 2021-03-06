import React, { Component } from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol
} from "@coreui/react";

import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

import userservice_json from "src/service/userservice_json";
import productservice_json from "src/service/productservice_json";
import categoryservice_json from "src/service/categoryservice_json";
import orderservice_json from "src/service/orderservice_json";

class Count extends Component {
  state = {
    Role: null,
    listUsers: null,
    loadingUser: true,
    listProducts: null,
    loadingProduct: true,
    listCatelogies: null,
    loadingCategory: true,
    listOrders: null,
    loadingOrder: true
  };

  async componentDidMount() {
    await this.checkRole();
    this.loadData();
  }

  checkRole() {
    let Role = null;
    const token = Cookies.get("Token");
    if (token !== null && token !== undefined) {
      let tokenDecode = jwt_decode(token);
      Object.keys(tokenDecode).forEach(function(key) {
        let res = key.split("/");
        if (res.length > 1) {
          if (res[res.length - 1] === "role") {
            Role = tokenDecode[key];
          }
        }
      });
    }
    console.log(Role);
    this.setState({ Role: Role });
  }

  loadData() {
    if (this.state.Role === "Admin") {
      userservice_json
        .getAll()
        .then(res => {
          if (res.data.isSuccessed) {
            this.setState({
              listUsers: res.data.resultObj,
              loadingUser: false
            });
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
    }

    productservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({
            listProducts: res.data.resultObj,
            loadingProduct: false
          });
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));

    categoryservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({
            listCatelogies: res.data.resultObj,
            loadingCategory: false
          });
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));

    orderservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({
            listOrders: res.data.resultObj,
            loadingOrder: false
          });
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }
  render() {
    return (
      <CRow>
        {this.state.loadingUser === false ? (
          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="gradient-primary"
              header={this.state.listUsers.length}
              text="Thành viên"
            ></CWidgetDropdown>
          </CCol>
        ) : null}

        {this.state.loadingProduct === false ? (
          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="gradient-warning"
              header={this.state.listProducts.length}
              text="Sản phẩm"
            ></CWidgetDropdown>
          </CCol>
        ) : null}

        {this.state.loadingCategory === false ? (
          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="gradient-info"
              header={this.state.listCatelogies.length}
              text="Danh mục"              
            ></CWidgetDropdown>
          </CCol>
        ) : null}

        {this.state.loadingOrder === false ? (
          <CCol sm="6" lg="3">
            <CWidgetDropdown
              color="gradient-success"
              header={this.state.listOrders.length}
              text="Đơn hàng"
            ></CWidgetDropdown>
          </CCol>
        ) : null}
      </CRow>
    );
  }
}

export default Count;
