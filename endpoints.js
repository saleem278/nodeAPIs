const express = require('express')
const app = express()
const productRoute = require('./routes/productRoute.js')
const userRoute = require('./routes/userRoute.js')
const orderRoute = require('./routes/orderRoute.js')

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

