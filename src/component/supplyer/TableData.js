import React, { useEffect, useState } from 'react'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { City, TaxiType, Status } from '../Data'
import {
  Input,
} from 'reactstrap'
const Table = (props) => {
  const { refdata } = props
  const [responsedata, setResponseData] = useState()
  const [taxitype, setTaxiType] = useState()
  const [availablledate, setAvailablleDate] = useState()
  const [availablletime, setAvailablleTime] = useState()
  const [fare, setFare] = useState()
  const [commision, setcommision] = useState()
  const [pickupcity, setPickupCity] = useState()
  const [dropcity, setDropCity] = useState()
  const [data, setData] = useState()
  const [status, setStatus] = useState()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async () => {
    const auth = localStorage.getItem('token')
    const response = await fetch("http://localhost:9000/api/allsupply", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': auth
      },
    });
    const json = await response.json()
    setResponseData(json)
  }
  const Delete = async (id) => {
    const response = await fetch(`http://localhost:9000/admin/deletedata/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json()
    if (json === "dleted") {
      toast.success('Successfully deleted supply', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    console.log(json)
  }
  const EditSupply = async (val) => {
    setData(val)
    const response = await fetch(`http://localhost:9000/admin/updatedata/${val._id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify({
      //     taxi_type: val.taxi_type,
      //     available_date: val.available_date,
      //     available_time: val.available_time,
      //     fare: val.fare,
      //     commision: val.commision,
      //     pickup_city: val.pickup_city,
      //     drop_city: val.drop_city,
      //     status: val.status
      // })
      body: JSON.stringify({ taxi_type: taxitype, available_date: availablledate, available_time: availablletime, fare: fare, commision: commision, pickup_city: pickupcity, drop_city: dropcity, status: status })
    });
    const json = await response.json()
    if (json === "") {
      toast.success('Successfully Edited supply', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    console.log(json)
  }
  useEffect(() => {
    // eslint-disable-next-line
    onSubmit()
  }, [refdata])
  return (
    <>
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
                    <th>Active Or Not</th>
                    <th>Delete</th>
                    <th>Edite</th>
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
                        <td onClick={() => Delete(val._id)}><AiFillDelete /></td>
                        <td onClick={() => { EditSupply(val); setShow(true) }}><AiFillEdit /></td>
                      </tr>
                    )
                  }) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ToastContainer />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edite Supplyer data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {data ? <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="form-group" style={{ width: "49%" }}>
                    <label for="exampleInputEmail1">Select Pick City</label>
                    <Input
                      id="exampleSelect"
                      name="error_email"
                      type="select"
                      value={data.pickup_city}
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
                      value={data.drop_city}
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
                      value={data.taxi_type}
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
                      value={data.available_date}
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
                    <label for="exampleInputFile">Available Time</label>
                    <div className="input-group">
                      <input className="form-control"
                        type="time"
                        name="time"
                        value={data.available_time}
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
                      value={data.fare}
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
                      value={data.commision}
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
                  value={data.status}
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
            </form> : null}

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={EditSupply}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default Table
