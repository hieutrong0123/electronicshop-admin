import React, { Component } from "react";
import Cookies from "js-cookie";
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
import loginservice_json from "src/service/loginservice_json";
import jwt_decode from "jwt-decode";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      rememberme: true,
      history: ""
    };
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler() {
    const data = {
      email: this.state.email,
      password: this.state.password,
      rememberme: this.state.rememberme
    };
    console.log(data);
    // loginservice.login(this.state).then(res=>{Cookies.set('auth',res.data.resultObj); console.log(res)}).catch(err => console.log(err))
    //loginservice.login(this.state).then(res=>{ Cookies.set('Token',res.data.resultObj); console.log(res)}).catch(err => console.log(err))
    // loginservice_json
    //   .login(data)
    //   .then(res => {
    //     if (res.data.isSuccessed) {
    //       Cookies.set("Token", res.data.resultObj);
    //       Cookies.set("Role", res.data.message);
    //       if (res.data.message === "Admin") {
    //         window.location.href = "/";

    //         console.log(res);
    //         console.log(res.status);
    //       }
    //       else
    //       {
    //         alert("Tài khoản không có quyền quản trị viên");
    //       }
    //     } else {
    //       alert(res.data.message);
    //     }
    //   })
    //   .catch(err => console.log(err));
    loginservice_json
      .login(data)
      .then(res => {
        if (res.data.isSuccessed) {

          Cookies.set("Token", res.data.resultObj);
          // Cookies.set("Role", res.data.message);
          let tokenDecode = jwt_decode(res.data.resultObj);
          let Role = "";
          Object.keys(tokenDecode).forEach(function (key){
            let res = key.split("/");
            if (res.length > 1){
              if(res[res.length -1] === 'role'){
                Role = tokenDecode[key]; 
              }
            }
          });
          console.log(Role);

          if (res.data.message === "Admin") {
            window.location.href = "/";

            console.log(res);
            console.log(res.status);
          }
          else
          {
            alert("Tài khoản không có quyền quản trị viên");
          }
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    if (this.checkRole()) this.props.history.push("/");
  }

  // checkRole = () => {
  //   const Authentication = "Admin";
  //   if (Cookies.get("Role") === null) return false;
  //   if (Cookies.get("Token") === null) return false;
  //   if (Cookies.get(".AspNetCore.Session") === null) return false;
  //   const Role = Cookies.get("Role");
  //   console.log(Authentication);
  //   console.log(Role);
  //   return Authentication === Role;
  // };
  tokenDecode = () => {
    let Role = null;
    const token = Cookies.get("Token");
    if (token !== null && token !== undefined) {
      let tokenDecode = jwt_decode(token);
      Object.keys(tokenDecode).forEach(function(key) {
        let res = key.split("/");
        if (res.length > 1) {
          if (res[res.length - 1] === "role") {
            Role = tokenDecode[key];
          }
        }
      });
    }
    console.log(Role);
    return Role;
  };

  checkRole = () => {
    const Authentication = "Admin";
    const CheckRole = this.tokenDecode();
    if (Cookies.get("Token") === null) return false;
    if (Cookies.get(".AspNetCore.Session") === null) return false;
    console.log(Authentication);
    console.log(CheckRole);
    return Authentication === CheckRole;
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="4">
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
                            onClick={() => this.submitHandler()}
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
                {/* <CCard
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
                </CCard> */}
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );
  }
}

export default Login;
