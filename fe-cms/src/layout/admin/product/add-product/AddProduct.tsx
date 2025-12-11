import React, { useEffect, useState } from "react";
import CategoryProduct from "../../../../entity/CategoryProduct";
import convertAmount from "../../../../utils/Convert";
import { useNavigate } from "react-router";
import { linkApi } from "../../../../utils/ApiUrl";
import { jwtDecode } from "jwt-decode";
import User from "../../../../entity/User";
import { validatePriceInput } from "../../../../utils/ValidatePrice";
import { ProductSize } from "../../../../entity/ProductSize";
import { ProductColor } from "../../../../entity/ProductColor";

const AddProduct = () => {
  const [categoryProduct, setCategoryProduct] = useState<CategoryProduct[]>([]);
  const [productName, setProductName] = useState("");
  const [listedPrice, setListedPrice] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [outstanding, setOutstanding] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productSizeForm, setProductSizeForm] = useState("");
  const [productSizeError, setProductSizeError] = useState<String>("");
  const [productColorForm, setProductColorForm] = useState("");
  const [productColorError, setProductColorError] = useState<String>("");
  const [productImg1, setProductImg1] = useState("");
  const [productImg2, setProductImg2] = useState("");
  const [productImg3, setProductImg3] = useState("");
  const [productImg4, setProductImg4] = useState("");
  const [productNameError, setProductNameError] = useState("");
  const [listedPriceError, setListedPriceError] = useState("");
  const [productPriceError, setProductPriceError] = useState("");
  const [productDescriptionError, setProductDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [productImg1Error, setProductImg1Error] = useState("");
  const [productImg2Error, setProductImg2Error] = useState("");
  const [productImg3Error, setProductImg3Error] = useState("");
  const [productImg4Error, setProductImg4Error] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [productCode, setProductCode] = useState("");
  const [productCodeError, setProductCodeError] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [productSize, setProductSize] = useState<ProductSize[]>([]);
  const [productColor, setProductColor] = useState<ProductColor[]>([]);
  const jwt = sessionStorage.getItem("jwtToken");
  const [productDetailError, setProductDetailError] = useState("");
  if (!jwt) {
    window.location.href = "/login";
  }
  const jwtParse = jwt ? (jwtDecode(jwt) as any) : null;
  const username = jwtParse?.sub as string;
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();
  const fetchData = async () => {
    await fetch(linkApi + `/api/user/get/by/username?username=${username}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
        console.log(data.data);
      })
      .catch((err) => console.error(err));
  };
  //lấy danh mục sản phẩm
  useEffect(() => {
    fetchData();

    fetch(linkApi + `/api/product-size/get/all`)
      .then((res) => res.json())
      .then((data) => setProductSize(data.data.content))
      .catch((err) => console.log(err))

    fetch(linkApi + `/api/product-color/get/all`)
      .then((res) => res.json())
      .then((data) => setProductColor(data.data.content))
      .catch((err) => console.log(err))

    fetch(linkApi + "/api/category-product/get/all")
      .then((res) => res.json())
      .then((data) => setCategoryProduct(data.data))
      .catch((err) => console.error(err));
  }, []);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    imgField: string
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        switch (imgField) {
          case "productImg1":
            setProductImg1(reader.result as string);
            break;
          case "productImg2":
            setProductImg2(reader.result as string);
            break;
          case "productImg3":
            setProductImg3(reader.result as string);
            break;
          case "productImg4":
            setProductImg4(reader.result as string);
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

    if (!productDetail) {
      setProductDetailError("Vui lòng nhập mô tả sản phẩm");
      valid = false;
    } else {
      setProductDetailError("");
    }

    if (!productCode) {
      setProductCodeError("Vui lòng nhập mã của sản phẩm");
    } else {
      setProductCodeError("");
    }

    if (!listedPrice) {
      setListedPriceError("Vui lòng nhập giá niêm yết");
      valid = false;
    } else if (!validatePriceInput(listedPrice)) {
      setListedPriceError("Giá niêm yết không hợp lệ");
      valid = false;
    } else {
      setListedPriceError("");
    }

    if (!productPrice) {
      setProductPriceError("Vui lòng nhập giá tiền");
      valid = false;
    } else if (!validatePriceInput(productPrice)) {
      setProductPriceError("Giá tiền không hợp lệ");
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

    if (!productImg1) {
      setProductImg1Error("Vui lòng chọn ảnh sản phẩm 1");
      valid = false;
    } else {
      setProductImg1Error("");
    }

    if (!productImg2) {
      setProductImg2Error("Vui lòng chọn ảnh sản phẩm 2");
      valid = false;
    } else {
      setProductImg2Error("");
    }

    if (!productImg3) {
      setProductImg3Error("Vui lòng chọn ảnh sản phẩm 3");
      valid = false;
    } else {
      setProductImg3Error("");
    }

    if (!productImg4) {
      setProductImg4Error("Vui lòng chọn ảnh sản phẩm 4");
      valid = false;
    } else {
      setProductImg4Error("");
    }

    if (!productSizeForm) {
      setProductSizeError("Vui lòng chọn size của sản phẩm");
      valid = false
    } else {
      setProductSizeError("");
    }

    if (!productColorForm) {
      setProductColorError("Vui lòng chọn màu của sản phẩm");
      valid = false;
    } else {
      setProductColorError("");
    }

    if (!quantity) {
      setQuantityError("Vui lòng nhập số lượng sản phẩm");
      valid = false;
    } else {
      setQuantityError("");
    }

    return valid;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      // Chuyển đổi giá trị từ chuỗi sang số
      let confirm = window.confirm(
        "Bạn có chắc chắn muốn thêm sản phẩm này không?"
      );
      if (confirm) {
        const listedPriceValue = convertAmount(listedPrice);
        const productPriceValue = convertAmount(productPrice);

        const productSizeId = parseInt(productSizeForm);
        // Cắt chuỗi base64 từ dữ liệu hình ảnh
        const imageList = [
          { data: productImg1.split(",")[1] },
          { data: productImg2.split(",")[1] },
          { data: productImg3.split(",")[1] },
          { data: productImg4.split(",")[1] },
        ];

        // Gửi dữ liệu lên server
        fetch(
          linkApi + `/api/product/add?categoryProductId=${category}&userId=6`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productName: productName,
              productCode: productCode,
              listedPrice: listedPriceValue,
              productPrice: productPriceValue,
              productDetail: productDetail,
              productDescription: productDescription,
              outstanding: outstanding,
              imageList: imageList,
              inventoryList: [
                {
                  quantity: quantity,
                  productSize: {
                    productSizeId: productSizeForm
                  },
                  productColor: {
                    productColorId: productColorForm
                  }
                }
              ]
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // Xử lý kết quả từ server (nếu cần)
            if (data.code == 200) {
              alert("Thêm sản phẩm thành công");
              navigate("/admin-list-product");
            } else {
              const message = data.message;
              alert(message);
            }
            console.log(data);
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      } else {
        alert("Bạn đã chọn quyết định không thêm sản phẩm nữa");
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
                  <h4 className="page-title">Thêm sản phẩm</h4>
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
                          <span className="text-danger">
                            {productCodeError}
                          </span>
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

                      {/* Trường size sản phẩm */}
                      <div className="form-group row">
                        <label className="col-lg-2 col-form-label">
                          Size của sản phẩm
                        </label>
                        <div className="col-lg-10">
                          <select
                            className="form-control"
                            onChange={(e) => setProductSizeForm(e.target.value)}
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
                          <span className="text-danger">{productSizeError}</span>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label className="col-lg-2 col-form-label">
                          Màu của sản phẩm
                        </label>
                        <div className="col-lg-10">
                          <select
                            className="form-control"
                            onChange={(e) => setProductColorForm(e.target.value)}
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
                          <span className="text-danger">{productColorError}</span>
                        </div>
                      </div>


                      {/* Trường "Quantity" */}
                      <div className="form-group row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="quantity"
                        >
                          Số lượng
                        </label>
                        <div className="col-lg-10">
                          <input
                            type="text"
                            className="form-control"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          />
                          <span className="text-danger">{quantityError}</span>
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
                            onChange={(e) => setProductDetail(e.target.value)}
                          />
                          <span className="text-danger">{productDetailError}</span>
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
                            <option value="">Chọn</option>
                            {categoryProduct.map((item) => (
                              <option
                                key={item.categoryId}
                                value={item.categoryId}
                              >
                                {item.categoryName}
                              </option>
                            ))}
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
                                accept="image/jpeg, image/png, image/gif, image/bmp"
                                onChange={(e) =>
                                  handleFileChange(e, "productImg1")
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
                              src={productImg1}
                              alt="product-img-1"
                              className="img-fluid mt-2"
                            />
                          )}
                          <span className="text-danger">
                            {productImg1Error}
                          </span>
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
                                accept="image/jpeg, image/png, image/gif, image/bmp"
                                onChange={(e) =>
                                  handleFileChange(e, "productImg2")
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
                              src={productImg2}
                              alt="product-img-2"
                              className="img-fluid mt-2"
                            />
                          )}
                          <span className="text-danger">
                            {productImg2Error}
                          </span>
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
                                accept="image/jpeg, image/png, image/gif, image/bmp"
                                onChange={(e) =>
                                  handleFileChange(e, "productImg3")
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
                              src={productImg3}
                              alt="product-img-3"
                              className="img-fluid mt-2"
                            />
                          )}
                          <span className="text-danger">
                            {productImg3Error}
                          </span>
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
                                accept="image/jpeg, image/png, image/gif, image/bmp"
                                onChange={(e) =>
                                  handleFileChange(e, "productImg4")
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
                              src={productImg4}
                              alt="product-img-4"
                              className="img-fluid mt-2"
                            />
                          )}
                          <span className="text-danger">
                            {productImg4Error}
                          </span>
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

export default AddProduct;
