const express = require('express')
const usersController = require('../Controllers/userController')
const { validateToken } = require('../middleware/auth')

const router = express.Router()
 

router.get('/users', usersController.getAllUsers)
router.get('/index/:id',validateToken, usersController.getOneUserById)
router.get('/info', validateToken, usersController.getOneUserById2)
router.post('/inscription', usersController.createUser)
router.post('/connexion', usersController.login)
router.put('/modification',validateToken, usersController.updateUser)
router.delete('/suppression/:id', usersController.deleteUser)




module.exports = router;
