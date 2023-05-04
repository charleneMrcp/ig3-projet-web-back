const express = require('express')
const activiteController = require('../Controllers/activiteController')


const router = express.Router()


router.get('/tous', activiteController.getAllActivites)


module.exports = router;
