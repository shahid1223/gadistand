import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Input,
} from 'reactstrap'
import { useForm } from "react-hook-form";
import Header from '../headfoot/Header'
import TableData from '../supplyer/TableData'
const SupplyerForm = () => {
    const [taxitype, setTaxiType] = useState()
    const [availablledate, setAvailablleDate] = useState()
    const [availablletime, setAvailablleTime] = useState()
    const [fare, setFare] = useState()
    const [commision, setcommision] = useState()
    const [pickupcity, setPickupCity] = useState()
    const [dropcity, setDropCity] = useState()
    const [responsedata, setResponsedata] = useState()
    const [data, setData] = useState()
    const [status , setStatus] = useState()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const City = [
        { city: "Udaipur", value: 1 },
        { city: "Jaipur", value: 2 },
        { city: "Jaisalmer", value: 3 },
    ]
    const TaxiType = [
        { city: "Hatch Back", value: 1 },
        { city: "Suv", value: 2 },
        { city: "Sedan", value: 3 },
    ]
    const Status = [
        { status: "Active", value: 1 },
        { status: "Note Active", value: 0 },
    ]
    City.map((val) => {
        console.log(val.city)
    })
    const onSubmit = async () => {
        const auth = localStorage.getItem('token')
        const response = await fetch("http://localhost:9000/api/createsupply", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': auth
            },
            body: JSON.stringify({ taxi_type: taxitype, available_date: availablledate, available_time: availablletime, fare: fare, commision: commision, pickup_city: pickupcity, drop_city: dropcity ,status: status})
            // body: JSON.stringify({ name: credentials.name, mobile: credentials.mobile, password: credentials.password, role: role })
        });
        const json = await response.json()
        setData("ok")
        document.querySelectorAll('.help-block').forEach(er => er.innerHTML = '');
        console.log("Json=> ", json)
        if (json === "success") {
            toast.success('Supply Added Successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        
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
        if (responsedata) {
            console.log("response =>", responsedata)
        }

    }
    return (
        <>
            <Header />
            <ToastContainer />
            <div className="m-3 p-4">
                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Create Supplye</h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <div className="form-group" style={{ width: "49%" }}>
                                    <label for="exampleInputEmail1">Select Pick City</label>
                                    <Input
                                        id="exampleSelect"
                                        name="error_email"
                                        type="select"
                                        value={pickupcity}
                                        // {...register("exampleRequired", { required: true })}
                                        onChange={(e) => setPickupCity(e.target.value)}
                                    >
                                        <option disabled selected>
                                            Select Pick City
                                        </option>
                                        {City.map((val) => {
                                            return (
                                                <option value={val.value}>
                                                    {val.city}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                    {/* {errors.exampleRequired && <span className="text-danger">This field is required</span>} */}
                                    <span className="help-block error_pickup_city text-danger"></span>
                                </div>
                                <div className="form-group" style={{ width: "49%" }}>
                                    <label for="exampleInputEmail1">Select Drop City</label>
                                    <Input
                                        id="exampleSelect"
                                        name="drop_city"
                                        type="select"
                                        value={dropcity}
                                        onChange={(e) => setDropCity(e.target.value)}
                                    // {...register("examplDropCity", { required: true })}
                                    >
                                        <option disabled selected>
                                            Select Drop City
                                        </option>
                                        {City.map((val) => {
                                            return (
                                                <option value={val.value}>
                                                    {val.city}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                    {/* {errors.examplDropCity && <span className="text-danger">This field is required</span>} */}
                                    <span className="help-block error_drop_city text-danger"></span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between" >
                                <div className="form-group" style={{ width: "49%" }}>
                                    <label for="exampleInputEmail1">Select taxi type</label>
                                    <Input
                                        id="exampleSelect"
                                        name="taxi_type"
                                        type="select"
                                        value={taxitype}
                                        // {...register("exampleTexiType", { required: true })}
                                        onChange={(e) => setTaxiType(e.target.value)}
                                    >
                                        <option disabled selected>
                                            Select taxi
                                        </option>
                                        {TaxiType.map((val) => {
                                            return (
                                                <option value={val.value}>
                                                    {val.city}
                                                </option>
                                            )
                                        })}
                                    </Input>
                                    {/* {errors.exampleTexiType && <span className="text-danger">This field is required</span>} */}
                                    {/* {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[2].msg}</span>} */}
                                    <span className="help-block error_taxi_type text-danger"></span>
                                </div>
                                <div className="form-group" style={{ width: "49%" }}>
                                    <label for="exampleInputPassword1">Select Available Date</label>
                                    <input className="form-control"
                                        type="date"
                                        name="date"
                                        value={availablledate}
                                        // {...register("exampledate", { required: true })}
                                        onChange={(e) => setAvailablleDate(e.target.value)}
                                    />
                                    {/* {errors.exampledate && <span className="text-danger">This field is required</span>} */}
                                    {/* {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[3].msg}</span>} */}
                                    <span className="help-block error_available_date text-danger"></span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="form-group" style={{ width: "32%" }}>
                                    <label for="exampleInputFile">Select Available Time</label>
                                    <div className="input-group">
                                        <input className="form-control"
                                            type="time"
                                            name="time"
                                            value={availablletime}
                                            // {...register("exampletime", { required: true })}
                                            onChange={(e) => setAvailablleTime(e.target.value)}
                                        />
                                    </div>
                                    {/* {errors.exampletime && <span className="text-danger">This field is required</span>} */}
                                    {/* {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[4].msg}</span>} */}
                                    <span className="help-block error_available_time text-danger"></span>
                                </div>
                                <div className="form-group" style={{ width: "32%" }}>
                                    <label for="exampleCheck1">Enter Price</label>
                                    <input className="form-control"
                                        placeholder="Enter Price"
                                        type="number"
                                        name="price"
                                        value={fare}
                                        // {...register("exampletfare", { required: true })}
                                        onChange={(e) => setFare(e.target.value)}
                                    />
                                    {errors.exampletfare && <span className="text-danger">This field is required</span>}
                                    {/* {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[5].msg}</span>} */}
                                    <span className="help-block error_fare text-danger"></span>
                                </div>
                                <div className="form-group" style={{ width: "32%" }}>
                                    <label for="exampleCheck1">Enter Commision</label>
                                    <input className="form-control"
                                        placeholder="Enter Commision"
                                        type="number"
                                        name="Commision"
                                        value={commision}
                                        // {...register("exampleCommision", { required: true })}
                                        onChange={(e) => setcommision(e.target.value)}
                                    />
                                    {/* {errors.exampleCommision && <span className="text-danger">This field is required</span>} */}
                                    {/* {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[6].msg}</span>} */}
                                    <span className="help-block error_commision text-danger"></span>
                                </div>
                            </div>
                            <label for="exampleInputEmail1">Select Status</label>
                            <Input
                                // id="exampleSelect"
                                name="status"
                                type="select"
                                value={Status}
                                // {...register("exampleTexiType", { required: true })}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option disabled selected>
                                    Select Status
                                </option>
                                {Status.map((sat) => {
                                    return (
                                        <option value={sat.value}>
                                            {sat.status}
                                        </option>
                                    )
                                })}
                            </Input>
                            <span className="help-block error_status text-danger"></span>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>

                </div>
                <TableData data={data} />
            </div>
        </>
    )
}

export default SupplyerForm
