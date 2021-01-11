import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Trang chủ',
    to: '/',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    
  },
  
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Thanh điều hướng']
  },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Quản lý người dùng',
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Thêm',
  //       to: '/users/create',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Xem danh sách',
  //       to: '/users',
  //     },      
  //   ],
  // },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản ký sản phẩm',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Thêm',
        to: '/products/create',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Xem danh sách',
        to: '/products',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lý danh mục',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Thêm',
        to: '/categories/create',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách',
        to: '/categories',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Quản lý đơn hàng',
    icon: 'cil-bell',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Danh sách',
        to: '/orders',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Duyệt đơn',
        to: '/orders',
      },
    ]
  },
]

