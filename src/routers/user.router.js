const express = require('express');
const {registerUser,
       checkEmailAvailability,
       checkValidToken,
       logoutUser,
       loginUser} = require('../controllers/user.controllers');
const userAuth = require('../middleware/userAuth');


const router = new express.Router();

//Check email availability
router.post("/user/email-availability", checkEmailAvailability)

//New user register
router.post("/user/register", registerUser);

//check if client holds a valid token and return user info
router.get("/user/check-token", userAuth, checkValidToken);

//logout, and delte authToken cookie
router.get('/user/logout', userAuth, logoutUser)

//Login, and return user info
router.post('/user/login', loginUser)
module.exports = router;