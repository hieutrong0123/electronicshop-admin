import React, { useState, useEffect, Component } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CCollapse
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import productservice_json from "src/service/productservice_json";

class Products extends Component {
  state = { list: null };

  componentDidMount() {
    this.loadData();
  }
  loadData() {
    productservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ list: res.data.resultObj });
          console.log(res)
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  }

  details = id => {
    this.props.history.push(`/products/${id}`);
  };

  render() {
    const fields = [
      { key: "id", _classes: "font-weight-bold" },
      "name",
      "price",
      "specifications",
      "description",
      "goodsReceipt",
      "inventory",
      "status",
      "alias",
      // { key: "productPhotos[0].url", label: "ProductPhotos" },
      { key: "link", label: "Action" }
      // "link"
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
                    <CIcon name="cil-scrubber" /> Details
                  </CButton>
                </td>
              );
            }
          }}
        />
      </CCard>
    );
  }
}

export default Products;