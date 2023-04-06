const express = require('express')
const usersController = require('../Controllers/userController')

const router = express.Router()


router.get('/users', usersController.getAllUsers)
router.get('/:id', usersController.getOneUserById)
router.post('/inscription', usersController.createUser)
router.put('/modification/:id',usersController.updateUser)
router.delete('/suppression/:id', usersController.deleteUser)



module.exports = router;
