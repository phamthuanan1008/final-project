import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { linkApi } from '../../../../utils/ApiUrl';
import Orders from '../../../../entity/Order';
import { ConverToVnd } from '../../../../utils/ConvertVnd';

const OrderDetail = () => {
    const location = useLocation();
    const param = new URLSearchParams(location.search)
    const orderId = param.get("orderId");
    const navigate = useNavigate();
    const [order, setOrder] = useState<Orders | null>(null);
    if (!orderId) {
        navigate(-1)
    }

    useEffect(() => {
        fetch(linkApi + `/api/order/get/${orderId}`).then((res) => {
            if (res.status === 404 || res.status === 401) {
                alert(`Không tồn tại đơn hàng với id là: ${orderId}`)
                navigate(-1)
                return;
            }
            return res.json()
        })
            .then((data) => {

                if (data.code === 200) {
                    setOrder(data.data)
                }
            }).catch((err) => console.log("Lỗi: " + err))

    }, [])

    return (
        <div>
            <React.Fragment>
                <div className="content-page">
                    <div className="content">
                        {/* Start Content*/}
                        <div className="container-fluid">
                            <br />
                            <br />
                            <div className='row'>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="header-title">Thông tin về đơn hàng</h4>
                                            <div style={{ marginTop: '20px' }}>
                                                <p>Id đơn hàng: <i><b>{order?.orderId}</b></i></p>
                                                <p>Phương thức thanh toán: <i><b>{order?.paymentMethod.paymentName}</b></i></p>
                                                <p>Phương thức vận chuyển: <i><b>{order?.deliveryMethod.name}</b></i></p>
                                                <p>Ngày mua hàng: <i><b>{order?.createdAt}</b></i></p>
                                                <p>Tổng giá trị đơn hàng: <i><b>{order ? ConverToVnd(order.totalPrice) : ''}</b></i></p>
                                                <p>Địa chỉ mua hàng: <i><b>{order?.address}</b></i></p>
                                                <p>Tên người mua: <i><b>{`${order?.user.lastName} ${order?.user.firstName}`}</b></i></p>
                                                <p>Ảnh người mua: <i><b><img style={{ width: '40px' }} src={order?.user.imageUrl}></img></b></i></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="header-title">Thông tin về trạng thái đơn hàng</h4>
                                            <div style={{ marginTop: '20px' }}>
                                              <p>Trạng thái đơn hàng hiện tại : <i><b>{order?.status}</b></i></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="header-title">Danh sách sản phẩm với đơn hàng này</h4>

                                            <div className="table-responsive mt-3">
                                                <table className="table table-hover table-centered mb-0">
                                                    <thead>
                                                        <tr style={{ textAlign: "center" }}>
                                                            <th>Tên sản phẩm</th>
                                                            <th>Ảnh sản phẩm</th>
                                                            <th>Mã sản phẩm</th>
                                                            <th>Giá tiền</th>
                                                            <th>Số lượng mua</th>
                                                            <th>Tổng tiền</th>


                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {order?.orderDetailList.map((item) => (
                                                            <tr

                                                                style={{ textAlign: "center" }}
                                                            >
                                                                <th scope="row">{item.product.productName}</th>
                                                                <td>
                                                                    <img
                                                                        style={{ marginLeft: 30 }}
                                                                        src={item.product.imageList[0].imageUrl}
                                                                        alt="contact-img"
                                                                        height={36}
                                                                        title="contact-img"
                                                                        className="rounded-circle  mr-2"
                                                                    />
                                                                </td>
                                                                <td>{item.product.productCode}</td>
                                                                <td>{ConverToVnd(item.product.productPrice)}</td>
                                                                <td>{item.quantity}</td>
                                                                <td>{ConverToVnd(item.totalPrice)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>

                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* end row */}
                        </div>{" "}
                        {/* container-fluid */}
                    </div>{" "}
                    {/* content */}
                </div>

            </React.Fragment>
        </div>
    );
};

export default OrderDetail;