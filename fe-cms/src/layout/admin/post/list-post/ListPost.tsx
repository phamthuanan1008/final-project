import React, { useEffect, useState } from "react";
import Post from "../../../../entity/Post";
import { linkApi } from "../../../../utils/ApiUrl";
import ReactPaginate from "react-paginate";

const ListPost = () => {
  const [totalPage, setTotalPage] = useState(0);
  const[currentPage, setCurrentPage] = useState(0); // mặc định ở trang thứ nhất
  const[listPost, setListPost] = useState<Post[]>([]);
  const[key, setKey] = useState(1)

  const sizePage = 5;
  useEffect(() => {
      fetch(linkApi + `/api/post/get/all?size=${sizePage}`)
      .then((res) => res.json())
      .then((data)=> {
        if(data.code === 200){
          setTotalPage(data.data.totalPages)
        }
      })
      .catch((err) => console.error(err))

      fetch(linkApi + `/api/post/get/all?page=${currentPage}&size=${sizePage}&sort=postId,desc`) .then((res) => res.json())
      .then((data)=> {
        if(data.code === 200){
          setListPost(data.data.content);
        }
      })
      .catch((err) => console.error(err))


        
  }, [key, currentPage]) 

  const deleteItem = (postId : number) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa bài viết này không?"
    );
    if(confirmDelete){
      fetch(linkApi + `/api/post/delete/${postId}`,{
         headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("jwtToken")}`,
         }
        ,
        method: "DELETE"
      })
      .then((res) => res.json())
      .then((data) =>{ if(data.code === 200){alert("Xóa thành công")
        setKey(key + 1)
      }})
        .catch((err)=> {console.log("Lỗi" + err)})
    }
  }


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
                    <h4 className="header-title">Danh sách bài viết</h4>
                    <div className="table-responsive mt-3">
                      <table className="table table-hover table-centered mb-0">
                        <thead style={{ textAlign: "center" }}>
                          <tr>
                            <th>Mã bài viết</th>
                            <th>Ảnh bài viết</th>
                            <th>Tên bài viết</th>
                            <th>Thông tin người đăng bài</th>
                            <th>Ngày đăng</th>
                            <th>Chức năng</th>
                          </tr>
                        </thead>
                        <tbody style={{ textAlign: "center" }}>
                          {listPost.map((post)=> (
                              <tr>
                              <th scope="row">{post.postId}</th>
                              <td>
                                <img
                                  src={post.imageUrl}
                                  alt="contact-img"
                                  height={36}
                                  title="contact-img"
                                  className="rounded-circle "
                                />
                              </td>
                              <td>{post.postTitle}</td>
                              <td>
                                <img
                                  src={post.user.imageUrl}
                                  alt="contact-img"
                                  height={36}
                                  title="contact-img"
                                  className="rounded-circle"
                                />
                                <div className="overflow-hidden">
                                  <p className="mb-0 font-weight-medium">
                                    <a href="javascript: void(0);">
                                      {post.user.lastName} {post.user.firstName}
                                    </a>
                                  </p>
                                  <span className="font-13">
                                    {post.user.email}
                                  </span>
                                </div>
                              </td>
                              <td>{post.createdAt}</td>
                              <td>
                                <div className="btn-group dropdown">
                                  <a
                                    href="javascript: void(0);"
                                    className="dropdown-toggle arrow-none btn btn-light btn-sm"
                                    data-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="mdi mdi-dots-horizontal" />
                                  </a>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href={`/admin-change-post?postId=${post.postId}`}>
                                      <i className="mdi mdi-pencil mr-1 text-muted" />
                                        Sửa bài viết
                                    </a>
                                    <a className="dropdown-item" href="#" onClick={()=> deleteItem(post.postId) }>
                                      <i className="mdi mdi-delete mr-1 text-muted" />
                                      Xóa bài viết
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

export default ListPost;
