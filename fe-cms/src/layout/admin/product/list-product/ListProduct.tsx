import React, { useEffect, useState } from "react";
import Product from "../../../../entity/Product";
import { linkApi } from "../../../../utils/ApiUrl";
import ReactPaginate from "react-paginate";
import { set } from "react-hook-form";

const ListProduct = () => {

  const [listproduct, setListProduct] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const[currentPage, setCurrentPage] = useState(0);
  const jwt = sessionStorage.getItem("jwtToken");

  
  const sizePage = 5;
  useEffect(() => {

    (async () => {
      try {
        await fetch(linkApi + `/api/product/get/all?size=${sizePage}`)
          .then((res) => res.json())
          .then((data) => {setTotalPage(data.data.totalPages);})
          .catch((err) => {
            console.error(err);
          });
      } catch (err) {
        console.error(err);
      }
    })();

    fetch(linkApi + `/api/product/get/all?page=${currentPage}&size=${sizePage}&sort=productId,desc`)
      .then((res) => res.json())
      .then((data) => {
        if (data.code == 200) {
          if (data && data.data.content && Array.isArray(data.data.content)) {
            setListProduct(data.data.content);
          } else {
            console.error("Dữ liệu từ API không hợp lệ.");
          }
        } else {
          console.log(data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false); // Mark loading as completed
      });
  }, [key, currentPage]);

  const deleteHandle = (productId: number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này không?"
    );
    if (confirmDelete) {
      fetch(linkApi + `/api/product/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          alert("Xóa sản phẩm thành công");
          setKey(key + 1);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handlePageClick = (event:any) => {
  setCurrentPage(event.selected);
  };

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          {/* Start Content*/}
          <div className="container-fluid">
            <br />
            <br />
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="header-title">Danh sách sản phẩm</h4>
                    
                      <div className="table-responsive mt-3">
                        <table className="table table-hover table-centered mb-0">
                          <thead>
                            <tr style={{ textAlign: "center" }}>
                              <th>Mã sản phẩm</th>
                              <th>Ảnh sản phẩm</th>
                              <th>Tên sản phẩm</th>
                              <th>Giá tiền</th>
                              <th>Thông tin người sản phẩm</th>
                              <th>Ngày đăng</th>
                              <th>Chức năng</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listproduct.map((item) => (
                              <tr
                                key={item.productId}
                                style={{ textAlign: "center" }}
                              >
                                <th scope="row">{item.productId}</th>
                                <td>
                                  <img
                                    style={{width : '30px' }}
                                    src={item.imageList[0].imageUrl}
                                    alt="contact-img"
                                    height={36}
                                    title="contact-img"
                                    className=" mr-2"
                                  />
                                </td>
                                <td>{item.productName}</td>
                                <td>{item.productPrice.toLocaleString()} ₫</td>
                                <td>
                                <img
                                  src={item.user.imageUrl}
                                  alt="contact-img"
                                  height={36}
                                  title="contact-img"
                                  className="rounded-circle"
                                />
                                <div className="overflow-hidden">
                                  <p className="mb-0 font-weight-medium">
                                    <a href="javascript: void(0);">
                                      {item.user.lastName} {item.user.firstName}
                                    </a>
                                  </p>
                                  <span className="font-13">
                                    {item.user.email}
                                  </span>
                                </div>
                              </td>
                                <td>{item.createdAt}</td>
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
                                      <a
                                        className="dropdown-item"
                                        href={`/admin-change-product?productId=${item.productId}`}
                                      >
                                        <i className="mdi mdi-pencil mr-1 text-muted" />
                                        Sửa sản phẩm
                                      </a>
                                      <a
                                        className="dropdown-item"
                                        href={`/add-product-inventory?productId=${item.productId}`}
                                      >
                                        <i className="mdi mdi-pencil mr-1 text-muted" />
                                        Thêm tồn kho cho sản phẩm 
                                      </a>
                                      <a
                                        className="dropdown-item"
                                        href={`/update-product-inventory?productId=${item.productId}`}
                                      >
                                        <i className="mdi mdi-pencil mr-1 text-muted" />
                                        Cập nhật số lượng sản phẩm cho tồn kho cho sản phẩm 
                                      </a>
                                      <a
                                        className="dropdown-item"
                                        onClick={() =>
                                          deleteHandle(item.productId)
                                        }
                                      >
                                        <i className="mdi mdi-delete mr-1 text-muted" />
                                        Xóa sản phẩm
                                      </a>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
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
                          />
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
    
  );
  
};



export default ListProduct;
