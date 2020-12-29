import React, { Component } from "react";
import userservice from "src/service/userservice";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

class UserDetails extends Component {
  //state = { list: null }
  state = {
    id: "",
    userName: "",
    email: "",
    birthday: "",
    firstMiddleName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    address: "",
    status: "",
    userInRole: "",
    loading: true
  };

  componentDidMount() {
    this.loadData();
  }

  changeHandler = e => {
    //Do Nothing
  };

  cancel() {
    this.props.history.push("/users");
  }

  edit() {
    this.props.history.push(`/users/edit/${this.state.id}`);
  }

  delete() {
    userservice
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
  }

  disable() {
    userservice
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
  }

  loadData() {
    userservice
      .getbyId(this.props.match.params.id)
      .then(res => {
        if (res.data.isSuccessed) {
          if (res.data.resultObj !== null) {
            this.setState({
              id: res.data.resultObj.id,
              userName: res.data.resultObj.userName,
              email: res.data.resultObj.email,
              birthday: res.data.resultObj.birthday.substring(0, 10),
              firstMiddleName: res.data.resultObj.firstMiddleName,
              lastName: res.data.resultObj.lastName,
              phoneNumber: res.data.resultObj.phoneNumber,
              gender: res.data.resultObj.gender,
              address: res.data.resultObj.address,
              status: res.data.resultObj.status,
              userInRole: res.data.resultObj.userInRole,
              loading: false
            });
          }
          console.log(res);
          console.log(this.state);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    return this.state.loading === true ? (
      <h1>Loading</h1>
    ) : (
      <CRow>
        <CCol xs="12" md="10">
          <CCard>
            <CCardHeader>
              User Details
              <small></small>
            </CCardHeader>
            <CCardBody>
              <CForm encType="multipart/form-data" className="form-horizontal">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Id</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="id"
                      placeholder="Id"
                      value={this.state.id}
                      onChange={this.changeHandler}
                      disabled
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">UserName</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="userName"
                      placeholder="UserName"
                      value={this.state.userName}
                      onChange={this.changeHandler}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="email-input">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      autoComplete="email"
                      value={this.state.email}
                      onChange={this.changeHandler}
                    />
                    <CFormText className="help-block">
                      Please enter your email
                    </CFormText>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Birthday</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      type="date"
                      name="birthday"
                      placeholder="Birthday"
                      value={this.state.birthday}
                      onChange={this.changeHandler}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Last Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="lastName"
                      placeholder="Last Name"
                      value={this.state.lastName}
                      onChange={this.changeHandler}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">First Middle Name</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="firstMiddleName"
                      placeholder="First Middle Name"
                      value={this.state.firstMiddleName}
                      onChange={this.changeHandler}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Phone Number</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={this.state.phoneNumber}
                      onChange={this.changeHandler}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Gender</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Male"
                        name="gender"
                        onChange={this.changeHandler}
                        value = {Number(0)}
                        checked={this.state.gender === 0}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Male">
                        Male
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Female"
                        name="gender"
                        onChange={this.changeHandler}
                        value={Number(1)}
                        checked={this.state.gender === 1}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Female">
                        Female
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="text-input">Address</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput
                      name="address"
                      placeholder="Address"
                      value={this.state.address}
                      onChange={this.changeHandler}
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Status</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Active"
                        name="status"
                        onChange={this.changeHandler}
                        value={Number(0)}
                        checked={this.state.status === 0}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Active">
                        Active
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Disable"
                        name="status"
                        onChange={this.changeHandler}
                        value={Number(1)}
                        checked={this.state.status === 1}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Disable">
                        Disable
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Delete"
                        name="status"
                        onChange={this.changeHandler}
                        value={Number(2)}
                        checked={this.state.status === 2}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Delete">
                        Delete
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel>User Role</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Admin"
                        name="userInRole"
                        onChange={this.changeHandler}
                        value="Admin"
                        checked={this.state.userInRole === "Admin"}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Admin">
                        Admin
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Employee"
                        name="userInRole"
                        onChange={this.changeHandler}
                        value="Employee"
                        checked={this.state.userInRole === "Employee"}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Employee">
                        Employee
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="User"
                        name="userInRole"
                        onChange={this.changeHandler}
                        value="User"
                        checked={this.state.userInRole === "User"}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="User">
                        User
                      </CLabel>
                    </CFormGroup>
                  </CCol>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton size="sm" color="primary" onClick={() => this.edit()}>
                <CIcon name="cil-scrubber" /> Edit
              </CButton>
              <CButton></CButton>
              <CButton
                type="reset"
                size="sm"
                color="danger"
                onClick={() => this.delete()}
              >
                <CIcon name="cil-ban" /> Delete
              </CButton>
              <CButton></CButton>
              <CButton
                type="reset"
                size="sm"
                color="danger"
                onClick={() => this.disable()}
              >
                <CIcon name="cil-ban" /> Disable
              </CButton>
              <CButton></CButton>
              <CButton color="secondary" onClick={() => this.cancel()}>
                Cancel
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    );
  }
}

export default UserDetails;
