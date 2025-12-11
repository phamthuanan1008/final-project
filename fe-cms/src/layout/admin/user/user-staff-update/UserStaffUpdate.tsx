import React, { useEffect, useState } from "react";
import Authorize from "../../../../entity/Authorize";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { linkApi } from "../../../../utils/ApiUrl";
import { useForm } from "react-hook-form";
import User from "../../../../entity/User";

const UserStaffUpdate = () => {
  const jwt = sessionStorage.getItem("jwtToken");
  const jwtParse = jwt ? (jwtDecode(jwt) as any) : null;
  const [user, setUser] = useState<User>();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();
  const [avatar, setAvatar] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<String>();
  const [authorizeList, setAuthorizeList] = useState<Authorize[]>([]);
  const navigate = useNavigate();
  const search = new URLSearchParams(window.location.search);
  const userId = search.get("userId");
  if (!userId) {
    navigate(-1);
  }
  const [admin, setAdmin] = useState<boolean>(false);
  useEffect(() => {
    const checkAdmin = async () => {
      if (jwtParse && jwtParse.isAdmin === true) {
        setAdmin(true);
      } else {
        alert("Bạn không đủ quyền truy cập vào trang này");
        navigate(-1);
      }
    };

    checkAdmin();
  }, [jwtParse]);

  useEffect(() => {
    fetch(linkApi + `/api/authorize/get/all`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setAuthorizeList(data.data);
        } else {
          console.log("gặp lỗi trong quá trình lấy quyền" + data.message);
        }
      })
      .catch((err) => console.log(err));

    let alertDisplayed = false;
    fetch(linkApi + `/api/user/get/${userId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setUser(data.data);
          setValue("firstName", data.data.firstName);
          setValue("lastName", data.data.lastName);
          setValue("gender", data.data.sex);
          setValue("age", data.data.age);
          setValue("address", data.data.address);
          setValue("username", data.data.username);
          setValue("authorize", data.data.authorizeList[0].authorizeId);
          setValue("phoneNumber", data.data.phoneNumber);
        } else {
          alert(data.message);
          navigate(-1);
        }
      });
  }, []);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const base64Result = reader.result;
      setAvatar(base64Result);
      const previewImage = document.getElementById("selectedImage");
      if (previewImage) {
        previewImage.innerHTML = `<img src="${reader.result}" width="200" />`;
      }
    };
  };

  const onSubmit = (data: any) => {
    const check = data.authorize as number;
    const confirm = window.confirm(
      "Bạn có chắc chắn muốn Update người dùng này không"
    );
    if (confirm) {
      let requestBody: any = {
        firstName: data.firstName,
        lastName: data.lastName,
        sex: data.gender,
        age: data.age,
        phoneNumber: data.phoneNumber,
        address: data.address,
        username: data.username,
        email: user?.email,
        authorizeList: [
          {
            authorizeId: data.authorize,
          },
        ],
      };

      // Kiểm tra nếu avatar không null thì thêm imageLink vào requestBody
      if (avatar !== null) {
        const imageLink = avatar.split(",")[1];
        requestBody["dataImage"] = imageLink;
        requestBody["userImage"] = user?.userImage;
      }

      fetch(linkApi + `/api/user/update/${user?.userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code === 200) {
            alert("Update người dùng thành công");
            window.location.reload();
          } else {
            alert("Update người dùng không thành công: " + data.message);
            setErrorMessage(data.message as String);
          }
        });
    }
  };
  return (
    <React.Fragment>
      <div className="content-page">
        <div className="content">
          {/* Start Content*/}
          <div className="container-fluid">
            <br />
            <br />
            <h4 className="header-title mb-3">Update người dùng</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Tên đăng nhập</label>
                <input
                  type="text"
                  className="form-control"
                  id="male"
                  placeholder="Tên đăng nhập"
                  {...register("username", {
                    required: "Tên đăng người dùng không được để trống",
                    minLength: {
                      value: 6,
                      message: "Tên đăng nhập phải từ 6 ký tự trở lên",
                    },
                    maxLength: {
                      value: 32,
                      message: "Tên đăng nhậpkhông được quá 32 ký tự",
                    },
                  })}
                />
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {errors.username && <>{errors.username?.message}</>}
                </div>
              </div>
              <div className="d-flex">
                <div className="form-group mr-2">
                  <label htmlFor="exampleInputEmail1" className="mr-2">
                    Nam
                  </label>
                  <input
                    type="radio"
                    id="female"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={"M"}
                    {...register("gender", {
                      required: "Giới tính không được để trống",
                    })}
                    defaultChecked={user?.sex === "M"}
                    onChange={() => setValue("gender", "M")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className="mr-2">
                    nữ
                  </label>
                  <input
                    type="radio"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={"F"}
                    {...register("gender", {
                      required: "Giới tính không được để trống",
                    })}
                    defaultChecked={user?.sex === "F"}
                    onChange={() => setValue("gender", "F")}
                  />
                </div>
                <div
                  style={{
                    color: "red",
                    marginBottom: "20px",
                    marginLeft: "10px",
                  }}
                >
                  {errors.gender && <>{errors.gender?.message}</>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Họ</label>
                <input
                  type="text"
                  className="form-control"
                  id="male"
                  placeholder="Nhập họ của người dùng"
                  {...register("lastName", {
                    required: "Họ người dùng không được để trống",
                    minLength: {
                      value: 2,
                      message: "Họ phải từ 2 ký tự trở lên",
                    },
                  })}
                />
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {errors.lastName && <>{errors.lastName?.message}</>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Tên</label>
                <input
                  type="text"
                  className="form-control"
                  id="male"
                  placeholder="Nhập tên người dùng"
                  {...register("firstName", {
                    required: "Tên người dùng không được để trống",
                    minLength: {
                      value: 2,
                      message: "tên phải từ 2 ký tự trở lên",
                    },
                  })}
                />
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {errors.firstName && <>{errors.firstName?.message}</>}
                </div>
              </div>

              <div style={{ color: "red", marginBottom: "20px" }}>
                {errors.email && <>{errors.email?.message}</>}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Tuổi</label>
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Nhập tuổi"
                  {...register("age", {
                    required: "Tuổi không được để trống",
                    valueAsNumber: true,
                    min: {
                      value: 1,
                      message: "Tuổi không được nhỏ hơn 1 tuổi",
                    },
                    max: {
                      value: 100,
                      message: "Tuổi không được lớn hơn 100 tuổi",
                    },
                  })}
                />
              </div>
              <div style={{ color: "red", marginBottom: "20px" }}>
                {errors.age && <>{errors.age?.message}</>}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  id="male"
                  placeholder="Nhập địa chỉ"
                  {...register("address", {
                    required: "Địa chỉ người dùng không được để trống",
                  })}
                />
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {errors.address && <>{errors.address?.message}</>}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Số điện thoại</label>
                <input
                  type="text"
                  className="form-control"
                  id="male"
                  placeholder="Nhập tên người dùng"
                  {...register("phoneNumber", {
                    required: "Số điện thoại người dùng không được để trống",

                    pattern: {
                      value: /^08[0-9]{8,9}$/,
                      message:
                        "Số điện thoại không hợp lệ phải bắt đầu từ 08 và dài 10-11 số",
                    },
                  })}
                />
                <div style={{ color: "red", marginBottom: "20px" }}>
                  {errors.phoneNumber && <>{errors.phoneNumber?.message}</>}
                </div>
              </div>
              <div>
                <label htmlFor="">Quyền của người dùng</label>
                <select
                  className="form-control"
                  {...register("authorize", {
                    required: "Quyền của người dùng không được để trống",
                  })}
                >
                  <option value="">Chọn</option>
                  {authorizeList?.map((authorize: Authorize) =>
                    authorize.authorizeName === "ADMIN" ? null : (
                      <option
                        value={authorize.authorizeId}
                        selected={
                          user?.authorizeList[0].authorizeId ===
                          authorize.authorizeId
                        }
                      >
                        {authorize.authorizeName}
                      </option>
                    )
                  )}
                </select>
                <div style={{ color: "red", marginRight: "20px" }}>
                  {errors.authorize && <>{errors.authorize.message}</>}
                </div>
              </div>
              <br />
              <div style={{ color: "red", marginRight: "20px" }}>
                {errors.password && <>{errors.password.message}</>}
              </div>
              <br />
              <div className="form-group row mb-0">
                <label className="col-lg-2 col-form-label">Ảnh đại diện</label>
                <div className="col-lg-12">
                  <div className="input-group">
                    <div className="custom-file">
                      <input
                        {...register("avatar", {})}
                        accept="image/jpeg, image/png, image/gif, image/bmp"
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile04"
                        onChange={(e) => handleFileChange(e)}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile04"
                      >
                        Choose file
                      </label>
                    </div>
                  </div>
                  <div style={{ color: "red", marginRight: "20px" }}>
                    {errors.avatar && <>{errors.avatar.message}</>}
                  </div>
                  <div className="mt-2" id="selectedImage" />
                  {avatar === null ? (
                    <div>
                      <img style={{ width: "200px" }} src={user?.imageUrl} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <br />
              <br />
              <div>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              </div>

              <br></br>
              <div className="form-group ">
                <button type="submit" className="btn btn-primary">
                  Update người dùng
                </button>
              </div>
            </form>{" "}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserStaffUpdate;
