const express = require('express');
const {getRealestatePosts} = require('../controllers/realestate.controllers');
const getSearchParams = require('../middleware/realestateConvert');
const router = new express.Router();

router.post('/realestate/get-posts',getSearchParams, getRealestatePosts);



module.exports = router;