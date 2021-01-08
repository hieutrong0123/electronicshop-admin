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
import categoryservice_json from "src/service/categoryservice_json";

class CategoryDetails extends Component {
  state = {
    id: "",
    name: "",
    alias: "",
    rootId: "",
    createdDate: "",
    modifiedDate: "",
    createdBy: "",
    modifiedBy: "",
    productTypeId: "",
    productTypeName: "",
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
    this.props.history.push("/categories");
  }

  edit() {
    this.props.history.push(`/categories/edit/${this.state.id}`);
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
              productTypeName: res.data.resultObj.productType.name,
              createdDate: res.data.resultObj.createdDate.substring(0, 10),
              createdBy: res.data.resultObj.createdBy,
              modifiedBy: res.data.resultObj.modifiedBy,
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
                      <CLabel htmlFor="select">Root Category</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      {this.state.categoryList === null ? (
                        <h3>Waiting...</h3>
                      ) : (
                        <CSelect
                          name="Root Category"
                          onChange={this.changeHandler}
                          disabled
                        >
                          <option
                            key={Number(0)}
                            value=""
                            selected={this.state.rootId === ""}
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
                          })}
                        </CSelect>
                      )}
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
                      <CLabel htmlFor="text-input">Product Type</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        name="productType"
                        placeholder="Product Type"
                        value={this.state.productTypeName}
                        onChange={this.changeHandler}
                      />
                    </CCol>
                  </CFormGroup> */}

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
              <CButton size="" color="primary" onClick={() => this.edit()}>
                <CIcon name="cil-scrubber" /> Edit
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

export default CategoryDetails;
