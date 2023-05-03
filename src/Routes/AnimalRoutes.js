const express = require('express')
const animalsController = require('../Controllers/animalController')
const { validateToken } = require('../middleware/auth')

const router = express.Router()


router.get('/tous', validateToken, animalsController.getAllAnimals)
router.get('/animal/:id', validateToken, animalsController.getAnimal)
 
router.get('/chats', animalsController.getCats)
router.post('/newAnimal',validateToken, animalsController.createAnimal)
router.get('/allAnimals',validateToken, animalsController.getAllAnimalsOfaUser)
router.put('/modifAnimal/:id', animalsController.updateAnimalName)
router.delete('/deleteAnimal/:id',validateToken, animalsController.deleteAnimal)
router.delete('/deleteAnimals', animalsController.deleteAnimals)

module.exports = router;
