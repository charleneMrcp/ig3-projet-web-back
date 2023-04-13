const express = require('express')
const petsittersController = require('../Controllers/petsitterController')

const router = express.Router()

router.post('/newPetsitter', petsittersController.createPetsitter)
router.get('/getpetsitter/:id', petsittersController.getPetsitter)
router.get('/allpetsitters', petsittersController.getAllPetsitters)
router.put('/modifPetsitter/:id', petsittersController.updatePetsitterNote)
router.delete('/deletePetsitter/:id', petsittersController.deletePetsitter)
router.delete('/deletePetsitters', petsittersController.deletePetsitters)



module.exports = router
