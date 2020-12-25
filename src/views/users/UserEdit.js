import React, { Component } from 'react';
import userservice from 'src/service/userservice';
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
}from '@coreui/react'
import CIcon from '@coreui/icons-react'

class UserEdit extends Component {
  state = {
    id: "",
    userName: "",
    email: "",
    firstMiddleName: "",
    lastName: "",
    birthday: "",
    gender: "",
    phoneNumber: "",
    loading: true
  };

  componentDidMount() {
    this.loadData();
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
              loading: false
            }, ()=> {    const data = this.state;

    console.log(data);});
          }
          console.log(res);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  cancel() {
    this.props.history.push(`/users/${this.state.id}`);
  }

  submitHandler() {
    // const data ={
    //   userName: this.state.email,
    //   firstMiddleName: this.state.firstMiddleName,
    //   email: this.state.email,
    //   lastName: this.state.lastName,
    //   birthday: this.state.birthday,
    //   gender: parseInt(this.state.gender),
    //   phoneNumber: this.state.phoneNumber
    // }
    const data = this.state;

    console.log(data);
    // userservice.create(data)
    // .then(res=>{alert('Thanh cong')})
    // .catch(err => console.log(err))
  }
  render() {
    return this.state.loading === true ? (
      <h1>Loading</h1>
    ) : (
      <CRow>
        <CCol xs="12" md="10">
          <CCard>
            <CCardHeader>
              Users Form
              <small></small>
            </CCardHeader>
            <CCardBody>
              <CForm encType="multipart/form-data" className="form-horizontal">
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
                      value={this.state.userName}
                      onChange={this.changeHandler}
                    />
                    <CFormText className="help-block">
                      Please enter your email
                    </CFormText>
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
                    <CLabel>Gender</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Male"
                        name="gender"
                        onChange={this.changeHandler}
                        value={0}
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
                        value={1}
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
                    <CLabel>User Role</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Admin"
                        name="userInRole"
                        onChange={this.changeHandler}
                        value="Admin Employee"
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
              <CButton
                size="sm"
                color="primary"
                onClick={() => this.submitHandler()}
              >
                <CIcon name="cil-scrubber" /> Submit
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

export default UserEdit;

// const UserForms = () => {
//   const [collapsed, setCollapsed] = React.useState(true)
//   const [showElements, setShowElements] = React.useState(true)

//   return 
// }

// export default UserForms
