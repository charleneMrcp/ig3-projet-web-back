const express = require('express')
const animalsController = require('../Controllers/animalController')
const { validateToken } = require('../middleware/auth')

const router = express.Router()


router.get('/tous',validateToken, animalsController.getAllAnimals)

 
router.get('/chats', animalsController.getCats)
router.post('/newAnimal', animalsController.createAnimal)
router.get('/:id/allAnimals',animalsController.getAllAnimalsOfaUser)
router.put('/modifAnimal/:id', animalsController.updateAnimalName)
router.delete('/deleteAnimal/:id', animalsController.deleteAnimal)
router.delete('/deleteAnimals', animalsController.deleteAnimals)

module.exports = router;
