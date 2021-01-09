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
  CInputFile,
  CLabel,
  CSelect,
  CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import productphotoservice_formdata from "src/service/productphotoservice_formdata";
import productservice_json from "src/service/productservice_json";

class ProductPhotoCreate extends Component {
  state = {
    productId: "",
    thumbnailImages: [],
    productList: null,
    categoryList: null,
    categoryId: ""
  };
  submitHandler = this.submitHandler.bind(this);
  cancel = this.cancel.bind(this);

  componentDidMount() {
    this.setState({ productId: this.props.location.productId});
    this.loadData();
  };

  loadData() {
    productservice_json
      .getAll()
      .then(res => {
        if (res.data.isSuccessed) {
          this.setState({ productList: res.data.resultObj });
          console.log(this.state.productList);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  }

  changeHandler = e => {
    if (e.target.name === "thumbnailImages") {
      let arr = e.target.files;
      console.log(arr);
      this.setState({ thumbnailImages: e.target.files[0] }, () =>
        console.log(this.state.thumbnailImages)
      );
    } else {
      this.setState({ [e.target.name]: e.target.value });
      console.log(e.target.value);
    }
  };

  cancel() {
    this.props.history.push(`/productphotos/productid/${this.state.productId}`);
  }

  async submitHandler() {
    if (!this.state.productId) {
      alert("Product Id error");
    } else if (!this.state.thumbnailImages) {
      alert("ThumbnailImages error");
    } else {
      var FormData = require("form-data");
      var data = new FormData();
      data.append("ProductId", this.state.productId);
      data.append("ThumbnailImages", this.state.thumbnailImages);
      console.log(this.state.productId, this.state.thumbnailImages);

      productphotoservice_formdata
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
                Thêm hình ảnh cho sản phẩm
                <small></small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="select">ProductId</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {this.state.productList === null ? (
                        <h3>Đang tải</h3>
                      ) : (
                        <CSelect name="productId" onChange={this.changeHandler}>
                          <option
                            key={Number(0)}
                            value=""
                            selected={this.state.productId === ""}
                          >
                            Lựa chọn
                          </option>
                          {this.state.productList.map(item => {
                            return (
                              <option
                                value={item.id}
                                selected={this.state.productId === item.id}
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

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Hình ảnh</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInputFile
                        type="file"
                        id="ThumbnailImages"
                        name="thumbnailImages"
                        multiple
                        custom
                        accept=".jpg, .jpeg, .png"
                        onChange={this.changeHandler}
                      />
                      <CLabel htmlFor="ThumbnailImages" variant="custom-file">
                      Chọn một hoặc nhiều
                      </CLabel>
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
                  <CIcon name="cil-scrubber" /> Thêm hình ảnh
                </CButton>
                <CButton></CButton>
                <CButton
                  size="sm"
                  color="dark"
                  onClick={() => this.cancel()}
                >
                  <CIcon name="cil-home" />
                  Huỷ bỏ và trở về danh sách
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default ProductPhotoCreate;
