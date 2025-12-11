import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Product from "../../../../entity/Product";

import ImageData from "../../../../entity/ImageData";
import CategoryProduct from "../../../../entity/CategoryProduct";
import convertAmount from "../../../../utils/Convert";
import { linkApi } from "../../../../utils/ApiUrl";
import ApiResponse from "../../../../entity/ApiResponse";
import { jwtDecode } from "jwt-decode";
import User from "../../../../entity/User";

const ChangeProduct = () => {
  const [categoryProduct, setCategoryProduct] = useState<CategoryProduct[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [productName, setProductName] = useState("");
  const [listedPrice, setListedPrice] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [outstanding, setOutstanding] = useState(false);

  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productImg1, setProductImg1] = useState<ImageData | null>(null);
  const [productImg2, setProductImg2] = useState<ImageData | null>(null);
  const [productImg3, setProductImg3] = useState<ImageData | null>(null);
  const [productImg4, setProductImg4] = useState<ImageData | null>(null);
  const [productNameError, setProductNameError] = useState("");
  const [listedPriceError, setListedPriceError] = useState("");
  const [productPriceError, setProductPriceError] = useState("");
  const [productDescriptionError, setProductDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const jwt = sessionStorage.getItem("jwtToken");
  if (!jwt) {
    window.location.href = "/login";
  }
  const jwtParse = jwt ? jwtDecode(jwt) as any : null;
  const username = jwtParse?.sub as string;
  const [user, setUser] = useState<User>();
  const [changeProductImage1, setChangeProductImage1] = useState<String | null>(
    null
  );
  const [nameProductImg1, setNameProductImg1] = useState<String>("");
  const [changeProductImage2, setChangeProductImage2] = useState<String | null>(
    null
  );
  const [nameProductImg2, setNameProductImg2] = useState<String>("");

  const [changeProductImage3, setChangeProductImage3] = useState<String | null>(
    null
  );
  const [nameProductImg3, setNameProductImg3] = useState<String>("");

  const [changeProductImage4, setChangeProductImage4] = useState<String | null>(
    null
  );
  const [nameProductImg4, setNameProductImg4] = useState<String>("");
  const [stockId, setStockId] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productDetail, setProductDetail] = useState("");

  const navigate = useNavigate();
  //lấy id sản phẩm
  const location = useLocation();
  const searchParam = new URLSearchParams(location.search);
  const productId = searchParam.get("productId");
  const fetchData = async () => {
    await fetch(linkApi + `/api/user/get/by/username?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
        console.log(data.data);
      })
      .catch((err) => console.error(err)); 
  };
  useEffect(() => {
    // Ensure productId is not null or empty
    if (!productId) {
      navigate(-1);
      return;
    }

  

      fetchData();

    //lấy danh mục sản phẩm
    fetch(linkApi + "/api/category-product/get/all")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          setCategoryProduct(data.data);
        } else {
          console.error("No category product data found.");
        }
      })
      .catch((err) => console.error(err));

    //lấy thông tin sản phẩm
    fetch(linkApi + `/api/product/get/${productId}`)
    .then((res) => {
      if (res.status === 401 || res.status === 404) {
        navigate(-1);
      }
      return res.json();
    })
      .then((data) => {
        if (data.code === 200) {
          if (data && data.data) {
            setProduct(data.data);
            setProductName(data.data.productName);
            setProductCode(data.data.productCode);
            setListedPrice(data.data.listedPrice.toString());
            setProductPrice(data.data.productPrice.toString());
            setOutstanding(data.data.outstanding);
            setProductDescription(data.data.productDescription);
            setProductDetail(data.data.productDetail);
            setCategory(data.data.categoryProduct.categoryId);
            setProductImg1(data.data.imageList[0] as ImageData);
            setProductImg2(data.data.imageList[1] as ImageData);
            setProductImg3(data.data.imageList[2] as ImageData);
            setProductImg4(data.data.imageList[3] as ImageData);
            setStockId(data.data.stock.stockId);
          } else {
            console.error("No product data found.");
          }
        }
        
        if (data.code === 404) {
          navigate(-1);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChangeFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    img: string
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;

        switch (img) {
          case "productImg1":
            setChangeProductImage1(base64);
            const productNameImg = productImg1?.imageProduct;
            setNameProductImg1(productNameImg as String);
            setProductImg1(null);
            break;
          case "productImg2":
            setChangeProductImage2(base64);
            const productNameImg2 = productImg2?.imageProduct;
            setNameProductImg2(productNameImg2 as String);
            setProductImg2(null);
            break;
          case "productImg3":
            setChangeProductImage3(base64);
            const productNameImg3 = productImg3?.imageProduct;
            setNameProductImg3(productNameImg3 as String);
            setProductImg3(null);
            break;
          case "productImg4":
            setChangeProductImage4(base64);
            const productNameImg4 = productImg4?.imageProduct;
            setNameProductImg4(productNameImg4 as String);
            setProductImg4(null);
            break;
          default:
            break;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    let valid = true;

    if (!productName) {
      setProductNameError("Vui lòng nhập tên sản phẩm");
      valid = false;
    } else {
      setProductNameError("");
    }

    if (!listedPrice) {
      setListedPriceError("Vui lòng nhập giá niêm yết");
      valid = false;
    } else {
      setListedPriceError("");
    }

    if (!productPrice) {
      setProductPriceError("Vui lòng nhập giá tiền");
      valid = false;
    } else {
      setProductPriceError("");
    }

    if (!productDescription) {
      setProductDescriptionError("Vui lòng nhập mô tả sản phẩm");
      valid = false;
    } else {
      setProductDescriptionError("");
    }

    if (!category) {
      setCategoryError("Vui lòng chọn danh mục sản phẩm");
      valid = false;
    } else {
      setCategoryError("");
    }


    return valid;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Convert string values to numbers
        const listedPriceValue = convertAmount(listedPrice);
        const productPriceValue = convertAmount(productPrice);

        // Extract base64 data from image files
        const imageList = [];
        if (changeProductImage1 !== null) {
          imageList.push({
            imageProduct: nameProductImg1,
            data: changeProductImage1.split(",")[1],
          });
        }
        if (changeProductImage2 !== null) {
          imageList.push({
            imageProduct: nameProductImg2,
            data: changeProductImage2.split(",")[1],
          });
        }
        if (changeProductImage3 !== null) {
          imageList.push({
            imageProduct: nameProductImg3,
            data: changeProductImage3.split(",")[1],
          });
        }
        if (changeProductImage4 !== null) {
          imageList.push({
            imageProduct: nameProductImg4,
            data: changeProductImage4.split(",")[1],
          });
        }

        // Construct the request body
        const requestBody = {
          productName,
          productCode: productCode,
          listedPrice: listedPriceValue,
          productPrice: productPriceValue,
          productDetail: productDetail,
          productDescription,
          outstanding,
          imageList,
        };

        // Send the PUT request
        const response = await fetch(
          `${linkApi}/api/product/update/${productId}?categoryProductId=${category}&userId=${user?.userId}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        // Parse the response JSON
        const data: ApiResponse = await response.json();

        // Handle the response
        if (data.code === 200) {
          alert("Cập nhật sản phẩm thành công");
          window.location.reload();
        } else {
          console.log(data.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          {/* Start Content*/}
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">Sửa sản phẩm</h4>
                </div>
              </div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <form
                      className="form-horizontal"
                      encType="multipart/form-data"
                      onSubmit={handleSubmit}
                    >
                      <div className="form-group row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="productName"
                        >
                          Tên sản phẩm
                        </label>
                        <div className="col-lg-10">
                          <input
                            type="text"
                            className="form-control"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                          />
                          <span className="text-danger">
                            {productNameError}
                          </span>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="productCode"
                        >
                          Mã sản phẩm
                        </label>
                        <div className="col-lg-10">
                          <input
                            type="text"
                            className="form-control"
                            id="productCode"
                            value={productCode}
                            onChange={(e) => setProductCode(e.target.value)}
                          />
                        </div>
                      </div>

                      {/* Giá niêm yết */}
                      <div className="form-group row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="listedPrice"
                        >
                          Giá niêm yết
                        </label>
                        <div className="col-lg-10">
                          <input
                            type="text"
                            className="form-control"
                            id="listedPrice"
                            value={listedPrice}
                            onChange={(e) => setListedPrice(e.target.value)}
                          />
                          <span className="text-danger">
                            {listedPriceError}
                          </span>
                        </div>
                      </div>

                      {/* Giá tiền */}
                      <div className="form-group row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="productPrice"
                        >
                          Giá tiền
                        </label>
                        <div className="col-lg-10">
                          <input
                            type="text"
                            className="form-control"
                            id="productPrice"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                          />
                          <span className="text-danger">
                            {productPriceError}
                          </span>
                        </div>
                      </div>

                      {/* Số lượng */}
                      <div className="form-group row">
                        <label className="col-lg-2 col-form-label">
                          Sản phẩm nổi bật
                        </label>
                        <div className="col-lg-10">
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="outstanding"
                              checked={outstanding}
                              onChange={(e) => setOutstanding(e.target.checked)}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="outstanding"
                            >
                              Sản phẩm nổi bật
                            </label>
                          </div>
                        </div>
                      </div>

         
                      {/* Thêm trường dữ liệu số lượng tại đây */}

                      <div className="form-group row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="productDescription"
                        >
                          Giới thiệu sản phẩm
                        </label>
                        <div className="col-lg-10">
                          <textarea
                            className="form-control"
                            id="productDescription"
                            cols={7}
                            value={productDetail}
                            onChange={(e) =>
                              setProductDetail(e.target.value)
                            }
                          />
                        </div>
                      </div>

                      {/* Mô tả sản phẩm */}
                      <div className="form-group row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="productDescription"
                        >
                          Mô tả sản phẩm
                        </label>
                        <div className="col-lg-10">
                          <textarea
                            className="form-control"
                            id="productDescription"
                            cols={7}
                            value={productDescription}
                            onChange={(e) =>
                              setProductDescription(e.target.value)
                            }
                          />
                          <span className="text-danger">
                            {productDescriptionError}
                          </span>
                        </div>
                      </div>

                      {/* Danh mục sản phẩm */}
                      <div className="form-group row">
                        <label className="col-lg-2 col-form-label">
                          Danh mục sản phẩm
                        </label>
                        <div className="col-lg-10">
                          <select
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <option value={category}>
                              {product?.categoryProduct.categoryName}
                            </option>
                            {categoryProduct
                              .filter(
                                (item) =>
                                  item.categoryId !==
                                  product?.categoryProduct.categoryId
                              )
                              .map((item) => (
                                <option
                                  key={item.categoryId}
                                  value={item.categoryId}
                                >
                                  {item.categoryName}
                                </option>
                              ))}
                             ̰
                          </select>
                          <span className="text-danger">{categoryError}</span>
                        </div>
                      </div>

                      {/* Ảnh sản phẩm 1 */}
                      <div className="form-group row mb-0">
                        <label className="col-lg-2 col-form-label">
                          Ảnh sản phẩm 1
                        </label>
                        <div className="col-lg-10">
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                onChange={(e) =>
                                  handleChangeFile(e, "productImg1")
                                }
                              />
                              <label className="custom-file-label">
                                Choose file
                              </label>
                            </div>
                          </div>
                          {productImg1 && (
                            <img
                              style={{ width: 200, height: 200 }}
                              src={productImg1.imageUrl}
                              alt="product-img-1"
                              className="img-fluid mt-2"
                            />
                          )}
                          {changeProductImage1 && (
                            <img
                              style={{ width: 200, height: 200 }}
                              src={changeProductImage1 as string}
                              alt="product-img-1"
                              className="img-fluid mt-2"
                            />
                          )}
                        </div>
                      </div>

                      {/* Ảnh sản phẩm 2 */}
                      <div className="form-group row mb-0">
                        <label className="col-lg-2 col-form-label">
                          Ảnh sản phẩm 2
                        </label>
                        <div className="col-lg-10">
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                onChange={(e) =>
                                  handleChangeFile(e, "productImg2")
                                }
                              />
                              <label className="custom-file-label">
                                Choose file
                              </label>
                            </div>
                          </div>
                          {productImg2 && (
                            <img
                              style={{ width: 200, height: 200 }}
                              src={productImg2.imageUrl}
                              alt="product-img-2"
                              className="img-fluid mt-2"
                            />
                          )}
                          {changeProductImage2 && (
                            <img
                              style={{ width: 200, height: 200 }}
                              src={changeProductImage2 as string}
                              alt="product-img-1"
                              className="img-fluid mt-2"
                            />
                          )}
                        </div>
                      </div>

                      {/* Ảnh sản phẩm 3 */}
                      <div className="form-group row mb-0">
                        <label className="col-lg-2 col-form-label">
                          Ảnh sản phẩm 3
                        </label>
                        <div className="col-lg-10">
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                onChange={(e) =>
                                  handleChangeFile(e, "productImg3")
                                }
                              />
                              <label className="custom-file-label">
                                Choose file
                              </label>
                            </div>
                          </div>
                          {productImg3 && (
                            <img
                              style={{ width: 200, height: 200 }}
                              src={productImg3.imageUrl}
                              alt="product-img-3"
                              className="img-fluid mt-2"
                            />
                          )}
                          {changeProductImage3 && (
                            <img
                              style={{ width: 200, height: 200 }}
                              src={changeProductImage3 as string}
                              alt="product-img-1"
                              className="img-fluid mt-2"
                            />
                          )}
                        </div>
                      </div>

                      {/* Ảnh sản phẩm 4 */}
                      <div className="form-group row mb-0">
                        <label className="col-lg-2 col-form-label">
                          Ảnh sản phẩm 4
                        </label>
                        <div className="col-lg-10">
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                type="file"
                                className="custom-file-input"
                                onChange={(e) =>
                                  handleChangeFile(e, "productImg4")
                                }
                              />
                              <label className="custom-file-label">
                                Choose file
                              </label>
                            </div>
                          </div>
                          {productImg4 && (
                            <img
                              style={{ width: 200, height: 200 }}
                              src={productImg4.imageUrl}
                              alt="product-img-4"
                              className="img-fluid mt-2"
                            />
                          )}
                          {changeProductImage4 && (
                            <img
                              style={{ width: 200, height: 200 }}
                              src={changeProductImage4 as string}
                              alt="product-img-1"
                              className="img-fluid mt-2"
                            />
                          )}
                        </div>
                      </div>

                      {/* Thêm trường dữ liệu ảnh sản phẩm 4 tại đây */}

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
                  </div>{" "}
                  {/* end card-box */}
                </div>{" "}
                {/* end card*/}
              </div>
              {/* end col */}
            </div>
            {/* end row */}
          </div>{" "}
          {/* container-fluid */}
        </div>{" "}
        {/* content */}
      </div>
    </React.Fragment>
  );
};

export default ChangeProduct;
