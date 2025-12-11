import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Info from "./layout/admin/info/Info";
import Order from "./layout/admin/order/Order";
import AddCategoryPost from "./layout/admin/post/add-category-post/AddCategoryPost";
import AddPost from "./layout/admin/post/add-post/AddPost";
import ChangePost from "./layout/admin/post/change-post/ChangePost";
import ListPost from "./layout/admin/post/list-post/ListPost";
import AddProduct from "./layout/admin/product/add-product/AddProduct";
import ChangeProduct from "./layout/admin/product/change-product/ChangeProduct";
import ListProduct from "./layout/admin/product/list-product/ListProduct";
import Staff from "./layout/admin/user/staff/Staff";
import User from "./layout/admin/user/user/User";
import Login from "./layout/admin/login-register/Login";
import AddCategoryProduct from "./layout/admin/product/add-category-product/AddCategoryProduct";
import Header from "./layout/admin/header-footer/Header";
import UserOrStaffDetail from "./layout/admin/user/UserOrStaffDetail";
import UserList from "./layout/admin/user/user/User";
import UserStaffAdd from "./layout/admin/user/user-staff-add/UserStaffAdd";
import UserStaffUpdate from "./layout/admin/user/user-staff-update/UserStaffUpdate";
import AddInventoryProduct from "./layout/admin/product/add-update-inventory-product/AddInventoryProduct";
import UpdateInventoryProduct from "./layout/admin/product/add-update-inventory-product/UpdateInventoryProduct";
import OrderDetail from "./layout/admin/order/order-detail/OrderDetail";
import UpdateStatusOrder from "./layout/admin/order/update-status-order/UpdateStatusOrder";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!sessionStorage.getItem("jwtToken"));

    return (
        <BrowserRouter>
            <Routes>
                {/* Route cho trang đăng nhập */}
                <Route path="/login" element={<Login />} />

                {/* Route cho các trang còn lại */}
                <Route
                    path="/*"
                    element={
                        <AppWrapper isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

function AppWrapper({ isLoggedIn, setIsLoggedIn }: { isLoggedIn: boolean, setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) {
    const location = useLocation();

    // Nếu đang ở trang đăng nhập và chưa đăng nhập, không hiển thị Header
    if (!isLoggedIn && location.pathname === "/login") {
        return <Login />;
    }

    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }


    // Nếu đã đăng nhập, hiển thị Header và các route khác
    return (
        <div className="">
            <Header />
            <Routes>
                <Route path="/" element={<Order />} />
                <Route path="/admin-order-detail" element = {<OrderDetail />} />
                <Route path="/admin-order-update-status" element = {<UpdateStatusOrder />}  />
                <Route path="/admin-staff-management" element={<Staff />} />
                <Route path="/admin-user-management" element={<UserList />} />
                <Route path="/admin-user-staff-add" element={<UserStaffAdd />} />
                <Route
                    path="/admin-add-category-product"
                    element={<AddCategoryProduct />}
                />
                <Route path="/admin-add-product" element={<AddProduct />} />
                <Route path="/admin-change-product" element={<ChangeProduct />} />
                <Route path="/admin-list-product" element={<ListProduct />} />
                <Route
                    path="/admin-add-category-post"
                    element={<AddCategoryPost />}
                />
                <Route path="/admin-add-post" element={<AddPost />} />
                <Route path="/admin-change-post" element={<ChangePost />} />
                <Route path="/admin-list-post" element={<ListPost />} />
                <Route path="/admin-Info" element={<Info />} />
                <Route path="/user-or-staff-Info" element={<UserOrStaffDetail />} />
                <Route path="/change-user-or-staff" element = {<UserStaffUpdate />} />
                <Route path="/add-product-inventory" element = {<AddInventoryProduct />} />
                <Route path="/update-product-inventory" element = {<UpdateInventoryProduct />} />
            </Routes>
        </div>
    );
}

export default App;
