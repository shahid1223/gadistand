import React, { useEffect, useState } from 'react'

const UserReqData = () => {
    const [responsedata, setResponseData] = useState()
    useEffect(() => {
        fetch("http://localhost:9000/admin/allUserReq")
            .then(response => response.json())
            // 4. Setting *dogImage* to the image url that we received from the response above
            .then(data => setResponseData(data))
        console.log(responsedata)
    }, [responsedata])
    return (
        <>
            <div class="container-fluid">
                <div class="row">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">All user Request table</h3>
                        </div>
                        <div class="card-body">
                            <table id="example1" class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>User Created Req Since</th>
                                        <th>Pick Up City</th>
                                        <th>Derop City</th>
                                        <th>Available date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {responsedata ? responsedata.map((val, index) => {
                                        return (
                                            <tr>
                                                <td>{val.created_at.slice(0, 10)}</td>
                                                {responsedata[index].pickup_city === 1 ? <td>Udaipur</td> : responsedata[index].pickup_city === 2 ? <td>Jiapur</td> : responsedata[index].pickup_city === 3 ? <td>Jaisalmer</td> : <span></span>}
                                                {responsedata[index].drop_city === 1 ? <td>Udaipur</td> : responsedata[index].drop_city === 2 ? <td>Jiapur</td> : responsedata[index].drop_city === 3 ? <td>Jaisalmer</td> : <span></span>}
                                                {/* {responsedata[index].taxi_type === 1 ? <td>Hatch Back</td> : responsedata[index].taxi_type === 2 ? <td>Sedan</td> : responsedata[index].taxi_type === 3 ? <td>Suv</td> : <span></span>} */}
                                                <td>{val.available_date.slice(0, 10)}</td>
                                                <td>{val.mobile}</td>

                                                {/* {responsedata[index].role === 1 ?<td>Admin</td> : responsedata[index].role === 2 ? <td>Supplyer</td> : responsedata[index].role === 3 ? <td>Customer</td> : <span></span>} */}
                                            </tr>
                                        )
                                    }) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserReqData
