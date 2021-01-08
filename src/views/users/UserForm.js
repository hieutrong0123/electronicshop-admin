import React, { Component } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CInputRadio,
  CLabel,
  CRow
}from '@coreui/react'
import CIcon from '@coreui/icons-react';
import userservice_json from 'src/service/userservice_json';

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
      firstMiddleName: "",
      lastName: "",
      birthday: "2020-12-12",
      gender: 0,
      address: "",
      phoneNumber: "",
      userInRole: "User"
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  changeHandler = e => {
    if(e.target.name === 'gender')
    {
      this.setState({ gender: Number(e.target.value) });
      console.log(this.state.gender);
      console.log(typeof this.state.gender);
    }
    else if (e.target.name === 'status')
    {
      this.setState({ status: Number(e.target.value) });
      console.log(this.state.status);
      console.log(typeof this.state.status);
    }
    else
    {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  cancel() {
    this.props.history.push("/users");
  }

  submitHandler() {
    if (!this.state.email) {
      alert("Email error");
    }
    else if(!this.state.password){
      alert("Please enter password with 8-10 characters with characters,numbers,1 upper case letter and special characters");
    }
    else if(this.state.password !== this.state.confirmPassword){
      alert("Passwords do not match");
    }
    else if(!this.state.birthday){
      alert("Birthday error");
    }
    else if(!this.state.gender){
      alert("Gender error");
    }
    else if(!this.state.userInRole){
      alert("User Role error");
    }
     else {
      const data = {
        userName: this.state.userName,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword,
        firstMiddleName: this.state.firstMiddleName,
        email: this.state.email,
        lastName: this.state.lastName,
        birthday: this.state.birthday,
        gender: this.state.gender,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        userInRole: this.state.userInRole
      };
      console.log(data);
      userservice_json
        .create(data)
        .then(res => {
          if (res.data.isSuccessed) {
            alert(res.data.resultObj);
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => console.log(err));
    }
  }
  render() {
    return (
      <>
        <CRow>
          <CCol xs="12" md="10">
            <CCard>
              <CCardHeader>
                Users Form
                <small></small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Username</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="userName"
                        placeholder="Username"
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
                      <CLabel htmlFor="password-input">Password</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        value={this.state.password}
                        onChange={this.changeHandler}
                      />
                      <CFormText className="help-block">
                      Please enter password with 8-10 characters with characters,numbers,1 upper case letter and special characters
                      </CFormText>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="password-input">Confirm Password</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        autoComplete="new-password"
                        value={this.state.confirmPassword}
                        onChange={this.changeHandler}
                      />
                      <CFormText className="help-block">
                        Please enter password again
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
                          value={Number(0)}
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
      </>
    );
  }
}

export default UserForm;