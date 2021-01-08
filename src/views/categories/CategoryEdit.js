import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputRadio,
  CLabel,
  CSelect,
  CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import categoryservice_json from "src/service/categoryservice_json";

class CategoryEdit extends Component {
  state = {
    id: "",
    name: "",
    alias: "",
    rootId: "",
    productTypeId: "",
    categoryList: null,
    loading: true
  };

  componentDidMount() {
    this.loadData();
  }

  changeHandler = e => {
    if(e.target.name === 'productTypeId')
    {
      this.setState({ productTypeId: Number(e.target.value) });
      console.log(this.state.productTypeId);
      console.log(typeof this.state.productTypeId);
    } else if (e.target.name === "name") {
      this.setState({ name: e.target.value });
      this.setState({ alias: this.to_slug(e.target.value) });
      console.log(this.state.alias);
    } else {
      this.setState({ [e.target.name]: e.target.value });
      console.log(e.target.value);
    }
  };

  to_slug(str) {
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();
    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");
    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, "");
    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, "-");
    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, "");
    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, "");
    // return
    return str;
  }

  cancel() {
    this.props.history.push("/categories");
  }

  submitHandler() {
    const data = {
      id: this.state.id,
      name: this.state.name,
      alias: this.state.alias,
      rootId: this.state.rootId,
      productTypeId: this.state.productTypeId
    };
    console.log(data);
    categoryservice_json
      .updatebyId(data)
      .then(res => {
        if (res.data.isSuccessed) {
          alert(res.data.resultObj);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  }
  loadData() {
    categoryservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ categoryList: res.data.resultObj });
          console.log(this.state.categoryList);
        } else {
          alert(res.dat.message);
        }
      })
      .catch(err => console.log(err));
    categoryservice_json
      .getbyId(this.props.match.params.id)
      .then(res => {
        if (res.data.isSuccessed) {
          if (res.data.resultObj !== null) {
            if (res.data.resultObj.modifiedDate !== null) {
              this.setState({
                modifiedDate: res.data.resultObj.modifiedDate.substring(0, 10)
              });
            } else {
              this.setState({
                modifiedDate: res.data.resultObj.modifiedDate
              });
            }
            this.setState({
              id: res.data.resultObj.id,
              name: res.data.resultObj.name,
              alias: res.data.resultObj.alias,
              productTypeId: res.data.resultObj.productTypeId,
              rootId: res.data.resultObj.rootId,
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
      <>
        <CRow>
          <CCol xs="12" md="10">
            <CCard>
              <CCardHeader>
                Category Edit
                <small></small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
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
                      <CLabel htmlFor="text-input">Name</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Alias</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="alias"
                        placeholder="Alias"
                        value={this.state.alias}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>
                  
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">Root Category</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {this.state.categoryList === null ? (
                        <h3>Waiting...</h3>
                      ) : (
                        <CSelect
                          name="rootId"
                          onChange={this.changeHandler}
                        >
                          <option
                            key={Number(0)}
                            value=""
                            selected={this.state.rootId === null}
                          >
                            Choose
                          </option>
                          {this.state.categoryList.map(item => {
                            if(item.rootId === null){
                              return (
                                <option
                                  value={item.id}
                                  selected={this.state.rootId === item.id}
                                  key={item.id}
                                >
                                  {item.name}
                                </option>
                              );
                            }
                            else{
                              return(<></>);
                            }
                          })}
                        </CSelect>
                      )}
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                  <CCol md="3">
                    <CLabel>Product Type</CLabel>
                  </CCol>
                  <CCol md="9">
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Smart Phone"
                        name="productTypeId"
                        onChange={this.changeHandler}
                        value = {Number(1)}
                        checked={this.state.productTypeId === 1}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Smart Phone">
                      Smart Phone
                      </CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-radio" inline>
                      <CInputRadio
                        custom
                        id="Laptop"
                        name="productTypeId"
                        onChange={this.changeHandler}
                        value={Number(2)}
                        checked={this.state.productTypeId === 2}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="Laptop">
                      Laptop
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

export default CategoryEdit;
