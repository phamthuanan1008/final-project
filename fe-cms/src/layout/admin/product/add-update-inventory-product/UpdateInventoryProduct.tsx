
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { linkApi } from '../../../../utils/ApiUrl';
import { checkStatus } from '../../../../utils/CheckStatus';
import Product from '../../../../entity/Product';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';

const UpdateInventoryProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const productId = param.get("productId");
    const jwt = sessionStorage.getItem("jwtToken")
    const [product, setProduct] = useState<Product>();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    // --- biến để cập nhật nếu ng dùng click vào cập nhật số lượng thì sẽ set 
    const [productSizeName, setProductSizeName] = useState("");
    const [productColorName, setProductColorName] = useState("");
    const [productSizeId, setProductSizeId] = useState<Number>();
    const [productColorId, setProductColorId] = useState<Number>();
    const [key, setKey] = useState(0);
    // ---- end

    if (!productId) {
        navigate(-1)
    }
    useEffect(() => {
        fetch(linkApi + `/api/product/get/${productId}`)
            .then((res) => {
                if (checkStatus(res) === false) {
                    navigate(-1)
                }
                return res.json();
            })
            .then((data) => {
                if (data.code === 200) {
                    setProduct(data.data)
                }
            })
    }, [key])

    // khi click vào nút cập nhật số lượng gọi hàm này để setValue
    const setValueToProduct = (data: Product['inventoryList'][0]) => {
        setProductSizeName(data.productSize.sizeName);
        setProductColorName(data.productColor.colorName);
        setProductSizeId(data.productSize.productSizeId);
        setProductColorId(data.productColor.productColorId);
        setValue('quantity', data.quantity)
    };

    const onSubmit = (data: any) => {
        if (!productColorId || !productColorName || !productSizeId || !productSizeName) {
            alert("Vui lòng chọn kiểu size và kiểu màu bạn muốn cập nhật số lượng cho sản phẩm này ở bảng dưới");
            return;
        }
        const confirm = window.confirm(`Bạn có chắc chắn muốn thay đổi số lượng cho size: '${productSizeName}' và màu: '${productColorName}' với sản phẩm này không`);
        if (confirm) {
            fetch(linkApi + `/api/product/update/inventory/${productId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inventoryList: [
                        {
                            quantity: data.quantity,
                            productSizeId: productSizeId,
                            productColorId: productColorId
                        },
                    ]
                })
            }).then((res) => res.json())
                .then((data) => {
                    if (data.code === 200) {
                        alert("Update số lượng thành công")
                        setKey(key + 1);
                    } else {
                        console.log(`Lỗi: ${data.message}`)
                    }
                }).catch((err) => console.log(err))
        }
        return;
    }

    return (
        <div className="content-page">
            <div className="content">
                {/* Start Content*/}
                <div className="container-fluid">
                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box">
                                <h6 style={{ fontSize: '16px' }} className="page-title">Cập nhật số lượng trong tồn kho cho sản phẩm</h6>
                            </div>
                        </div>
                    </div>

                    <div className='col-2'>
                        <div>
                            <p >Size sản phẩm: {productSizeName ? <i>{productSizeName}</i> : ''}</p>
                            <p>Màu sản phẩm: {productColorName ? <i>{productColorName}</i> : ''}</p>
                        </div>
                        <form
                            className="form-horizontal"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {/* Trường "Quantity" */}
                            <div className="form-group row">
                                <label
                                    style={{ fontSize: '14px' }}
                                    className="col-lg-6 col-form-label"
                                    htmlFor="quantity"
                                >
                                    Số lượng
                                </label>
                                <div className="col-lg-7" >
                                    <input {...register('quantity', {
                                        required: "Vui lòng nhập số lượng cho sản phẩm này",
                                        pattern: { value: /^[0-9]+$/, message: "Vui lòng chỉ nhập số" }
                                    })}
                                        type="text"
                                        className="form-control"
                                        id="quantity"
                                    />
                                    {errors.quantity ? <div style={{ color: 'red' }}><>{errors.quantity.message}</></div> : ''}
                                </div>
                            </div>
                            <div className="form-group row mb-0 text-right">
                                <div className="col-lg-10 offset-lg-2">
                                    <input
                                        style={{ marginBottom: '10px', border: "none" }}
                                        type="submit"

                                        className="btn btn-primary"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="header-title">Danh sách số lượng tồn kho của sản phẩm với màu và size khác nhau</h4>
                                    <div style={{ marginTop: '20px' }}>
                                        <p>Tên sản phẩm: {product?.productName}</p>
                                        <p>Ảnh sản phẩm: <img style={{ width: '40px' }} src={product?.imageList[0].imageUrl}></img></p>
                                    </div>

                                    <div className="table-responsive mt-3">
                                        <table style={{ textAlign: 'center' }} className="table table-hover table-centered mb-0">
                                            <thead>
                                                <tr style={{ textAlign: "center" }}>
                                                    <th>Tên size sản phẩm</th>
                                                    <th>Tên màu sản phẩm</th>
                                                    <th>Số lượng</th>
                                                    <th>Chức năng</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {product?.inventoryList.map((data) => (
                                                    <tr>
                                                        <th>{data.productSize.sizeName}</th>
                                                        <th>{data.productColor.colorName}</th>
                                                        <th>{data.quantity}</th>
                                                        <th onClick={() => setValueToProduct(data)} style={{ cursor: 'pointer', color: '#FF6666' }}>Cập nhật số lượng sản phẩm</th>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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

export default UpdateInventoryProduct;

