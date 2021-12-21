import React, { useState } from 'react'
import {
    Input,
} from 'reactstrap'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
const Register = () => {
    let navigate = useNavigate();
    const [name, setName] = useState("")
    const [mobile, setMobile] = useState()
    const [password, setPassword] = useState("")
    const [role, setRole] = useState()
    const [responsedata, setResponseData] = useState()
    const { handleSubmit } = useForm();

    const logedinuser = async () => {
        const auth = localStorage.getItem('token')
        console.log("auth=> ", auth)
        const response = await fetch("http://localhost:9000/api/getuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': auth
            },
        });
        const json = await response.json()
        if(json.role === 1){
            console.log("admin loged in")
            // navigate('success');
        }else if(json.role === 2){

            navigate('/supplyer');
        }else if(json.role === 3){
            navigate('/CustomerReq');
        }else{
            console.log("error")
        }
        console.log(json)
    };
    const onSubmit = async () => {
        const response = await fetch("http://localhost:9000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, mobile: mobile, password: password, role: role })
            // body: JSON.stringify({ name: credentials.name, mobile: credentials.mobile, password: credentials.password, role: role })
        });
        const json = await response.json()
        document.querySelectorAll('.help-block').forEach(er => er.innerHTML = '');
        if (json.errors) {
            let errors = json.errors;
            {
                errors.forEach(val => {
                    console.log("val ", val)
                    document.querySelector('.error_' + val.param).innerHTML = val.msg;
                });
            }
            // setResponsedata(json.errors)
        }
        if (json.code === 200) {
            navigate('/');
        }
        else if(json.errors){
            setResponseData(json.errors)
        }
        else {
            alert("Invalid credentials");
        }
        console.log("name =>", name)
        console.log("mobile =>", mobile)
        console.log("password =>", password)
        console.log("role =>", role)
        if (responsedata) {
            console.log("response =>", responsedata)
        }
        

    };
    return (
        <>
            <div className="d-flex justify-content-center login">
                <div className="login-box">
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <a href="../../index2.html" className="h1"><b>Register</b></a>
                        </div>
                        <div className="card-body">
                            <p className="login-box-msg">Login in to start your juorney</p>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input-group mb-2">
                                    <input className="form-control"
                                        placeholder="Enter Name"
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-user-tie"></span>
                                        </div>
                                    </div>
                                </div>
                                <span className="help-block error_name text-danger"></span>
                                {/* {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[0].msg}</span>} */}
                                <div className="input-group mb-3">
                                    <input className="form-control"
                                    //   {...register("examplemobile", { required: true })}
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
                                <span className="help-block error_mobile text-danger"></span>
                                {/* {responsedata ? <span className=" text-danger d-flex justify-content-left my-1">{responsedata[1].msg}</span> : null} */}
                                <div className="input-group mb-2">
                                    <input className="form-control"
                                        // {...register("examplepassword", { required: true })}
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
                                <span className="help-block error_password text-danger"></span>
                                        {/* {responsedata ? <span className=" text-danger d-flex justify-content-left my-1">{responsedata[2].msg}</span> : null} */}
                                <div className="input-group mb-3">
                                    <Input
                                    // {...register("examplerole", { required: true })}
                                        id="exampleSelect"
                                        name="select"
                                        type="select"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option disabled selected>
                                            Select Role
                                        </option>
                                        <option value={2}>
                                            Supplyer
                                        </option>
                                        <option value={3}>
                                            Customer
                                        </option>
                                    </Input>
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fa-thin fa-ballot-check"></span>
                                        </div>
                                    </div>
                                </div>
                                <span className="help-block error_role text-danger"></span>
                                {/* {responsedata ? <span className=" text-danger d-flex justify-content-left my-1">{responsedata[3].msg}</span> : null} */}
                                <div className="row">
                                    <div className="col-8">
                                        <div className="icheck-primary">
                                            <input type="checkbox" id="remember" />
                                            <label for="remember">
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
                                <span href="" className="text-center">Already Have Account</span>
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Register
