const express = require('express')
const animalsController = require('../Controllers/animalController')

const router = express.Router()


router.get('/animals/tous', animalsController.getAllAnimals)


router.get('/animals/chats', animalsController.getCats)
router.post('/newAnimal', animalsController.createAnimal)
router.put('/modifAnimal', animalsController.updateAnimal)
router.delete('/deleteAnimal', animalsController.deleteAnimal)
router.delete('/deleteAnimals', animalsController.deleteAnimals)

module.exports = router;
