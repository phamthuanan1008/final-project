import React, { useEffect, useState } from "react";
import { linkApi } from "../../../utils/ApiUrl";
import { jwtDecode } from "jwt-decode";
import User from "../../../entity/User";
import { set } from "react-hook-form";

const Header: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [postMenuOpen, setPostMenuOpen] = useState(false);
  const [userHeaderMenuOpen, setUserHeaderMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Thêm state cho sidebar
  const jwt = sessionStorage.getItem("jwtToken");
  const jwtParse = jwt ? jwtDecode(jwt) as any : null;
  const [admin, setAdmin] = useState<boolean>(false);
  useEffect(() => {
    const checkAdmin = async () => {
      if (jwtParse && jwtParse.isAdmin === true) {
        setAdmin(true);
      }
    };

    checkAdmin();
  }, [jwtParse]);
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const jwt = sessionStorage.getItem("jwtToken");
    if (!jwt) {
      window.location.href = "/login";
    }
    const jwtParse = jwt ? jwtDecode(jwt) as any : null;
    const username = jwtParse?.sub;

    fetch(linkApi + `/api/user/get/by/username?username=${username}`)
      .then((res) => res.json())
      .then((data) => { setUser(data.data); })
      .catch((err) => console.error(err))
  }, [])

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const toggleProductMenu = () => {
    setProductMenuOpen(!productMenuOpen);
  };

  const togglePostMenu = () => {
    setPostMenuOpen(!postMenuOpen);
  };
  const toggleUserHeaderMenu = () => {
    setUserHeaderMenuOpen(!userHeaderMenuOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle giá trị của state sidebarOpen
  };

  const logout = () => {
    const confirm = window.confirm("Bạn có chắc chắn muốn logout không")
    if (confirm) {
      sessionStorage.removeItem("jwtToken");
      window.location.href = "/login"
    }
  }
  return (
    <div className={sidebarOpen ? "sidebar-enable" : ""}>
      <div className="navbar-custom">
        <ul className="list-unstyled topnav-menu float-right mb-0">
          <li className="dropdown notification-list">
            <a
              className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light change"
              href="#"
              role="button"
              aria-haspopup="false"
              aria-expanded={userHeaderMenuOpen}
              onClick={toggleUserHeaderMenu}
            >
              <img
                src={user?.imageUrl}
                alt="user-image"
                className="rounded-circle"
              />
              <span className="pro-user-name ml-1">
                {user?.lastName} {user?.firstName}
                <i className="mdi mdi-chevron-down" />
              </span>
            </a>
            <div
              className={
                userHeaderMenuOpen
                  ? "dropdown-menu dropdown-menu-right profile-dropdown show"
                  : "dropdown-menu dropdown-menu-right profile-dropdown"
              }
            >
              <div className="dropdown-item noti-title">
                <h6 className="m-0">Xin chào!</h6>
              </div>
              <a href="/admin-info" className="dropdown-item notify-item">
                <i className="dripicons-user" />
                <span>Thông tin tài khoản</span>
              </a>
              <div className="dropdown-divider" />
              <a onClick={() => logout()} href="#" className="dropdown-item notify-item">
                <i className="dripicons-power" />
                <span>Đăng xuất</span>
              </a>
            </div>
          </li>
        </ul>
        <ul className="list-unstyled menu-left mb-0">
          <li className="float-left">
            <button
              className="button-menu-mobile open-left disable-btn"
              onClick={toggleSidebar}
            >
              <i className="fe-menu" />
            </button>
          </li>
          <li className="app-search d-none d-sm-block">
            <form>
              <div className="input-group">
                <input
                  style={{ backgroundColor: "#333333" }}
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm..."
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">
                    <i className="fe-search" />
                  </button>
                </div>
              </div>
            </form>
          </li>
        </ul>
      </div>

      <div className={sidebarOpen ? "left-side-menu show" : "left-side-menu"}>
        <div className="slimscroll-menu">
          <a href="/" className="logo text-center mb-4">
            <span className="logo-lg">
              <img src="lib-admin/assets-admin/images/logo.png" height={40} />
            </span>
          </a>
          <div id="sidebar-menu">
            <ul className="metismenu" id="side-menu">
              <li className="menu-title">Menu</li>
              <li>
                <a href="/">
                  <i className="fe-truck" />
                  <span>Đơn hàng</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={toggleUserMenu}>
                  <i className="fe-user" />
                  <span>Quản lý user | staff</span>
                  <span
                    className={userMenuOpen ? "menu-arrow open" : "menu-arrow"}
                  />
                </a>
                <ul
                  className={
                    userMenuOpen
                      ? "nav-second-level collapse show"
                      : "nav-second-level collapse"
                  }
                  aria-expanded={userMenuOpen}
                >
                  <li>
                    <a href="/admin-user-management">Người dùng</a>
                  </li>
                  <li>
                    <a href="/admin-staff-management">Nhân viên công ty</a>
                  </li>
                  {admin === true ? <li>
                    <a href="/admin-user-staff-add">Thêm người dùng | nhân viên công ty</a>
                  </li>: ""}
                </ul>
              </li>
              <li>
                <a href="#" onClick={toggleProductMenu}>
                  <i className="fe-shopping-cart" />
                  <span>Sản phẩm</span>
                  <span
                    className={
                      productMenuOpen ? "menu-arrow open" : "menu-arrow"
                    }
                  />
                </a>
                <ul
                  className={
                    productMenuOpen
                      ? "nav-second-level collapse show"
                      : "nav-second-level collapse"
                  }
                  aria-expanded={productMenuOpen}
                >
                  <li>
                    <a href="/admin-list-product">Danh sách sản phẩm</a>
                  </li>
                  <li>
                    <a href="/admin-add-product">Thêm sản phẩm</a>
                  </li>
                  <li>
                    <a href="/admin-add-category-product">Danh mục sản phẩm</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" onClick={togglePostMenu}>
                  <i className="fe-edit" />
                  <span>Bài viết</span>
                  <span
                    className={postMenuOpen ? "menu-arrow open" : "menu-arrow"}
                  />
                </a>
                <ul
                  className={
                    postMenuOpen
                      ? "nav-second-level collapse show"
                      : "nav-second-level collapse"
                  }
                  aria-expanded={postMenuOpen}
                >
                  <li>
                    <a href="/admin-list-post">Danh sách bài viết</a>
                  </li>
                  <li>
                    <a href="/admin-add-category-post">Danh mục bài viết</a>
                  </li>
                  <li>
                    <a href="/admin-add-post">Thêm bài viết</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="clearfix" />
        </div>
      </div>
    </div>
  );
};

export default Header;
