import React, { useEffect, useState } from 'react'

const Table = () => {
  const [responsedata, setResponseData] = useState()
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
  useEffect(() => {
    // eslint-disable-next-line
    onSubmit()
  }, [responsedata])
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
                        {responsedata[index].status === 1 ?<td>Active</td> : responsedata[index].status === 0 ? <td>Not Active</td> : <span></span>}
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

export default Table
