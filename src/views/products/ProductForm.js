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

var fs = require("fs");

class ProductForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: "",
      Price: "",
      Specifications: "",
      Description: "",
      GoodsReceipt: "",
      Inventory: "",
      Status: "",
      CategoryId: "",
      Alias: "",
      ThumbnailImages: []
    };
    this.submitHandler = this.submitHandler.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    $(".custom-file-input").change(function() {
      console.log(this.files[0]);
    });
  }

  changeHandler = e => {
    if (e.target.name === "ThumbnailImages") {
      let arr = e.target.files;
      console.log(arr);
      this.setState({ ThumbnailImages: e.target.files[0] }, () =>
        console.log(this.state.ThumbnailImages)
      );
    } else {
      this.setState({ [e.target.name]: e.target.value });
      console.log(e.target.value);
    }
  };
  cancel() {
    this.props.history.push("/products");
  }

  async submitHandler() {
  //   const url = `http://localhost:5001/api/Products/create`;
  //   const formData = new FormData();
  //   formData.append("body", this.state);
  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data"
  //     }
  //   };
  //   return post(url, formData, config);
  // }
var FormData = require('form-data');
var data = new FormData();
data.append('Name', this.state.Name);
data.append('Price', this.state.Price);
data.append('Specifications', this.state.Specifications);
data.append('Description', this.state.Description);
data.append('GoodsReceipt', this.state.GoodsReceipt);
data.append('Inventory', this.state.Inventory);
data.append('Status', this.state.Status);
data.append('CategoryId', this.state.CategoryId);
data.append('Alias', this.state.Alias);
data.append('ThumbnailImages', this.state.ThumbnailImages);
  console.log(data);
  // const config = {
  //       headers: {
  //         "content-type": "multipart/form-data"
  //       }
  //     };
  productservice.create(data)
  .then(res=>{alert('Success')})
  .catch(err => console.log(err))
  };
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
                        name="Name"
                        placeholder="Name"
                        value={this.state.Name}
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
                        name="Price"
                        placeholder="Price"
                        value={this.state.Price}
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
                        name="Specifications"
                        rows="3"
                        placeholder="Specifications"
                        value={this.state.Specifications}
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
                        name="Description"
                        rows="3"
                        placeholder="Description"
                        value={this.state.Description}
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
                        name="GoodsReceipt"
                        placeholder="GoodsReceipt"
                        value={this.state.GoodsReceipt}
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
                        name="Inventory"
                        placeholder="Inventory"
                        value={this.state.Inventory}
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
                          name="Status"
                          onChange={this.changeHandler}
                          value={0}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="Status">
                          Active
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="Status"
                          name="Status"
                          onChange={this.changeHandler}
                          value={1}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="Female">
                          Delete
                        </CLabel>
                      </CFormGroup>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">CategoryId</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="CategoryId"
                        placeholder="CategoryId"
                        value={this.state.CategoryId}
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
                        name="Alias"
                        placeholder="Alias"
                        value={this.state.Alias}
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
                        name="ThumbnailImages"
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
