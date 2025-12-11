import React, { useEffect, useState } from "react";
import { linkApi } from "../../../utils/ApiUrl";
import { jwtDecode } from "jwt-decode";
import User from "../../../entity/User";


const Info = () => {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const jwt = sessionStorage.getItem("jwtToken");
    if (!jwt) {
      window.location.href = "/login";
    }
    const jwtParse = jwt ? jwtDecode(jwt) as any : null;
    const username = jwtParse?.sub ;
    
    fetch(linkApi + `/api/user/get/by/username?username=${username}`)
    .then((res) => res.json())
    .then((data) => {setUser(data.data);})
    .catch((err) => console.error(err))
  },[])
  
  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          <section style={{ backgroundColor: "#fff" }}>
            <div className="container py-5">
              <div className="row">
                <div className="col-lg-4">
                  <div className="card mb-4">
                    <div className="card-body text-center">
                      <img
                        src={user?.imageUrl}
                        alt="avatar"
                        className="rounded-circle img-fluid"
                        style={{ width: 150 }}
                      />
                      <h5 className="my-3">
                      {user?.lastName} {user?.firstName} 
                      </h5>
                      <p className="text-muted mb-1">Admin-Victoria</p>  
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Họ và tên</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                          {user?.lastName} {user?.firstName} 
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Số điện thoại</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">Chưa update</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Địa chỉ</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">{user?.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Info;
