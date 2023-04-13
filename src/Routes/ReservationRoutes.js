const express = require('express')
const reservationsController = require('../Controllers/reservationController')

const router = express.Router()

router.post('/newReservation', reservationsController.createReservation)
router.get('/getReservation/:id', reservationsController.getReservations)

router.get('/allreservations', reservationsController.getAllReservations)
router.put('/validation/:id', reservationsController.updateReservationValidation)
router.delete('/deleteReservation/:id', reservationsController.deleteReservation)
router.delete('/deleteReservations', reservationsController.deleteReservations)



module.exports = router