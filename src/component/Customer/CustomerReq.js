import React, { useState } from 'react'
import {
    Input,
} from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Header from '../headfoot/Header'
const CustomerReq = () => {
    let navigate = useNavigate("");
    const [responsedata, setResponseData] = useState()
    const [pickupcity, setPickupCity] = useState()
    const [dropcity, setDropCity] = useState()
    const [availabledate, setAvailableDate] = useState()
    const { handleSubmit } = useForm();
    // http://localhost:9000/api/customerrequestdata
    const auth = localStorage.getItem('token')
    const onSubmit = async () => {
        const response = await fetch("http://localhost:9000/api/customerrequest", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': auth
            },
            body: JSON.stringify({ pickup_city: pickupcity, drop_city: dropcity, available_date: availabledate })
            // body: JSON.stringify({ name: credentials.name, mobile: credentials.mobile, password: credentials.password, role: role })
        });
        const json = await response.json()
        console.log("json=> ", json);
        document.querySelectorAll('.help-block').forEach(er => er.innerHTML = '');
        if (json.errors) {
            let errors = json.errors;
            
                errors.forEach(val => {
                    console.log("val ", val)
                    document.querySelector('.error_' + val.param).innerHTML = val.msg;
                });
            
            // setResponsedata(json.errors)
        } else {
            setResponseData(json)
        }
    }

    return (
        <>
            {auth ? <div>
                <Header />
                <div className="m-3 p-4">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Create Supplye</h3>
                        </div>
                        {/* onSubmit={handleSubmit(onSubmit)} */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <div className="form-group" style={{ width: "33%" }}>
                                        <label for="exampleInputEmail1">Select Pick City</label>
                                        <Input
                                            // id="exampleSelect"
                                            name="select"
                                            type="select"
                                            value={pickupcity}
                                            onChange={(e) => setPickupCity(e.target.value)}
                                        >
                                            <option disabled selected>
                                                Select Pick City
                                            </option>
                                            <option value={1}>
                                                Udaipur
                                            </option>
                                            <option value={2}>
                                                Jaipur
                                            </option>
                                            <option value={3}>
                                                Jaisalmer
                                            </option>
                                        </Input>
                                        <span className="help-block error_pickup_city text-danger"></span>
                                        {/* {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[0].msg}</span>} */}
                                    </div>
                                    <div className="form-group" style={{ width: "33%" }}>
                                        <label for="exampleInputEmail1">Select Drop City</label>
                                        <Input
                                            // id="exampleSelect"
                                            name="drop_city"
                                            type="select"
                                            value={dropcity}
                                            onChange={(e) => setDropCity(e.target.value)}
                                        >
                                            <option disabled selected>
                                                Select Drop City
                                            </option>
                                            <option value={1}>
                                                Udaipur
                                            </option>
                                            <option value={2}>
                                                Jaipur
                                            </option>
                                            <option value={3}>
                                                Jaisalmer
                                            </option>
                                        </Input>
                                        <span className="help-block error_drop_city text-danger"></span>
                                        {/* {!responsedata ? <span></span> : <span className=" text-danger  d-flex justify-content-left ">{responsedata[1].msg}</span>} */}
                                    </div>
                                    <div className="form-group" style={{ width: "33%" }}>
                                        <label for="exampleInputPassword1">Select Available Date</label>
                                        <input className="form-control"
                                            type="date"
                                            name="password"
                                            value={availabledate}
                                            onChange={(e) => setAvailableDate(e.target.value)}
                                        />
                                        <span className="help-block error_available_date text-danger"></span>
                                        {/* {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[3].msg}</span>} */}
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>

                        </form>
                    </div>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">DataTable with default features</h3>
                                </div>
                                <div class="card-body">
                                    <table id="example1" class="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>Pick Up City</th>
                                                <th>Drop Up City</th>
                                                <th>Taxi Type</th>
                                                <th>Fare</th>
                                                <th>Commision</th>
                                                <th>Available Date</th>
                                                <th>Avail Time</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {responsedata ? responsedata.map((val, index) => {
                                                return (
                                                    <tr>
                                                        {responsedata[index].pickup_city === 1 ? <td>Udaipur</td> : responsedata[index].pickup_city === 2 ? <td>Jiapur</td> : responsedata[index].pickup_city === 3 ? <td>Jaisalmer</td> : <span></span>}
                                                        {responsedata[index].drop_city === 1 ? <td>Udaipur</td> : responsedata[index].drop_city === 2 ? <td>Jiapur</td> : responsedata[index].drop_city === 3 ? <td>Jaisalmer</td> : <span></span>}
                                                        {responsedata[index].taxi_type === 1 ? <td>Hatch Back</td> : responsedata[index].taxi_type === 2 ? <td>Sedan</td> : responsedata[index].taxi_type === 3 ? <td>Suv</td> : <span></span>}
                                                        <td>{val.fare}</td>
                                                        <td>{val.commision}</td>
                                                        <td>{val.available_date.slice(0, 10)}</td>
                                                        <td>{val.available_time}</td>
                                                        {responsedata[index].status === 1 ? <td>Active</td> : responsedata[index].status === 0 ? <td>Not Active</td> : <span></span>}
                                                    </tr>
                                                )
                                            }) : null}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>: navigate('/')}
        </>
    )
}

export default CustomerReq
