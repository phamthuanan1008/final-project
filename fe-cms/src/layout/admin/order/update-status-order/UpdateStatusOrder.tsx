import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { linkApi } from '../../../../utils/ApiUrl';
import Orders from '../../../../entity/Order';
import { ConverToVnd } from '../../../../utils/ConvertVnd';
import { useForm } from 'react-hook-form';
import { ORDER_CANCELLED, ORDER_COMPLETED, ORDER_CONFIRMED, ORDER_DELIVERING, ORDER_PROCESSING } from '../../../../utils/StatusOrder';

const UpdateStatusOrder = () => {
    const location = useLocation();
    const param = new URLSearchParams(location.search)
    const orderId = param.get("orderId");
    const navigate = useNavigate();
    const [order, setOrder] = useState<Orders | null>(null);
    const [key, setKey] = useState(0);
    if (!orderId) {
        navigate(-1)
    }
    const jwt = sessionStorage.getItem('jwtToken');

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

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
                    // setValue();
                }
            }).catch((err) => console.log("Lỗi: " + err))

    }, [key])

    const onSubmit = (data: any) => {
        const confirm = window.confirm("Bạn chắc chắn có muốn cập nhật trạng thái đơn hàng này không");
        if(confirm){
            fetch(linkApi + `/api/order/update/${orderId}`,{
                method : 'PUT',
                headers : {
                    'Authorization' : `Bearer ${jwt}`,
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    status : data.orderStatus
                })
            }).then((res) => {
                if(res.status === 200){
                    alert("Cập nhật trạng thái đơn hàng thành công")
                    setKey(key + 1)
                }
            }).catch((err) => console.log(`Lỗi khi cập nhật trạng thái sản phẩm: ${err}`));
        }
            return 0;
    }

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
                                                <form className="form-horizontal"
                                                    encType="multipart/form-data"
                                                    onSubmit={handleSubmit(onSubmit)}
                                                    method="POST">
                                                    <div className="form-group row">
                                                        <label className="col-lg-2 col-form-label">
                                                            Tình trạng đơn hàng
                                                        </label>
                                                        <div className="col-lg-10">
                                                            <select className="form-control"  {...register('orderStatus', { required: 'Vui lòng chọn tình trạng đơn hàng bạn muốn thay đổi' })}>
                                                                <option value="">Chọn</option>
                                                                <option value={ORDER_PROCESSING}>{ORDER_PROCESSING}</option>
                                                                <option value={ORDER_CONFIRMED}>{ORDER_CONFIRMED}</option>
                                                                <option value={ORDER_DELIVERING}>{ORDER_DELIVERING}</option>
                                                                <option value={ORDER_COMPLETED}>{ORDER_COMPLETED}</option>
                                                                <option value={ORDER_CANCELLED}>{ORDER_CANCELLED}</option>
                                                            </select>
                                                            <div style={{ color: 'red', marginBottom: '5px' }}>{errors.orderStatus && <>{errors.orderStatus?.message}</>}</div>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row mb-0 text-right">
                                                        <div className="col-lg-10 offset-lg-2">
                                                            <input
                                                                style={{ marginTop: 20, border: "none" }}
                                                                type="submit"
                                                                defaultValue="Thêm sản phẩm"
                                                                className="btn btn-primary"
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
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

export default UpdateStatusOrder;