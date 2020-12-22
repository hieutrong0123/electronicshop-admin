import React, { Component } from 'react';
import userservice from 'src/service/userservice';
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
  }from '@coreui/react'

class UserDetails extends Component {
    state = { list: [] }

  componentDidMount(){
    this.loadData();
  }
  loadData(){
    userservice.getbyId(this.props.match.params.id)
    // .then(res => {this.setState({list: res.data.resultObj});console.log(res)} )
    // .catch((err)=> console.log(err))

    .then(res=>{ 
      if(res.data.isSuccessed)
      {
        if(res.data.resultObj !== null)
        {
          this.setState({list: res.data.resultObj});          
        }
        console.log(res)
      }
      else
      {
        alert(res.data.message)
      }
  })
  .catch(err => console.log(err))
    
  }

  

  render() { 
    return (
        <CRow>
      <CCol lg={6}>
        <CCard>
          <CCardHeader>
            User id: {}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {/* {
                    userDetails.map(([key, value], index) => {
                      return (
                        <tr key={index.toString()}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                    })
                  } */}
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    );
    }
}
 
export default UserDetails;