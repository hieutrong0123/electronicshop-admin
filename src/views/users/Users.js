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

import userservice_json from "src/service/userservice_json";

class UserPage extends Component {
  state = {
    list: null,
    toggleDelete: false,
    toggleDisable: false,
    id: null
  };

  escFunction = this.escFunction.bind(this);

  componentDidMount() {
    this.loadData();
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
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

  toggleDisable = id => {
    this.setState({ toggleDisable: true, id: id });
  };

  toggleDelete = id => {
    this.setState({ toggleDelete: true, id: id });
  };

  details = id => {
    this.props.history.push(`/users/${id}`);
  };

  edit = id => {
    this.props.history.push(`/users/edit/${id}`);
  };

  disable() {
    this.setState({ toggleDisable: false });
    userservice_json
      .disablebyId(this.state.id)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.resultObj);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };

  delete() {
    this.setState({ toggleDelete: false });
    userservice_json
      .deletebyId(this.state.id)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.resultObj);
          window.location.reload();
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };

  escFunction(event) {
    if (event.keyCode === 27) {
      this.setState({ toggleDisable: false });
      this.setState({ toggleDelete: false });
    }
  }

  render() {
    const fields = [
      { key: "id", label: "Mã người dùng" },
      { key: "userName", label: "Tài khoản" },
      { key: "firstMiddleName", label: "Họ và tên lót" },
      { key: "lastName", label: "Tên" },
      { key: "email", label: "Email" },
      // { key: "phoneNumber", label: "Số điện thoại" },
      { key: "link", label: "Action", _style: { width: "35%" } }
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
                    onClick={() => this.edit(item.id)}
                  >
                    <CIcon name="cil-settings" /> Cập nhật
                  </CButton>
                  &nbsp;&nbsp;&nbsp;
                  <CButton
                    size="sm"
                    color="warning"
                    onClick={() => this.toggleDisable(item.id)}
                  >
                    <CIcon name="cil-x" /> Khoá
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

        <CModal show={this.state.toggleDisable}>
          <CModalHeader>Cảnh báo!</CModalHeader>
          <CModalBody>Người dùng #{this.state.id} sẽ bị khoá</CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={() => this.disable()}>
              OK
            </CButton>
            <CButton
              color="secondary"
              onClick={() => {
                this.setState({ toggleDisable: false });
              }}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        <CModal show={this.state.toggleDelete}>
          <CModalHeader>Dừng lại!</CModalHeader>
          <CModalBody>Người dùng #{this.state.id} sẽ bị xoá</CModalBody>
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

export default UserPage;
