const express = require('express')
const router = express.Router()
const {authUser, getUserProfile, registerUser, updateUserProfile,getUser} = require('../controllers/userController.js')
const {protect, admin} = require('../authMiddleware.js')

router.route('/').post(registerUser).get(protect, admin, getUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)



module.exports = router;




