import React from "react";
import CIcon from "@coreui/icons-react";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

let defaultNav = [
  {
    _tag: "CSidebarNavItem",
    name: "Trang chủ",
    to: "/",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Thanh điều hướng"]
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Thống kê',
    to: '/widgets',
    icon: 'cil-calculator',
    badge: {
      color: 'info'
    },
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Sản phẩm bán chạy",
        to: "/statistical/sellingProducts"
      },
    ]
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Quản ký sản phẩm",
    icon: "cil-cursor",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Thêm",
        to: "/products/create"
      },
      {
        _tag: "CSidebarNavItem",
        name: "Xem danh sách",
        to: "/products"
      }
    ]
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Quản lý danh mục",
    icon: "cil-star",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Thêm",
        to: "/categories/create"
      },
      {
        _tag: "CSidebarNavItem",
        name: "Xem danh sách",
        to: "/categories"
      }
    ]
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Quản lý đơn hàng",
    icon: "cil-bell",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Thêm đơn hàng",
        to: "/orders/create"
      },
      {
        _tag: "CSidebarNavItem",
        name: "Xem danh sách và duyệt đơn",
        to: "/orders"
      }
    ]
  }
];

const adminAddOn = {
  _tag: "CSidebarNavDropdown",
  name: "Quản lý người dùng",
  icon: "cil-puzzle",
  _children: [
    {
      _tag: "CSidebarNavItem",
      name: "Thêm",
      to: "/users/create"
    },
    {
      _tag: "CSidebarNavItem",
      name: "Xem danh sách",
      to: "/users"
    },
    {
      _tag: "CSidebarNavItem",
      name: "Thống kê lượt đăng nhập",
      to: "/statistical/loginhistory"
    }
  ]
};

const returnByAuth = () => {
  let Role = null;
  const token = Cookies.get("Token");
  if (token !== null && token !== undefined) {
    let tokenDecode = jwt_decode(token);
    Object.keys(tokenDecode).forEach(function(key) {
      let res = key.split("/");
      if (res.length > 1) {
        if (res[res.length - 1] === "role") {
          Role = tokenDecode[key];
        }
      }
    });
  }
  console.log(Role);
  if (Role === "Admin") {
    defaultNav.push(adminAddOn)
    return defaultNav;
  } else if (Role === "Emp") {
    return defaultNav;
  }
};

export default returnByAuth;
