import React from "react";

const UserOrStaffDetail = () => {
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
                        src="{{ asset($user_image) }}"
                        alt="avatar"
                        className="rounded-circle img-fluid"
                        style={{ width: 150 }}
                      />
                      <h5 className="my-3">
                        {"{"}
                        {"{"} $user_name {"}"}
                        {"}"}
                      </h5>
                      <p className="text-muted mb-1">Admin-pizza-delicious</p>
                      <p className="text-muted mb-4">chưa update</p>
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
                            {"{"}
                            {"{"} $user_name {"}"}
                            {"}"}
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
                            {"{"}
                            {"{"} $user_email {"}"}
                            {"}"}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Số điện thoại</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">chưa update</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Địa chỉ</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">chưa update</p>
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

export default UserOrStaffDetail;
