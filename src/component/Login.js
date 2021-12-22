import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
const Login = () => {
    let navigate = useNavigate("");
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState()
    const [responsedata, setResponseData] = useState()
    const { register, handleSubmit,  formState: { errors } } = useForm();

    
    const onSubmit = async () => {
        const response = await fetch("http://localhost:9000/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mobile: mobile, password: password })
        });
        const json = await response.json()
        if (json.code === 200) {
            localStorage.setItem('token', json.authtoken);
            if(json.role === 1){
                navigate('/Admin');
                console.log("admin loged in")
            }else if(json.role === 2){
                navigate('/supplyer');
            }else if(json.role === 3){
                navigate('/Customer');
            }
        }
        else if(json.code === 400){
            setResponseData(json.errors)
        }
        else {
            alert(json.error);
            console.log(responsedata)
        }
    };

    return (
        <>
        
            <div className="d-flex justify-content-center login">
                <div className="login-box">
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <a href="../../index2.html" className="h1"><b>Login</b></a>
                        </div>
                        <div className="card-body">
                            <p className="login-box-msg">Login in to start your juorney</p>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-group mb-2">
                                    <input className="form-control"
                                        placeholder="Enter Mobile Number"
                                        type="number"
                                        name="mobile"
                                        value={mobile}
                                        {...register("exampleRequired", { required: true })}
                                        onChange={(e) => setMobile(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-mobile"></span>
                                        </div>
                                    </div>
                                </div>
                                {errors.exampleRequired && <span className=" text-danger">This field is required</span>}
                                <div className="input-group mb-3">
                                    <input className="form-control"
                                        placeholder="Enter password"
                                        type="text"
                                        name="password"
                                        value={password}
                                        {...register("examplepassword", { required: true })}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                {errors.examplepassword && <span className=" text-danger">This field is required</span>}
                                <div className="row">
                                    <div className="col-8">
                                        <div className="icheck-primary">
                                            <input type="checkbox" id="remember" />
                                            <label htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-primary btn-block">Log In</button>
                                    </div>
                                </div>
                            </form>
                            <p className="mb-1">
                                <span href="">I forgot my password</span>
                            </p>
                            <p className="mb-0">
                                <a href="/register" className="text-center">Register With New User</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
