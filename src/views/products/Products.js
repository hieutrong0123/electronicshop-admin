import React, { Component } from "react";
import {
  CCard,
  CDataTable,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import productservice_json from "src/service/productservice_json";

class Products extends Component {
  state = { list: null, toggleDelete: false, id: null };

  escFunction = this.escFunction.bind(this);

  componentDidMount() {
    this.loadData();
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  loadData() {
    productservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ list: res.data.resultObj });
          console.log(res);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err =>alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  details = id => {
    this.props.history.push(`/products/${id}`);
  };

  edit = id => {
    this.props.history.push(`/products/edit/${id}`);
  };

  delete() {
    this.setState({ toggleDelete: false });
    productservice_json
      .deletebyId(this.state.id)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.resultObj);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err =>alert("Máy chủ đang bận, vui lòng thử lại sau"));
  }

  toggleDelete = id => {
    this.setState({ toggleDelete: true, id: id });
  };

  escFunction(event) {
    if (event.keyCode === 27) {
      this.setState({ toggleDelete: false });
    }
  }

  render() {
    const fields = [
      { key: "id", label: "Mã sản phẩm" },
      { key: "name", label: "Tên sản phẩm" },
      { key: "price", label: "Giá bán" },
      { key: "goodsReceipt", label: "Số lượng nhập" },
      { key: "inventory", label: "Số lượng tồn" },
      { key: "alias", label: "Bí danh" },
      { key: "link", label: "Tuỳ chọn" }
    ];
    return this.state.list === null ? null : (
      <CCard>
        <CDataTable
          items={this.state.list}
          fields={fields}
          // columnFilter
          tableFilter
          //footer
          itemsPerPageSelect
          itemsPerPage={5}
          hover
          pagination
          scopedSlots={{
            link: item => {
              return (
                <td>
                  <CButton
                    size="sm"
                    color="primary"
                    onClick={() => this.details(item.id)}
                  >
                    <CIcon name="cil-scrubber" /> Chi tiết
                  </CButton>
                  &nbsp;&nbsp;&nbsp;
                  <CButton
                  size="sm" 
                  color="success" 
                  onClick={() => this.edit(item.id)}>
                    <CIcon name="cil-settings" /> Cập nhật
                  </CButton>
                  &nbsp;&nbsp;&nbsp;
                  <CButton
                    size="sm"
                    color="danger"
                    onClick={() => this.toggleDelete(item.id)}
                  >
                    <CIcon name="cil-ban" /> Xoá
                  </CButton>
                </td>
              );
            }
          }}
        />

        <CModal show={this.state.toggleDelete}>
          <CModalHeader>Dừng lại!</CModalHeader>
          <CModalBody>Sản phẩm #{this.state.id} sẽ bị xoá</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => this.delete()}>
              OK
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                this.setState({ toggleDelete: false });
              }}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
      </CCard>
    );
  }
}

export default Products;
