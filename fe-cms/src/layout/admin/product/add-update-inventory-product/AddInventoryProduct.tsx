import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { linkApi } from '../../../../utils/ApiUrl';
import { checkStatus } from '../../../../utils/CheckStatus';
import Product from '../../../../entity/Product';
import { ProductSize } from '../../../../entity/ProductSize';
import { ProductColor } from '../../../../entity/ProductColor';
import { useForm } from 'react-hook-form';

const AddInventoryProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const productId = param.get("productId");
    const [product, setProduct] = useState<Product>();
    const [productSize, setProductSize] = useState<ProductSize[]>([]);
    const [productColor, setProductColor] = useState<ProductColor[]>([]);
    const jwt = sessionStorage.getItem("jwtToken")
    const [errorMessage, setErrorMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // check có tồn tại id không
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

        fetch(linkApi + `/api/product-size/get/all`)
            .then((res) => res.json())
            .then((data) => setProductSize(data.data.content))
            .catch((err) => console.log(err))

        fetch(linkApi + `/api/product-color/get/all`)
            .then((res) => res.json())
            .then((data) => setProductColor(data.data.content))
            .catch((err) => console.log(err))

    }, [])

    const onSubmit = (data: any) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn thêm size + màu + số lượng cho sản phẩm này chứ");
        if (confirm) {
            fetch(linkApi + `/api/product/add/inventory?productId=${productId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    quantity: data.quantity,
                    productColorId: data.productColor,
                    productSizeId: data.productSize
                })
            }).then((res) => res.json())
                .then((data) => {
                    if (data.code === 200) {
                        alert("Thêm tồn kho thành công")
                        window.location.reload();
                    }else{
                        setErrorMessage(data.message)   
                    }
                    
                })
                .catch((err) => console.log("lỗi: " + err))
        }
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
                                <h6 style={{ fontSize: '16px' }} className="page-title">Thêm tồn kho cho sản phẩm</h6>
                            </div>
                        </div>
                    </div>

                    <div className='col-12 row'>
                        <form
                            className="form-horizontal"
                            encType="multipart/form-data"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {/* Trường size sản phẩm */}
                            <div className="form-group row">
                                <label className="col-lg-6 col-form-label">
                                    Size của sản phẩm
                                </label>
                                <div className="col-lg-6">
                                    <select
                                        className="form-control"
                                        {...register('productSize', {
                                            required: "Vui lòng không để trống size của sản phẩm này",
                                        })}
                                    >
                                        <option value="">Chọn</option>
                                        {productSize.map((item) => (
                                            <option
                                                value={item.productSizeId}
                                            >
                                                {item.sizeName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.productSize ? <div style={{ color: 'red' }}><>{errors.productSize.message}</></div> : ''}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-lg-6 col-form-label">
                                    Màu của sản phẩm
                                </label>
                                <div className="col-lg-6">
                                    <select
                                        className="form-control"
                                        {...register('productColor', {
                                            required: "Vui lòng không để trống màu của sản phẩm này",
                                        })}
                                    >
                                        <option value="">Chọn</option>
                                        {productColor.map((item) => (
                                            <option
                                                value={item.productColorId}
                                            >
                                                {item.colorName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.productColor ? <div style={{ color: 'red' }}><>{errors.productColor.message}</></div> : ''}
                                </div>
                            </div>


                            {/* Trường "Quantity" */}
                            <div className="form-group row">
                                <label
                                    style={{ fontSize: '14px' }}
                                    className="col-lg-6 col-form-label"
                                    htmlFor="quantity"
                                >
                                    Số lượng
                                </label>
                                <div className="col-lg-6" >
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
                    
                    <div className='row col-lg-12'>
                    {errorMessage? <p style={{color: 'red'}}>{errorMessage}</p>: ''}
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {product?.inventoryList.map((data) => (
                                                    <tr>
                                                        <th>{data.productSize.sizeName}</th>
                                                        <th>{data.productColor.colorName}</th>
                                                        <th>{data.quantity}</th>
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

export default AddInventoryProduct;