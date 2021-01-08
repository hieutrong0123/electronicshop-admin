import React, { Component } from "react";
import { CCard, CDataTable, CButton } from "@coreui/react";

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
          this.setState({ list: res.data.resultObj });
          console.log(res);
          console.log(this.state.list);
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
      // "productTypeId",
      { key: "productType", label: "Product Type" },
      "createdDate",
      // "createdBy",
      { key: "link", label: "Action" },
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
            },
            productType: item =>{
              return(
                <td>
                  {item.productType.name}
                  </td>

              );
            },
            createdDate: item =>{
              return(
                <td>
                  {item.createdDate.substring(0, 10)}
                  </td>

              );
            },
          }
        }
        />
      </CCard>
    );
  }
}

export default Categories;
