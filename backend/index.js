const express = require('express')
const connectTOMongo = require('./db')
const app = express()
var cors = require('cors') 
const PORT = 9000
connectTOMongo()
app.use(cors())
app.use(express.json())

app.use('/api', require('./Routes/auth'))
app.use('/api', require('./Routes/supplyerroute'))
app.use('/api', require('./Routes/customer'))
app.use('/admin', require('./Routes/admin'))


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})