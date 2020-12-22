import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import loginservice from "src/service/loginservice";

class Login extends Component {
  constructor(props) {

    super(props);

    this.state = {
      email: "",
      password: "",
      rememberme: true,
      history:""
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  submitHandler() {
    const data ={
      email: this.state.email,
      password: this.state.password,
      rememberme: this.state.rememberme
    }
    console.log(data);
    // loginservice.login(this.state).then(res=>{Cookies.set('auth',res.data.resultObj); console.log(res)}).catch(err => console.log(err))
    //loginservice.login(this.state).then(res=>{ Cookies.set('Token',res.data.resultObj); console.log(res)}).catch(err => console.log(err))
    loginservice.login(data)
    .then(res=>{ 
      if(res.data.isSuccessed)
      {
      Cookies.set('Token',res.data.resultObj);
    Cookies.set('Role',res.data.message)
    //const decoded = jwt(res.data.resultObj);    
    //console.log(decoded.Role);
    //this.redirect()
    //this.props.history.push("/")
    window.location.href="/";

    console.log(res)
    console.log(res.status)
      }
      else
      {
        alert(res.data.message)
      }
  })
  .catch(err => console.log(err))
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="8">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          name="email"
                          value={email}
                          onChange={this.changeHandler}
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                        <CInput
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                          value={password}
                          onChange={this.changeHandler}
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs="6">
                          <CButton
                            color="primary"
                            className="px-4"
                            // type="submit"
                            onClick={()=> this.submitHandler()}
                          >
                            Login
                          </CButton>
                        </CCol>
                        <CCol xs="6" className="text-right">
                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: "44%" }}
                >
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <Link to="/register">
                        <CButton
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Login;
