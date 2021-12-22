import React, { useEffect, useState } from 'react'

const UserTable = () => {
  const [responsedata, setResponseData] = useState()
  const onSubmit = async () => {
    const response = await fetch("http://localhost:9000/admin/alluser", {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json()
    console.log(json)
    setResponseData(json)
  }
  useEffect(() => {
    onSubmit()
    // eslint-disable-next-line
  }, [responsedata])
  return (
    <>
      <div class="container-fluid">
        <div class="row">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">All User Table</h3>
            </div>
            <div class="card-body">
              <table id="example1" class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Yser Miobile no</th>
                    <th>User Since</th>
                    <th>User Role</th>
                  </tr>
                </thead>
                <tbody>
                  {responsedata ? responsedata.map((val, index) => {
                    return (
                      <tr>
                        {/* {responsedata[index].pickup_city === 1 ? <td>Udaipur</td> : responsedata[index].pickup_city === 2 ? <td>Jiapur</td> : responsedata[index].pickup_city === 3 ? <td>Jaisalmer</td> : <span></span>}
                        {responsedata[index].drop_city === 1 ? <td>Udaipur</td> : responsedata[index].drop_city === 2 ? <td>Jiapur</td> : responsedata[index].drop_city === 3 ? <td>Jaisalmer</td> : <span></span>} */}
                        {/* {responsedata[index].taxi_type === 1 ? <td>Hatch Back</td> : responsedata[index].taxi_type === 2 ? <td>Sedan</td> : responsedata[index].taxi_type === 3 ? <td>Suv</td> : <span></span>} */}
                         <td>{val.name}</td>
                         <td>{val.mobile}</td>
                         <td>{val.date.slice(0, 10)}</td>
                         {/* <td>{val.available_time}</td> */}
                        {responsedata[index].role === 1 ?<td>Admin</td> : responsedata[index].role === 2 ? <td>Supplyer</td> : responsedata[index].role === 3 ? <td>Customer</td> : <span></span>}
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

export default UserTable
