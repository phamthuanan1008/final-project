import React, { useEffect, useState } from "react";
import { linkApi } from "../../../../utils/ApiUrl";
import ReactPaginate from "react-paginate";
import CategoryProduct from "../../../../entity/CategoryProduct";
import { jwtDecode } from "jwt-decode";
import User from "../../../../entity/User";
import CategoryPost from "../../../../entity/CategoryPost";

const AddCategoryPost = () => {
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const sizePage = 4;
  const [categoryPost, setCategoryPost] = useState<CategoryPost[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [parentCategory, setParentCategory] = useState<number>(-1);
  const [errorCategoryName, setErrorCategoryName] = useState<string>("");
  const [errorParentCategory, setErrorParentCategory] = useState<string>("");
  const [key, setKey] = useState(0);
  const [editingCategory, setEditingCategory] = useState<CategoryPost | null>(null);
  const jwt = sessionStorage.getItem("jwtToken");
  if (!jwt) {
    window.location.href = "/login";
  }
  const jwtParse = jwt ? jwtDecode(jwt) as any : null;
  const username = jwtParse?.sub as string;
  const [user, setUser] = useState<User>();

  useEffect(() => {

    fetch(linkApi + `/api/user/get/by-username?username=${username}`)
    .then((res) => res.json())
    .then((data) => {setUser(data.data);})
    .catch((err) => console.error(err))

    fetch(linkApi + `/api/category-post/get/all/pagination?size=${sizePage}`,{headers:{"Authorization": `Bearer ${jwt}`}})
      .then((res) => res.json())
      .then((data) => {
        setTotalPage(data.data.totalPages);
      })
      .catch((err) => console.error(err));

    fetch(linkApi + `/api/category-post/get/all/pagination?page=${currentPage}&size=${sizePage}&sort=categoryId,desc`,{
      headers:{
        "Authorization": `Bearer ${jwt}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setCategoryPost(data.data.content);
        } else {
          console.log("Lỗi: " + data.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [key]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorCategoryName("");
    setErrorParentCategory("");
    let error = false;
    if (categoryName === "") {
      setErrorCategoryName("Vui lòng nhập tên danh mục");
      error = true;
    }

    if (parentCategory === -1) {
      setErrorParentCategory("Vui lòng chọn danh mục cha");
      error = true;
    }

    if (!error) {
      const apiUrl = editingCategory
        ? `${linkApi}/api/category-post/update/${editingCategory.categoryId}?userId=${user?.userId}`
        : `${linkApi}/api/category-post/add?userId=6`;

      const method = editingCategory ? "PUT" : "POST";

      await fetch(apiUrl, {
        method: method,
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: categoryName,
          parentId: parentCategory,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            setCategoryName("");
            if (editingCategory) {
              alert("Cập nhật danh mục sản phẩm thành công");
            } else {
              alert("Thêm danh mục sản phẩm thành công");
              window.location.reload();
            }
            setKey(key + 1);
            setEditingCategory(null);
          } else {
            console.log("Lỗi: " + data.message);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  const handleDelete = (categoryId: number) => {
    const confirmation = window.confirm(
      "Bạn có chắc chắn muốn xoá danh mục này không?"
    );
    if (confirmation) {
      fetch(linkApi + `/api/category-post/delete/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${jwt}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 200) {
            alert("Xóa danh mục bài viết thành công");
            setKey(key + 1);
          } else {
            console.log("Lỗi: " + data.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleEdit = (categoryId: number) => {
    const categoryToEdit = categoryPost.find((category) => category.categoryId === categoryId);
    if (categoryToEdit) {
      setEditingCategory(categoryToEdit);
      setCategoryName(categoryToEdit.categoryName);
      setParentCategory(categoryToEdit.parentId);
    }
  };

  function handlePageClick(selectedItem: { selected: number }) {
    setCurrentPage(selectedItem.selected);
    setKey(key + 1);
  }

  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <h4 className="page-title">{editingCategory? 
                  "Sửa danh mục sản phẩm" : "Thêm danh mục sản phẩm"}</h4>
                </div>
              </div>
            </div>
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
                        <label className="col-lg-2 col-form-label" htmlFor="simpleinput">
                          Tên danh mục
                        </label>
                        <div className="col-lg-10">
                          <input
                            type="text"
                            className="form-control"
                            id="simpleinput"
                            name="name_category_product"
                            placeholder="Nhập tên danh mục"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                          />
                        </div>
                      </div>
                      {errorCategoryName && (
                        <p style={{ color: "red", marginLeft: "160px" }}>
                          {errorCategoryName}
                        </p>
                      )}
                      <div className="form-group row">
                        <label className="col-lg-2 col-form-label">
                          Danh mục cha
                        </label>
                        <div className="col-lg-10">
                          <select
                            className="form-control"
                            name="parent_category_product"
                            value={parentCategory}
                            onChange={(e) => setParentCategory(parseInt(e.target.value))}
                          >
                            <option value={-1}>Chọn</option>
                            <option value={0}>Không thuộc danh mục nào</option>
                            <br />
                            {categoryPost.map((category) => (
                              <option key={category.categoryId} value={category.categoryId}>
                                {category.categoryName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      {errorParentCategory && (
                        <p style={{ color: "red", marginLeft: "160px" }}>
                          {errorParentCategory}
                        </p>
                      )}
                      <div className="form-group row mb-0 text-right">
                        <div className="col-lg-10 offset-lg-2">
                          <input
                            style={{ marginTop: 20, border: "none" }}
                            type="submit"
                            value={editingCategory ? "Sửa danh mục sản phẩm" : "Thêm danh mục sản phẩm"}
                            className="btn btn-primary"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="header-title">Danh mục sản phẩm</h4>
                    <br />
                    <div className="table-responsive">
                      <table className="table mb-0" width="100%">
                        <thead>
                          <tr style={{ textAlign: "center" }}>
                            <th>Id</th>
                            <th>Danh mục sản phẩm</th>
                            <th>Danh mục cha</th>
                            <th>Ngày tạo danh mục</th>
                            <th>Người tạo danh mục</th>
                            <th>Chức năng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categoryPost.map((category) => (
                            <tr key={category.categoryId} style={{ textAlign: "center" }}>
                              <td>{category.categoryId}</td>
                              <td>{category.categoryName}</td>
                              <td>{category.parentId === 0 ? "Không" : "Có"}</td>
                              <td>{category.createdAt}</td>
                              <td>
                                <img
                                  src={category.user.imageUrl}
                                  alt="contact-img"
                                  height={36}
                                  title="contact-img"
                                  className="rounded-circle"
                                />
                                <div className="overflow-hidden">
                                  <p className="mb-0 font-weight-medium">
                                    <a href="javascript: void(0);">
                                      {category.user.lastName} {category.user.firstName}
                                    </a>
                                  </p>
                                  <span className="font-13">{category.user.email}</span>
                                </div>
                              </td>
                              <td>
                                <a
                                  style={{ color: "green", cursor: "pointer" }}
                                  onClick={() => handleEdit(category.categoryId)}
                                >
                                  Sửa
                                </a>{" "}
                                -{" "}
                                <a
                                  style={{ color: "red", cursor: "pointer" }}
                                  onClick={() => handleDelete(category.categoryId)}
                                >
                                  Xóa
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddCategoryPost;
