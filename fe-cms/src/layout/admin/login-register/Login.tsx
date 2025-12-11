
import { jwtDecode } from 'jwt-decode';
import React from 'react';
import {useForm} from "react-hook-form";
import { linkApi } from '../../../utils/ApiUrl';

const Login = () => {
    const {register, handleSubmit, setError, formState: {errors}} = useForm();
    const [errorResponse, setErrorResponse] = React.useState<string>("");

    const onSubmit = (data:any) => {
        fetch(`${linkApi}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": data.username,
                "password": data.password
            })
        }).then(response => {
            return response.json(); // Thêm từ khóa 'return' ở đây
        }).then((responseData: any) => {
            // Kiểm tra xem responseData có tồn tại không trước khi truy cập thuộc tính 'code'
            if (responseData && responseData.code === 200) {
                const jwtParse = jwtDecode(responseData.data.jwt) as any;
               if((jwtParse.isAdmin && jwtParse.isAdmin === true) || (jwtParse.isStaff && jwtParse.isStaff === true)){
                     sessionStorage.setItem("jwtToken", responseData.data.jwt);
                     window.location.href = "/";
               }else{
                     setErrorResponse("Tài khoản không có quyền truy cập");
               }
            }
        
            if (responseData && responseData.code === 400) {
                setErrorResponse(responseData.message);
            }
        }).catch((error) => {
            setErrorResponse(error.message);
        });
        
                

    }

    return (

        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-8">
                        <div className="login-wrap p-4 p-md-5">
                            <div className="text-center mb-4">
                                <h3>Đăng nhập</h3>
                            </div>
                            <form action="#" className="signin-form" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group">
                                    <label className="label" htmlFor="name">Tài khoản</label>
                                    <input type="text" className="form-control"
                                           {...register('username', {
                                               required: "Tài khoản không được để trống",
                                               minLength: {
                                                   value: 8,
                                                   message: "Tài khoản phải có ít nhất 8 ký tự"
                                               },
                                               maxLength: {
                                                   value: 32,
                                                   message: "Tài khoản không được vượt quá 32 ký tự"
                                               },
                                               pattern: {
                                                   value: /^(?=.*[A-Z])/,
                                                   message: "Tài khoản phải có ít nhất 1 chữ viết hoa"
                                               }
                                           })}
                                           placeholder={"tên đăng nhập"} />
                                </div>
                                <div style={{color:'red', marginBottom: '20px'}}>{errors.username && <>{errors.username?.message}</>}</div>
                              
                                <div className="form-group">
                                    <label className="label" htmlFor="password">Mật khẩu</label>
                                    <input type="password"
                                           className="form-control"
                                           {...register('password', {required:"Mật khẩu không được để trống", minLength:{value:8, message:"Mật khẩu phải ít nhất phải trên 8 ký tự"}})}
                                           placeholder="Nhập mật khẩu"  />
                                </div>
                                <div style={{color:'red', marginBottom: '20px'}}>{errors.password && <>{errors.password?.message}</>}</div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block rounded px-3">Đăng nhập</button>
                                </div>
                                <div className="form-group text-right">
                                    <a href="#">Quên mật khẩu?</a>
                                </div>
                            </form>
                            {errorResponse && <div style={{color: 'red'}}>{errorResponse}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
