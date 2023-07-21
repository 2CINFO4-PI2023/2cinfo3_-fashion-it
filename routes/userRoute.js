const express = require('express')
const router = express.Router()

const userController = require ('../controllers/userController')
const authenticate = require ('../middlewares/authenticate')

router.get('/all', userController.findAll)
router.post('/add', userController.addUser)
router.post('/find', userController.findUser)
router.post('/update', userController.editUser)
router.post('/delete', userController.deleteUser)
router.post('/findusername', userController.findUserByUsername)
router.post('/premium', userController.activatePremium)

module.exports = router