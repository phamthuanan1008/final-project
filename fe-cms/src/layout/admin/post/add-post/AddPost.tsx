import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CategoryPost from "../../../../entity/CategoryPost";
import { linkApi } from "../../../../utils/ApiUrl";
import { read } from "fs";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Post from "../../../../entity/Post";

const AddPost = () => {

  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const [categoryPost, setCategoryPost] = useState<CategoryPost[]>(); // chưa có dữ liệu nên để rỗng
  const jwt = sessionStorage.getItem('jwtToken');
  const [listPost, setListPost] = useState<Post[]>([]);
  const jwtParse = jwt ? jwtDecode(jwt) as any : null;
  const username = jwtParse?.sub as string;
  const [userId, setUserId] = useState<number>();
  const [imagePost, setImagePost] = useState<any>();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(linkApi + `/api/user/get/by/username?username=${username}`).then((res) => res.json()).then((data) => setUserId(data.data.userId)).catch((err) => console.error(err));
    fetch(linkApi + `/api/category-post/get/all`)
      .then((res) => res.json())
      .then((data) => setCategoryPost(data.data))
      .catch((err) => console.error(err));

    fetch(linkApi + `/api/post/get/all?size=5&sort=postId,desc`)
      .then((res) => res.json())
      .then((data) => setListPost(data.data.content))
      .catch((err) => console.error(err));

  }, []);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onload = function () {
      setImagePost(reader.result);
      const previewImage = document.getElementById("selectedImage");
      if (previewImage) {
        previewImage.innerHTML = `<img src="${reader.result}" width="200" />`;
      }
    }
  }
  const onSubmit = (data: any) => {
    let confirm = window.confirm('Bạn có chắc chắn muốn thêm bài viết này không?')
    if (confirm) {
      const imageLink = imagePost.split(',')[1];
      fetch(linkApi + `/api/post/add?categoryPostId=${data.categoryPost}&userId=${userId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
          "postTitle": data.postTitle,
          "dataImage": imageLink,
          "postDetail": data.postDetail,
        })
      }).then((res) => res.json()).
        then((data) => {
          if (data.code === 200) {
            alert('Thêm bài viết thành công');
            navigate('/admin-list-post')
          }
        }).
        catch((err) => console.error(err));
    }
  }

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
                  <h4 className="page-title">Thêm bài viết</h4>
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
                      onSubmit={handleSubmit(onSubmit)}
                      method="POST"
                    >
                      <div className="form-group row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="simpleinput"
                        >
                          Tiêu đề bài viết
                        </label>
                        <div className="col-lg-10">
                          <input
                            type="text"
                            className="form-control"
                            id="simpleinput"
                            {
                            ...register('postTitle', {
                              required: 'Tiêu đề bài viết không được để trống'
                              , minLength: { value: 5, message: 'Tiêu đề bài viết phải có ít nhất 5 ký tự' }
                            })
                            }
                          />
                        </div>
                      </div>
                      <div style={{ color: 'red', marginBottom: '20px' }}>{errors.postTitle && <>{errors.postTitle?.message}</>}</div>
                      <div className="form-group row">
                        <label
                          className="col-lg-2 col-form-label"
                          htmlFor="post-textarea"
                        >
                          Chi tiết bài viết
                        </label>
                        <div className="col-lg-10">
                          <textarea
                            className="form-control ckeditor"
                            id="post_detail"
                            {...register('postDetail', { required: 'Chi tiết bài viết không được để trống', minLength: { value: 50, message: 'Chi tiết bài viết phải có ít nhất là 50 ký tự' } })}
                          />
                        </div>
                      </div>
                      <div style={{ color: 'red', marginBottom: '20px' }}>{errors.postDetail && <>{errors.postDetail?.message}</>}</div>

                      <div className="form-group row">
                        <label className="col-lg-2 col-form-label">
                          Danh mục bài viết
                        </label>
                        <div className="col-lg-10">
                          <select className="form-control"  {...register('categoryPost', { required: 'Danh mục bài viết không được để trống' })}>
                            <option value="">Chọn</option>
                            {categoryPost?.map((categoryPost: CategoryPost) => (
                              <option value={categoryPost.categoryId}>{categoryPost.categoryName}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div style={{ color: 'red', marginBottom: '20px' }}>{errors.categoryPost && <>{errors.categoryPost?.message}</>}</div>

                      <div className="form-group row mb-0">
                        <label className="col-lg-2 col-form-label">Ảnh bài viết</label>
                        <div className="col-lg-10">
                          <div className="input-group">
                            <div className="custom-file">
                              <input
                                {...register('postImage', {
                                  required: 'Ảnh bài viết không được để trống',

                                })}
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
                          <br />
                          <div id="selectedImage" />
                        </div>
                      </div>
                      <div style={{ color: 'red', marginBottom: '20px' }}>{errors.postImage && <>{errors.postImage?.message}</>}</div>

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

            <h4>5 Bài viết mới được thêm gần đây nhất</h4>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="header-title">Danh sách bài  viết</h4>
                    <div className="table-responsive mt-3">
                      <table className="table table-hover table-centered mb-0" style={{ textAlign: "center" }}>
                        <thead>
                          <tr>
                            <th>Mã bài viết</th>
                            <th>Ảnh bài viết</th>
                            <th>Tên bài viết</th>
                            <th>Thông tin người đăng bài</th>
                            <th>Ngày đăng</th>
                          </tr>
                        </thead>
                        <tbody >
                          {listPost.map((post) => (
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
                                  <p className="mb-0  font-weight-medium">
                                    <a href="javascript: void(0);">
                                      {post.user.lastName} {post.user.firstName}
                                    </a>
                                  </p>
                                  <p className="font-13">
                                    {post.user.email}
                                  </p>
                                </div>
                              </td>
                              <td>{post.createdAt}</td>
                              
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          {/* container-fluid */}
        </div>{" "}
        {/* content */}
      </div>
    </React.Fragment>
  );
};

export default AddPost;
