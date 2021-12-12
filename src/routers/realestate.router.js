const express = require('express');
const {getRealestatePosts} = require('../controllers/realestate.controllers');
const router = new express.Router();

router.post('/realestate/get-posts', getRealestatePosts);

module.exports = router;