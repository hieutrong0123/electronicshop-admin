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

// import usersData from './UsersData'
import userservice from "src/service/userservice";

class UserPage extends Component {
  state = { list: null };

  componentDidMount() {
    this.loadData();
  }
  loadData() {
    userservice
      .getAll()
      .then(res => this.setState({ list: res.data.resultObj }));
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


                  {/* <CButton color="secondary" onClick={() => this.details(item.id)}>
                    Details
                  </CButton> */}
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

// const Users = ({ list }) => {

//   const fields = [
//     { key: "id", _classes: "font-weight-bold" },
//     "userName",
//     "firstMiddleName",
//     "lastName",
//     "email",
//     "phoneNumber",
//     {
//       key: "link"
//     }
//   ];


//   return (
//     <CCard>
//       <CDataTable
//         items={list}
//         fields={fields}
//         // columnFilter
//         tableFilter
//         //footer
//         itemsPerPageSelect
//         itemsPerPage={5}
//         hover
//         sorter
//         pagination
//         scopedSlots={{
//           link: item => {
//             <td>Hello</td>;
//           }
//         }}        
//       />
//     </CCard>
//   );
// };
