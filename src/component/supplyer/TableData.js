import React, { useEffect, useState } from 'react'

const Table = () => {
  const [responsedata, setResponseData] = useState()
  const [test, setTest] = useState(false)
  const [dropcity, setDropCity] = useState()
  useEffect(() => {
    onSubmit()
  }, [test])
  const onSubmit = async () => {
    const response = await fetch("http://localhost:9000/api/allsupply", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhZWU3ZmY3ZmI2MTIwZDFhYjExOGViIn0sImlhdCI6MTYzODk0NTcyM30.XCaTJ8HNS0o8ui3rFOhb_VG03i2QwlVXwOiO3c9ydAM'
      },
    });
    
    const json = await response.json()
    setTest(true)
    setResponseData(json)
  //   if(responsedata.pickup_city === 1){
  //     setPickupCity("Udaipur")
  //  }
  //   else {
  //     console.log("Invalid credentials");
  //   }
  }


  if (responsedata) {
    for (let i = 0; i < responsedata.length; i++) {
      if (responsedata[i].pickup_city === 1) {
        console.log("city=> Udaipur")
      }else if (responsedata[i].pickup_city === 2) {
        console.log("city=> jaipur")
      }else if (responsedata[i].pickup_city === 3) {
        console.log("city=> jaisalmer")
      }
    }
  }
 
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
                  </tr>
                </thead>
                <tbody>
                  {responsedata ? responsedata.map((val , index) => {
                    return (
                      <tr>
                        {responsedata[index].pickup_city === 1 ? <td>Udaipur</td> : responsedata[index].pickup_city === 2 ? <td>Jiapur</td> : responsedata[index].pickup_city === 3 ? <td>Jaisalmer</td> :<span></span>}
                        {responsedata[index].drop_city === 1 ? <td>Udaipur</td> : responsedata[index].drop_city === 2 ? <td>Jiapur</td> : responsedata[index].drop_city === 3 ? <td>Jaisalmer</td> :<span></span>}
                        {responsedata[index].taxi_type === 1 ?<td>Hatch Back</td> : responsedata[index].taxi_type === 2 ?<td>Sedan</td> : responsedata[index].taxi_type === 3 ?<td>Suv</td> :<span></span>}
                        <td>{val.fare}</td>
                        <td>{val.commision}</td>
                        <td>{val.available_date.slice(0, 10)}</td>
                        <td>{val.available_time}</td>
                      </tr>
                    )
                  }) :null}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Rendering engine</th>
                    <th>Browser</th>
                    <th>Platform(s)</th>
                    <th>Engine version</th>
                    <th>CSS grade</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Table
