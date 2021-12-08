import React, { useState } from 'react'
import { useForm } from "react-hook-form";
const Login = () => {
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [responsedata, setResponseData] = useState()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async () => {
        const response = await fetch("http://localhost:9000/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mobile: mobile, password: password })
        });
        const json = await response.json()
        if(json.errors){
            setResponseData(json.errors)
        }
        // console.log(json);
        if (json) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
        }
        else {
            alert("Invalid credentials");
        }
        console.log("password ", password)
        console.log("mobile ", mobile)
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
                                        onChange={(e) => setMobile(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-mobile"></span>
                                        </div>
                                    </div>
                                </div>
                                {responsedata ? <span className=" text-danger d-flex justify-content-left ">{responsedata[0].msg}</span> : <span></span>}
                                <div className="input-group mb-3">
                                    <input className="form-control"
                                        placeholder="Enter password"
                                        type="text"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                {responsedata ? <span className=" text-danger d-flex justify-content-left ">{responsedata[1].msg}</span> : <span></span>}
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
                                <a href="">I forgot my password</a>
                            </p>
                            <p className="mb-0">
                                <a href="" className="text-center">Register a new membership</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
