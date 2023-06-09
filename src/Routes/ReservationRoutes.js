const express = require('express')
const reservationsController = require('../Controllers/reservationController')
const { validateToken } = require('../middleware/auth')

const router = express.Router()

router.post('/newReservation',validateToken, reservationsController.createReservation)
router.get('/getReservation/:id',validateToken, reservationsController.getReservations)
router.get('/allreservations2',validateToken, reservationsController.getAllReservations2)
router.get('/allreservations',validateToken, reservationsController.getAllReservations)
router.put('/validation/:id', validateToken, reservationsController.updateReservationValidation)
router.delete('/deleteReservation/:id', validateToken, reservationsController.deleteReservation)




module.exports = router