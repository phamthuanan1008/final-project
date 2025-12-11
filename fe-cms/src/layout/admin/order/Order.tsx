import React, { useEffect, useState } from "react";

import ReactPaginate from "react-paginate";
import Orders from "../../../entity/Order";
import getStatusColor from "../../../utils/ConvertColor";
import { ConverToVnd } from "../../../utils/ConvertVnd";
import { linkApi } from "../../../utils/ApiUrl";
import { jwtDecode } from "jwt-decode";
import { ORDER_CANCELLED, ORDER_COMPLETED, ORDER_CONFIRMED, ORDER_DELIVERING, ORDER_PROCESSING } from "../../../utils/StatusOrder";

const Order = () => {
  const jwt = sessionStorage.getItem("jwtToken");
  const jwtParse = jwt ? jwtDecode(jwt) : null;
  const username = jwtParse?.sub;
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [key, setKey] = useState(0);
  const [orderList, setOrderList] = useState<Orders[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [totalPriceExpected, setTotalPriceExpected] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalOrderSuccess, setTotalOrderSuccess] = useState(0);
  const [totalOrderCancelled, setTotalOrderCancelled] = useState(0);



  useEffect(() => {
    fetch(linkApi + `/api/order/get/totalprice/expected`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTotalPriceExpected(data.data.grandTotalPrice);
      })
      .catch((err) =>
        console.log("Lỗi khi tổng tiền toàn bộ đơn hàng: " + err)
      );

    fetch(
      linkApi + `/api/order/get/totalprice/by/status?status=${ORDER_COMPLETED}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalPrice(data.data.grandTotalPrice);
        setTotalOrderSuccess(data.data.totalOrder);
      })
      .catch((err) =>
        console.log("Lỗi khi tổng tiền toàn bộ đơn hàng: " + err)
      );

    fetch(
      linkApi + `/api/order/get/totalprice/by/status?status=${ORDER_CANCELLED}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalOrderCancelled(data.data.totalOrder);
      })
      .catch((err) =>
        console.log("Lỗi khi tổng tiền toàn bộ đơn hàng: " + err)
      );

    fetchOrders();
  }, [key]);

  const fetchOrders = () => {
    if (status === null) {
      fetch(linkApi + `/api/order/get/all/pagination?size=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTotalPage(data.data.totalPages);
          console.log(data.data.totalPages);
        })
        .catch((err) => console.log("Lỗi khi tổng trang của đơn hàng: " + err));
      fetch(
        linkApi +
        `/api/order/get/all/pagination?page=${currentPage}&size=${pageSize}&sort=orderId,desc`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 200) {
            setOrderList(data.data.content);
          } else {
            console.log(
              "Gặp lỗi trong quá trình toàn bộ đơn hàng: " + data.message
            );
          }
        })
        .catch((err) => console.log("Lỗi khi tổng trang của đơn hàng: " + err));
    } else {
      fetch(
        linkApi + `/api/order/get/by/status?status=${status}&size=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setTotalPage(data.data.totalPages);
          console.log(data.data.totalPages);
        })
        .catch((err) => console.log("Lỗi khi tổng trang của đơn hàng: " + err));

      fetch(
        linkApi +
        `/api/order/get/by/status?status=${status}&page=${currentPage}&size=${pageSize}&sort=orderId,desc`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 200) {
            setOrderList(data.data.content);
          } else {
            console.log(
              "Gặp lỗi trong quá trình toàn bộ đơn hàng: " + data.message
            );
          }
        })
        .catch((err) => console.log("Lỗi khi tổng trang của đơn hàng: " + err));
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setStatus(value === "" ? null : value);
    setCurrentPage(0);
    setKey(key + 1); // Trigger useEffect to re-fetch orders
  };

  function handlePageClick(selectedItem: { selected: number }): void {
    setCurrentPage(selectedItem.selected);
    setKey(key + 1);
  }

  return (
    <div>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Dashboard</h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-lg-6">
                <div className="card widget-flat">
                  <div className="card-body p-0">
                    <div className="p-3 pb-0">
                      <div className="float-right">
                        <i className="mdi mdi-cart text-primary widget-icon" />
                      </div>
                      <h5
                        style={{ fontSize: "14px" }}
                        className="text-muted font-weight-normal mt-0"
                      >
                        Số lượng đơn hàng thành công
                      </h5>
                      <h3 style={{ fontSize: "14px" }} className="mt-2">
                        {totalOrderSuccess}
                      </h3>
                    </div>
                    <div id="sparkline1" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card widget-flat">
                  <div className="card-body p-0">
                    <div className="p-3 pb-0">
                      <div className="float-right">
                        <i className="mdi mdi-currency-usd text-danger widget-icon" />
                      </div>
                      <h5
                        className="text-muted font-weight-normal mt-0"
                        style={{ fontSize: "14px" }}
                      >
                        Tổng doanh thu dự kiến
                      </h5>
                      <h3 className="mt-2" style={{ fontSize: "14px" }}>
                        {ConverToVnd(totalPriceExpected)}
                      </h3>
                    </div>
                    <div id="sparkline2" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card widget-flat">
                  <div className="card-body p-0">
                    <div className="p-3 pb-0">
                      <div className="float-right">
                        <i className="mdi mdi-currency-usd text-success widget-icon" />
                      </div>
                      <h5
                        className="text-muted font-weight-normal mt-0"
                        style={{ fontSize: "14px" }}
                      >
                        Tổng doanh thu thực tế
                      </h5>
                      <h3 className="mt-2" style={{ fontSize: "14px" }}>
                        {ConverToVnd(totalPrice)}
                      </h3>
                    </div>
                    <div id="sparkline2" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-6">
                <div className="card widget-flat">
                  <div className="card-body p-0">
                    <div className="p-3 pb-0">
                      <div className="float-right">
                        <i className="mdi mdi-cart-off text-gray widget-icon" />
                      </div>
                      <h5
                        style={{ fontSize: "14px" }}
                        className="text-muted font-weight-normal mt-0"
                      >
                        Số lượng đơn hàng bị huỷ
                      </h5>
                      <h3 style={{ fontSize: "14px" }} className="mt-2">
                        {totalOrderCancelled}
                      </h3>
                    </div>
                    <div id="sparkline4" />
                  </div>
                </div>
              </div>
            </div>
            ̰
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="header-title">Danh sách đơn hàng</h4>
                    <div className="form-group">
                      <select
                        id="orderStatus"
                        className="form-control"
                        onChange={handleStatusChange}
                        value={status || ""}
                      >
                        <option value="">Tất cả trạng thái</option>
                        <option value={ORDER_PROCESSING}>
                          {ORDER_PROCESSING}
                        </option>
                        <option value={ORDER_CONFIRMED}>
                          {ORDER_CONFIRMED}
                        </option>
                        <option value={ORDER_DELIVERING}>
                          {ORDER_DELIVERING}
                        </option>
                        <option value={ORDER_COMPLETED}>
                          {ORDER_COMPLETED}
                        </option>
                        <option value={ORDER_CANCELLED}>
                          {ORDER_CANCELLED}
                        </option>
                      </select>
                    </div>
                    <div className="table-responsive mt-3">
                      <table className="table table-hover table-centered mb-0">
                        <thead style={{ textAlign: "center" }}>
                          <tr>
                            <th>Id đơn hàng</th>
                            <th>Tên khách hàng</th>
                            <th>Email</th>
                            <th>số điện thoại</th>
                            <th>Trạng thái đơn hàng</th>
                            <th>Tổng tiền hoá đơn</th>
                            <th>Ngày mua hàng</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                          {orderList.map((order) => (
                            <tr key={order.orderId}>
                              <th scope="row">{order.orderId}</th>
                              <td>
                                <img
                                  src={order.user.imageUrl}
                                  alt="contact-img"
                                  height={36}
                                  title="contact-img"
                                  className="rounded-circle"
                                />
                                <div className="overflow-hidden">
                                  <p className="mb-0 font-weight-medium">
                                    <a href="#">
                                      {order.user.lastName}{" "}
                                      {order.user.firstName}
                                    </a>
                                  </p>
                                </div>
                              </td>
                              <td>{order.user.email}</td>
                              <td>{order.user.phoneNumber}</td>
                              <td
                                style={{ color: getStatusColor(order.status) }}
                              >
                                {order.status}
                              </td>
                              <td>{ConverToVnd(order.totalPrice)}</td>
                              <td>{order.createdAt}</td>
                              <td>
                                <div className="btn-group dropdown">
                                  <a
                                    href="#"
                                    className="dropdown-toggle arrow-none btn btn-light btn-sm"
                                    data-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="mdi mdi-dots-horizontal" />
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href={`/admin-order-detail?orderId=${order.orderId}`}>
                                      <i className="mdi mdi-chevron-right mr-1 text-muted" />
                                      Xem chi tiết đơn hàng
                                    </a>
                                    <a className="dropdown-item" href={`/admin-order-update-status?orderId=${order.orderId}`}>
                                      <i className="mdi mdi-pencil mr-1 text-muted" />
                                      Cập nhật trạng thái đơn hàng
                                    </a>

                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel="Sau"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={4}
                        pageCount={totalPage}
                        previousLabel="Trước"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        forcePage={currentPage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
