import React, { useEffect, useState } from "react";
import { linkApi } from "../../../../utils/ApiUrl";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../../../../entity/Post";
import CategoryPost from "../../../../entity/CategoryPost";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";

const ChangePost = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, setValue, setError, formState: { errors } } = useForm();
  const [categoryPost, setCategoryPost] = useState<CategoryPost[]>(); // chưa có dữ liệu nên để rỗng
  const jwt = sessionStorage.getItem('jwtToken');
  const [listPost, setListPost] = useState<Post[]>([]);
  const jwtParse = jwt ? jwtDecode(jwt) as any : null;
  const username = jwtParse?.sub as string;
  const [userId, setUserId] = useState<number>();
  const [imagePost, setImagePost] = useState<any>(null);
  const [post, setPost] = useState<Post>();
  const search = new URLSearchParams(location.search);
  const postId = search.get("postId");
  if (postId === null) {
    navigate(-1);
  }
  useEffect(() => {

    fetch(linkApi + `/api/post/get/${postId}`).then((res) => res.json())
      .then((data) => {
        if (data.code !== 200) {
          alert("Không tồn tại sản phẩm với id là " + postId)
          navigate("/admin-list-post");
        } else {
          setPost(data.data);
          setValue("postTitle", data.data.postTitle);
          setValue("postDetail", data.data.postDetail);
          setValue("categoryPost", data.data.categoryPost.categoryId);
        }
      })
      .catch((err) => console.error(err));
    fetch(linkApi + `/api/user/get/by/username?username=${username}`).then((res) => res.json()).then((data) => setUserId(data.data.userId)).catch((err) => console.error(err));
    fetch(linkApi + `/api/category-post/get/all`)
      .then((res) => res.json())
      .then((data) => setCategoryPost(data.data))
      .catch((err) => console.error(err));

    fetch(linkApi + `/api/post/get/all?size=5&sort=postId,desc`)
      .then((res) => res.json())
      .then((data) => setListPost(data.data.content))
      .catch((err) => console.error(err));

  }, [postId]);

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
    let confirm = window.confirm('Bạn có chắc chắn muốn sửa bài viết này không?')
    if (confirm) {
     if(imagePost!== null){
      const imageLink = imagePost.split(',')[1];
      fetch(linkApi + `/api/post/update/${postId}?categoryPostId=${data.categoryPost}&userId=${userId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
          "postTitle": data.postTitle,
          "postImage": post?.postImage,
          "dataImage": imageLink,
          "postDetail": data.postDetail,
        })
      }).then((res) => res.json()).
        then((data) => {
          if (data.code === 200) {
            alert('Sửa bài viết thành công');
            window.location.reload();
          }
        }).
        catch((err) => console.error(err));
     }else{
      fetch(linkApi + `/api/post/update/${postId}?categoryPostId=${data.categoryPost}&userId=${userId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
          "postTitle": data.postTitle,
          "postDetail": data.postDetail,
        })
      }).then((res) => res.json()).
        then((data) => {
          if (data.code === 200) {
            alert('Sửa bài viết thành công');
            window.location.reload();
          }
        }).
        catch((err) => console.error(err));
     }
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
                  <h4 className="page-title">Sửa bài viết</h4>
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
                            <label className="col-lg-2 col-form-label">Danh mục bài viết</label>
                            <div className="col-lg-10">
                              <select className="form-control" {...register('categoryPost', { required: 'Danh mục bài viết không được để trống' })}>
                                <option value="">Chọn</option>
                                {categoryPost?.map((category: CategoryPost) => (
                                  <option value={category.categoryId} selected={category.categoryId === post?.categoryPost.categoryId}>{category.categoryName}</option>
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
                          {imagePost ===null? <img src={post?.imageUrl} width="200" />: ""}
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

            <h4>5 Sản phẩm mới được thêm gần đây nhất</h4>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="header-title">Danh sách sản phẩm</h4>
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
                                  <span className="font-13">
                                    {post.user.email}
                                  </span>
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

export default ChangePost;
