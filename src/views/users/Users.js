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
  CPagination
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

const Users = ({list}) => {

  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  //itemsPerPage
  const itemsPerPage = 1

  //pages
  const pages = Math.ceil(list.length/itemsPerPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  return (
    <CRow>
      <CCol xl={11}>
        <CCard>
          <CCardHeader>
            Users List
            <small className="text-muted">
              {" "}
              {itemsPerPage}...{pages}{" "}
            </small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              tableFilter
              items={list}
              fields={[
                { key: "id", _classes: "font-weight-bold" },
                "userName",
                "firstMiddleName",
                "lastName",
                "email",
                "phoneNumber"
              ]}
              hover
              striped
              itemsPerPage={1}
              activePage={page}
              clickableRows
              onRowClick={item => history.push(`/users/${item.id}`)}
              scopedSlots={{
                status: item => (
                  <td>
                    <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
                  </td>
                )
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages = {Math.ceil(list.length/itemsPerPage)}
              doubleArrows={false}
              align="center"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
}