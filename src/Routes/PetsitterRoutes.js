const express = require('express')
const petsittersController = require('../Controllers/petsitterController')
const { validateToken } = require('../middleware/auth')
const router = express.Router()

router.post('/newPetsitter', validateToken, petsittersController.createPetsitter)
router.get('/getpetsitter/:id', validateToken, petsittersController.getPetsitter)
router.get('/allpetsitters',validateToken, petsittersController.getAllPetsitters)
router.delete('/deletePetsitter',validateToken, petsittersController.deletePetsitter)




module.exports = router
