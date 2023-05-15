const express = require('express')
const animalsController = require('../Controllers/animalController')
const { validateToken } = require('../middleware/auth')

const router = express.Router()



router.get('/animal/:id', validateToken, animalsController.getAnimal)
router.post('/newAnimal',validateToken, animalsController.createAnimal)
router.get('/allAnimals',validateToken, animalsController.getAllAnimalsOfaUser)
router.put('/modifAnimal/:id',validateToken, animalsController.updateAnimal)
router.delete('/deleteAnimal/:id',validateToken, animalsController.deleteAnimal)


module.exports = router;
