const express = require('express')
const router = express.Router()

const roleContoller = require ('../controllers/roleController')


router.get('/all', roleContoller.findAll)
router.post('/add', roleContoller.addRole)
router.post('/find', roleContoller.findRole)
router.post('/update', roleContoller.editRole)
router.post('/delete', roleContoller.deleteRole)

module.exports = router