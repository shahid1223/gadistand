import React, { useState } from 'react'
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
    const {handleSubmit } = useForm();

    const onSubmit = async () => {
        const response = await fetch("http://localhost:9000/api/createsupply", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhZWU3ZmY3ZmI2MTIwZDFhYjExOGViIn0sImlhdCI6MTYzODk0NTcyM30.XCaTJ8HNS0o8ui3rFOhb_VG03i2QwlVXwOiO3c9ydAM'
            },
            body: JSON.stringify({ taxi_type: taxitype, available_date: availablledate, available_time: availablletime, fare: fare, commision: commision, pickup_city: pickupcity, drop_city: dropcity })
            // body: JSON.stringify({ name: credentials.name, mobile: credentials.mobile, password: credentials.password, role: role })
        });
        const json = await response.json()
        console.log("Json=> ", json)
        if (json.errors) {
            setResponsedata(json.errors)
        }
        console.log("json=> ", json);
        if (json) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
        }
        else {
            alert("Invalid credentials");
        }
        console.log("Taxi=> ", taxitype)
        console.log("availablledate=> ", availablledate)
        console.log("availablletime=> ", availablletime)
        console.log("fare=> ", fare)
        console.log("commision=> ", commision)
        console.log("pickupcity=> ", pickupcity)
        console.log("dropcity=> ", dropcity)
        if (responsedata) {
            console.log("response =>", responsedata)
        }

    }
    return (
        <>
            <Header />
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
                                    {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[0].msg}</span>}
                                </div>
                                <div className="form-group" style={{ width: "49%" }}>
                                    <label for="exampleInputEmail1">Select Drop City</label>
                                    <Input
                                        id="exampleSelect"
                                        name="select"
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
                                    {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[1].msg}</span>}
                                </div>
                            </div>
                            <div className="d-flex justify-content-between" >
                                <div className="form-group" style={{ width: "49%" }}>
                                    <label for="exampleInputEmail1">Select taxi type</label>
                                    <Input
                                        id="exampleSelect"
                                        name="select"
                                        type="select"
                                        value={taxitype}
                                        onChange={(e) => setTaxiType(e.target.value)}
                                    >
                                        <option disabled selected>
                                            Select taxi
                                        </option>
                                        <option value={1}>
                                            Hatch Back
                                        </option>
                                        <option value={2}>
                                            Sedan
                                        </option>
                                        <option value={3}>
                                            Suv
                                        </option>
                                    </Input>
                                    {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[2].msg}</span>}
                                </div>
                                <div className="form-group" style={{ width: "49%" }}>
                                    <label for="exampleInputPassword1">Select Available Date</label>
                                    <input className="form-control"
                                        type="date"
                                        name="password"
                                        value={availablledate}
                                        onChange={(e) => setAvailablleDate(e.target.value)}
                                    />
                                    {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[3].msg}</span>}
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
                                            onChange={(e) => setAvailablleTime(e.target.value)}
                                        />
                                    </div>
                                    {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[4].msg}</span>}
                                </div>
                                <div className="form-group" style={{ width: "32%" }}>
                                    <label for="exampleCheck1">Enter Price</label>
                                    <input className="form-control"
                                        placeholder="Enter Price"
                                        type="number"
                                        name="price"
                                        value={fare}
                                        onChange={(e) => setFare(e.target.value)}
                                    />
                                    {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[5].msg}</span>}
                                </div>
                                <div className="form-group" style={{ width: "32%" }}>
                                    <label for="exampleCheck1">Enter Commision</label>
                                    <input className="form-control"
                                        placeholder="Enter Commision"
                                        type="number"
                                        name="Commision"
                                        value={commision}
                                        onChange={(e) => setcommision(e.target.value)}
                                    />
                                    {!responsedata ? <span></span> : <span className=" text-danger d-flex justify-content-left ">{responsedata[6].msg}</span>}
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                    <TableData />
            </div>
        </>
    )
}

export default SupplyerForm
