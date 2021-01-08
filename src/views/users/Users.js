import React, { Component } from "react";
import {
  CCard,
  CDataTable,
  CButton
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

import userservice_json from "src/service/userservice_json";

class UserPage extends Component {
  state = { list: null };

  componentDidMount() {
    this.loadData();
  }
  loadData() {
      userservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ list: res.data.resultObj });
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  }

  details=(id)=>{
    this.props.history.push(`/users/${id}`)
  }

  render() {
    const fields = [
      { key: "id", _classes: "font-weight-bold" },
      "userName",
      "firstMiddleName",
      "lastName",
      "email",
      "phoneNumber",
      { key: "link", label :"Action" },
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
                onClick={() => this.details(item.id)}>
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

export default UserPage;