import React, { Component } from "react";
import $ from "jquery";
import { post } from "axios";

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
import userservice from "src/service/userservice";
import productservice from "src/service/productservice";
import categoryservice from "src/service/categoryservice";

var fs = require("fs");

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: "",
      specifications: "",
      description: "",
      goodsReceipt: "",
      inventory: "",
      status: 0,
      categoryId: "",
      alias: "",
      thumbnailImages: [],
      categoryList: null
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    $(".custom-file-input").change(function() {
      console.log(this.files[0]);
    });
    this.loadData();
  }

  loadData() {
    categoryservice
      .getAll()
      .then(res => {
        this.setState({ categoryList: res.data.resultObj }, () =>
          console.log(this.state.categoryList)
        );
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
    }
    if (e.target.name === 'status')
    {
      this.setState({ status: Number(e.target.value) });
      console.log(this.state.status);
      console.log(typeof this.state.status);
    }
     else {
      this.setState({ [e.target.name]: e.target.value });
      console.log(e.target.value);
    }
  };
  cancel() {
    this.props.history.push("/products");
  }

  async submitHandler() {
    if (!this.state.name) {
      alert("Name error");
    }
    else if(!this.state.price){
      alert("Price error");
    }
    else if(!this.state.specifications){
      alert("Specifications error");
    }
    else if(!this.state.goodsReceipt){
      alert("GoodsReceipt error");
    }
    else if(!this.state.inventory){
      alert("Inventory error");
    }
    else if(!this.state.description){
      alert("Description error");
    }
    else if(!this.state.categoryId){
      alert("CategoryId error");
    }
    else if(!this.state.alias){
      alert("Alias error");
    }
    else if(!this.state.thumbnailImages){
      alert("ThumbnailImages error");
    }
    else{

      var FormData = require("form-data");
      var data = new FormData();
      data.append("Name", this.state.name);
      data.append("Price", this.state.price);
      data.append("Specifications", this.state.specifications);
      data.append("Description", this.state.description);
      data.append("GoodsReceipt", this.state.goodsReceipt);
      data.append("Inventory", this.state.inventory);
      data.append("Status", this.state.Status);
      data.append("CategoryId", this.state.categoryId);
      data.append("Alias", this.state.alias);
      data.append("ThumbnailImages", this.state.thumbnailImages);
      console.log(data);

      productservice
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
                Products Create
                <small></small>
              </CCardHeader>
              <CCardBody>
                <CForm
                  encType="multipart/form-data"
                  className="form-horizontal"
                >
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
                          id="Status"
                          name="status"
                          onChange={this.changeHandler}
                          value={Number(0)}
                          checked={this.state.status === 0}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="Status">
                          Active
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="Status"
                          name="status"
                          onChange={this.changeHandler}
                          value={Number(1)}
                          checked={this.state.status === 1}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="Status">
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
                          key = {Number(0)}
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
                                key = {item.id}
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
                      <CLabel>ThumbnailImages</CLabel>
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
                        ThumbnailImages
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

export default ProductForm;