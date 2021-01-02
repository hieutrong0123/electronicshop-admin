import React, { Component } from "react";
import {
  CCard,
  CDataTable,
  CButton
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import categoryservice_json from "src/service/categoryservice_json";

class Categories extends Component {
  state = { list: null };

  componentDidMount() {
    this.loadData();
  }
  loadData() {
    categoryservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ list: res.data.resultObj});
          console.log(res)
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  }

  details = id => {
    this.props.history.push(`/categories/${id}`);
  };

  render() {
    const fields = [
      { key: "id", _classes: "font-weight-bold" },
      "name",
      "alias",
      "productTypeId",
      "createdDate",
      "createdBy",
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

export default Categories;