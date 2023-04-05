const jwt = require('jsonwebtoken')
const User = require('./models/userModel.js')
const asyncHandler = require('express-async-handler')


const protect = asyncHandler( async(req,res,next)=>{
	let token
	if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
	{
		try{
			token = req.headers.authorization.split(' ')[1]
			const decoded = jwt.verify(token,'abc123')
			req.user = await User.findById(decoded.id).select('-password')
			next()
		}
		
		catch(error){
			res.status(401)
			throw new Error('Not Authorized token')
		}
	}
	if(!token)
	{
		res.status(401)
		throw new Error('Not Authorized token')
	}
})

const admin = (req,res,next) =>{
	if(req.user && req.user.isAdmin){
		next()
	}
	else{
		res.status(401)
		throw new Error('Not Authorized as an admin')
	}

}

module.exports = {protect, admin}


