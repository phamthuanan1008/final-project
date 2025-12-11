import { link, read } from "fs";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { linkApi } from "../../../../utils/ApiUrl";
import User from "../../../../entity/User";
import { useForm } from "react-hook-form";
import { error } from "console";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const UserList = () => {
  const jwt = sessionStorage.getItem("jwtToken");
  const jwtParse = jwt ? jwtDecode(jwt) as any : null;
  const [user, setUser] = useState<User[]>([]);
  const [key, setKey] = useState(1);
  const [admin, setAdmin] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const sizePage = 5;
    useEffect(() => {
        const checkAdmin = async () => {
          if (jwtParse && jwtParse.isAdmin === true) {
            setAdmin(true);
          }
        };
      
        checkAdmin();
      }, [jwtParse]);

  useEffect(() => {
    fetch(linkApi + `/api/user/get/by/authorize-name?authorizeName=USER&size=${sizePage}`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    }).then((res) => res.json())
      .then((data) => { setTotalPage(data.data.totalPages); console.log("TotalPage " + data.data.totalPages) })
      .catch((err) => console.error(err))

    fetch(linkApi + `/api/user/get/by/authorize-name?authorizeName=USER&page=${currentPage}&size=${sizePage}&sort=userId,desc`, {
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    }).then((res) => res.json())
      .then((data) => { setUser(data.data.content) })
      .catch((err) => console.error(err))

    
  }, [key]);

const deleteUserHandler = (userId : number) =>{
 if(admin === false){
    alert("Bạn không có quyền để xóa người dùng")
 }else{
  const confirm = window.confirm("Bạn có chắc chắn muốn xóa người dùng này không")
  if(confirm){
    fetch(linkApi + `/api/user/delete/${userId}`, {
      method : 'DELETE',
      headers: {
        "Authorization": `Bearer ${jwt}`
      }
    }).then((res) => res.json())
      .then((data) => {if(data.code === 200){
        alert("xóa User thành công")
        setKey(key+1)
      }else{
        alert("Xóa user không thành công")
        console.log("Xóa user không thành công: " + data.message)
      } })
      .catch((err) => console.error(err))
  }
 }
}
const handlePageClick = (event: any) => {
  setCurrentPage(event.selected);
  setKey(key+1)
}
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
                    <h4 className="header-title">Danh sách người dùng</h4>
                    <div className="table-responsive mt-3">
                      <table className="table table-hover table-centered mb-0" style={{textAlign : 'center'}}>
                        <thead>
                          <tr>
                            <th>User ID</th>
                            <th>Tên người dùng</th>
                            <th>Ảnh đại diện</th>
                            <th>Địa chỉ</th>
                            <th>email</th>
                            <th>Tuổi</th>
                            <th>Quyền</th>
                            <th>Chức năng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {user.map((user) => (
                            <tr>
                              <th scope="row">{user.userId}</th>
                              <td>{user.lastName} {user.firstName}</td>
                              <td>
                                <img 
                                  src={user.imageUrl}
                                  alt="contact-img"
                                  height={36}
                                  title="contact-img"
                                  className="rounded-circle mx-auto d-block"
                                />
                              </td>
                              <td>{user.address}</td>
                              <td>{user.email}</td>
                              <td>{user.age}</td>
                              <td>{user.authorizeList[0].authorizeName}</td>
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
                                    {admin === true ?   <a className="dropdown-item" href={`change-user-or-staff?userId=${user.userId}`}>
                                      <i className="mdi mdi-pencil mr-1 text-muted" />
                                      Update người dùng
                                    </a> : ''}
                                  {admin === true ?   <a className="dropdown-item" href="#" onClick={()=> deleteUserHandler(user.userId)}>
                                      <i className="mdi mdi-delete mr-1 text-muted" />
                                      Xóa người dùng
                                    </a>: ''}
                                    <a className="dropdown-item" href="#">
                                      <i className="mdi mdi-email mr-1 text-muted" />
                                      Gửi email tới người dùng
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
                      />
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

export default UserList;
