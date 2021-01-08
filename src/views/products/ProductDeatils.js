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
  CRow,
  CImg
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import productservice_json from "src/service/productservice_json";
import categoryservice_json from "src/service/categoryservice_json";

class ProductDetails extends Component {
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
    //Do Nothing
  };

  cancel() {
    this.props.history.push("/products");
  }

  edit() {
    this.props.history.push(`/products/edit/${this.state.id}`);
  }

  delete() {
    productservice_json
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
              createdDate: res.data.resultObj.createdDate.substring(0, 10),
              createdBy: res.data.resultObj.createdBy,
              modifiedBy: res.data.resultObj.modifiedBy,
              productPhotos: res.data.resultObj.productPhotos,
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
                          id="Hot"
                          name="status"
                          onChange={this.changeHandler}
                          value={Number(0)}
                          checked={this.state.status === 0}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="Hot">
                        Hot
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="Default"
                          name="status"
                          onChange={this.changeHandler}
                          value={Number(1)}
                          checked={this.state.status === 1}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="Default">
                        Default
                        </CLabel>
                      </CFormGroup>
                      <CFormGroup variant="custom-radio" inline>
                        <CInputRadio
                          custom
                          id="Hidden"
                          name="status"
                          onChange={this.changeHandler}
                          value={Number(1)}
                          checked={this.state.status === 2}
                        />
                        <CLabel variant="custom-checkbox" htmlFor="Hidden">
                        Hidden
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
                          disabled
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
                      <CLabel htmlFor="date-input">CreatedDate</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        type="date"
                        name="createdDate"
                        placeholder="CreatedDate"
                        value={this.state.createdDate}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  {this.state.modifiedDate !== null ? (
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="date-input">ModifiedDate</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          type="date"
                          name="modifiedDate"
                          placeholder="ModifiedDate"
                          value={this.state.modifiedDate}
                          onChange={this.changeHandler}
                        />
                      </CCol>
                    </CFormGroup>
                  ) : null}

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">CreatedBy</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="createdBy"
                        placeholder="CreatedBy"
                        value={this.state.createdBy}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup>

                  {this.state.modifiedBy !== null ? (
                    <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="text-input">ModifiedBy</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput
                          name="modifiedBy"
                          placeholder="ModifiedBy"
                          value={this.state.modifiedBy}
                          onChange={this.changeHandler}
                        />
                      </CCol>
                    </CFormGroup>
                  ) : null}

                  {/* <CFormGroup row>
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
                  </CFormGroup> */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel htmlFor="text-input">ProductPhotos</CLabel>
                    </CCol>
                    <CCol xs="12" md="9" align="center">                          
                    {this.state.productPhotos.map(item => {
                      return (
                            <CImg src={item.url} thumbnail width="250px" />
                            );
                          })}
                          </CCol>
                  </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
              <CButton size="" color="primary" onClick={() => this.edit()}>
                <CIcon name="cil-scrubber" /> Edit
              </CButton>
              <CButton></CButton>
              <CButton
                type="reset"
                size=""
                color="danger"
                onClick={() => this.delete()}
              >
                <CIcon name="cil-ban" /> Delete
              </CButton>
              <CButton></CButton>
              <CButton color="dark" size="" onClick={() => this.cancel()}>
              <CIcon name="cil-home" />Back
              </CButton>
            </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default ProductDetails;
