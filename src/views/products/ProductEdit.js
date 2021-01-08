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
  CTextarea,
  CInput,
  CInputRadio,
  CLabel,
  CSelect,
  CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import productservice_json from "src/service/productservice_json";
import categoryservice_json from "src/service/categoryservice_json";

class ProductEdit extends Component {
  //state = { list: null }
  state = {
    id: "",
    name: "",
    price: "",
    specifications: "",
    description: "",
    goodsReceipt: "",
    inventory: "",
    status: "",
    categoryId: "",
    alias: "",
    createdDate: "",
    modifiedDate: null,
    createdBy: "",
    modifiedBy: null,
    productPhotos: [],
    categoryList: null,
    loading: true
  };

  componentDidMount() {
    this.loadData();
  }

  changeHandler = e => {
    if (e.target.name === "thumbnailImages") {
      let arr = e.target.files;
      console.log(arr);
      this.setState({ thumbnailImages: e.target.files[0] }, () =>
        console.log(this.state.thumbnailImages)
      );
    } else if (e.target.name === "status") {
      this.setState({ status: Number(e.target.value) });
      console.log(this.state.status);
      console.log(typeof this.state.status);
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
    this.props.history.push("/products");
  }

  submitHandler() {
    const data = {
      id: this.state.id,
      name: this.state.name,
      price: this.state.price,
      specifications: this.state.specifications,
      description: this.state.description,
      goodsReceipt: this.state.goodsReceipt,
      inventory: this.state.inventory,
      status: this.state.status,
      categoryId: this.state.categoryId,
      alias: this.state.alias
    };
    console.log(data);
    productservice_json
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

    productservice_json
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
              price: res.data.resultObj.price,
              specifications: res.data.resultObj.specifications,
              description: res.data.resultObj.description,
              goodsReceipt: res.data.resultObj.goodsReceipt,
              inventory: res.data.resultObj.inventory,
              status: res.data.resultObj.status,
              categoryId: res.data.resultObj.categoryId,
              alias: res.data.resultObj.alias,
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
                Products Details
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
                      <CLabel htmlFor="text-input">Price</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="price"
                        placeholder="Price"
                        value={this.state.price}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">Specifications</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea
                        name="specifications"
                        rows="3"
                        placeholder="Specifications"
                        value={this.state.specifications}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="textarea-input">Description</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CTextarea
                        name="description"
                        rows="3"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">GoodsReceipt</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="goodsReceipt"
                        placeholder="GoodsReceipt"
                        value={this.state.goodsReceipt}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">Inventory</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="inventory"
                        placeholder="Inventory"
                        value={this.state.inventory}
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
                          id="Delete"
                          name="status"
                          onChange={this.changeHandler}
                          value={Number(1)}
                          checked={this.state.status === 1}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="Delete">
                          Delete
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">CategoryId</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {this.state.categoryList === null ? (
                        <h3>Waiting...</h3>
                      ) : (
                        <CSelect
                          name="categoryId"
                          onChange={this.changeHandler}
                        >
                          <option
                            key={Number(0)}
                            value=""
                            selected={this.state.categoryId === ""}
                          >
                            Choose
                          </option>
                          {this.state.categoryList.map(item => {
                            return (
                              <option
                                value={item.id}
                                selected={this.state.categoryId === item.id}
                                key={item.id}
                              >
                                {item.name}
                              </option>
                            );
                          })}
                        </CSelect>
                      )}
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

export default ProductEdit;
