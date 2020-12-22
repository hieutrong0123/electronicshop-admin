import React, { useState, useEffect, Component } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CCollapse
} from '@coreui/react'

// import usersData from './UsersData'
import userservice from 'src/service/userservice'


class UserPage extends Component {
  state = { list: [] }

  componentDidMount(){
    this.loadData();
  }
  loadData(){
    userservice.getAll().then(res => {this.setState({list: res.data.resultObj});console.log(res)} ).catch((err)=> console.log(err))
    
  }

  render() { 
    return ( <Users list={this.state.list}/> );
  }
}
 
export default UserPage ;

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

// const Users = ({list}) => {

//   const history = useHistory()
//   const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
//   const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
//   const [page, setPage] = useState(currentPage)

//   const pageChange = newPage => {
//     currentPage !== newPage && history.push(`/users?page=${newPage}`)
//   }

//   useEffect(() => {
//     currentPage !== page && setPage(currentPage)
//   }, [currentPage, page])

//   return (
//     <CRow>
//       <CCol xl={11}>
//         <CCard>
//           {/* <CCardHeader>
//             Users List
//             <small className="text-muted">
//               {" "}
//               {itemsPerPage}...{pages}{" "}
//             </small>
//           </CCardHeader> */}
//           <CCardHeader>
//             Users
//             <small className="text-muted"> example {Number(Math.ceil(list.length/1))}</small>
//           </CCardHeader>
//           <CCardBody>
//             <CDataTable
//               tableFilter
//               items={list}
//               fields={[
//                 { key: "id", _classes: "font-weight-bold" },
//                 "userName",
//                 "firstMiddleName",
//                 "lastName",
//                 "email",
//                 "phoneNumber"
//               ]}
//               hover
//               striped
//               itemsPerPage={1}
//               activePage={page}
//               clickableRows
//               onRowClick={item => history.push(`/users/${item.id}`)}
//               scopedSlots={{
//                 status: item => (
//                   <td>
//                     <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
//                   </td>
//                 )
//               }}
//             />
//           <CPagination
//             activePage={page}
//             onActivePageChange={pageChange}            
//             //pages = {Math.ceil(list.length/1).number()}
//             pages = {12}
//             doubleArrows={false} 
//             align="center"
//           />
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   );
// }

const Users = ({list}) => {

const [details, setDetails] = useState([])
  // const [items, setItems] = useState(usersData)

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }


  const fields = [
    { key: 'id' , _classes: 'font-weight-bold'},
    'userName', 'firstMiddleName', 'lastName', 'email', 'phoneNumber',
    // {
    //   key: 'show_details',
    //   label: '',
    //   _style: { width: '1%' },
    //   sorter: false,
    //   filter: false
    // }
  ]

  const getBadge = (status)=>{
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

  return (
    <CCard>
      <CDataTable
        items={list}
        fields={fields}
        // columnFilter
        tableFilter
        //footer
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          status: item => (
            <td>
              <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
            </td>
          ),
          show_details: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(index);
                  }}
                >
                  {details.includes(index) ? "Hide" : "Show"}
                </CButton>
              </td>
            );
          },
          details: (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <h4>{item.username}</h4>
                  <p className="text-muted">User since: {item.registered}</p>
                  <CButton size="sm" color="info">
                    User Settings
                  </CButton>
                  <CButton size="sm" color="danger" className="ml-1">
                    Delete
                  </CButton>
                </CCardBody>
              </CCollapse>
            );
          }
        }}
      />
    </CCard>
  );
}