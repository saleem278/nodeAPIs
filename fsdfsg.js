const express = require('express')
const app = express()
const connectDB = require('./db.js')
const productRoute = require('./routes/productRoute.js')
const userRoute = require('./routes/userRoute.js')
const orderRoute = require('./routes/orderRoute.js')

const payPalClientId = 'AbA_GIL_9JHw3ZjZa3LD7KFgXuaWN9bAzFOhvpHimHcp0BEomjiozAbW5c7frbMuQqfCf9FwsCUzy1zL'

connectDB()
app.use(express.json())
app.use('/api/products',productRoute)
app.use('/api/users',userRoute)
app.use('/api/orders',orderRoute)

app.get('/api/config/paypal',(req, res) => {
	res.send(payPalClientId)
})

app.get('/',(req,res)=>{
	res.send('api run')
})


app.listen(5000,console.log("server is running"))