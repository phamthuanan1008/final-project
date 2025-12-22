import React, { useEffect, useState } from 'react';
import './asset/Register.css';
import { useForm } from "react-hook-form";
import { ApiDomain } from "../../../utils/ApiUtils.ts";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token !== null) {
            navigate(-1);
        }
    }, []);

    const onRegister = (data: any) => {
        fetch(ApiDomain + `/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                sex: data.sex,
                age: data.age,
                phoneNumber: data.phoneNumber,
                address: data.address,
                username: data.username,
                password: data.password,
                email: data.email,
            }),
        })
            .then(res => res.json())
            .then(responseData => {
                if (responseData.code === 200) {
                    const token = responseData.data.jwt;
                    localStorage.setItem("token", token);
                    navigate(-1);
                } else {
                    setError("Đăng ký không thành công");
                }
            })
            .catch(err => {
                console.error("Lỗi:", err);
                setError("Có lỗi xảy ra, vui lòng thử lại");
            });
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit(onRegister)}>
                <h2 className="form-title">Đăng Ký</h2>

                <div className="input-group">
                    <label>Họ</label>
                    <input {...register("firstName", { required: "Vui lòng nhập họ" })} />
                    {errors.firstName?.message && <span className="error">{String(errors.firstName.message)}</span>}
                </div>

                <div className="input-group">
                    <label>Tên</label>
                    <input {...register("lastName", { required: "Vui lòng nhập tên" })} />
                    {errors.lastName?.message && <span className="error">{String(errors.lastName.message)}</span>}
                </div>

                <div className="input-group">
                    <label>Giới tính</label>
                    <select {...register("sex", { required: "Vui lòng chọn giới tính" })}>
                        <option value="">-- Chọn --</option>
                        <option value="M">Nam</option>
                        <option value="F">Nữ</option>
                    </select>
                    {errors.sex?.message && <span className="error">{String(errors.sex.message)}</span>}
                </div>

                <div className="input-group">
                    <label>Tuổi</label>
                    <input type="number" {...register("age", { required: "Vui lòng nhập tuổi" })} />
                    {errors.age?.message && <span className="error">{String(errors.age.message)}</span>}
                </div>

                <div className="input-group">
                    <label>Số điện thoại</label>
                    <input
                        {...register("phoneNumber", {
                            required: "Vui lòng nhập số điện thoại",
                            pattern: {
                                value: /^08\d{8,9}$/,
                                message: "Số điện thoại phải bắt đầu bằng 08 và có 10–11 chữ số"
                            }
                        })}
                    />
                    {errors.phoneNumber?.message && (
                        <span className="error">{String(errors.phoneNumber.message)}</span>
                    )}
                </div>

                <div className="input-group">
                    <label>Địa chỉ</label>
                    <input {...register("address", { required: "Vui lòng nhập địa chỉ" })} />
                    {errors.address?.message && <span className="error">{String(errors.address.message)}</span>}
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input type="email" {...register("email", { required: "Vui lòng nhập email" })} />
                    {errors.email?.message && <span className="error">{String(errors.email.message)}</span>}
                </div>

                <div className="input-group">
                    <label>Tên đăng nhập</label>
                    <input {...register("username", { required: "Vui lòng nhập tên đăng nhập" })} />
                    {errors.username?.message && <span className="error">{String(errors.username.message)}</span>}
                </div>

                <div className="input-group">
                    <label>Mật khẩu</label>
                    <input type="password" {...register("password", { required: "Vui lòng nhập mật khẩu" })} />
                    {errors.password?.message && <span className="error">{String(errors.password.message)}</span>}
                </div>

                {error && <p className="error">{error}</p>}

                <button type="submit" className="register-button">Đăng ký</button>
            </form>
        </div>
    );
};

export default Register;
