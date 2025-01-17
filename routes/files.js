const express = require('express');
const router = express.Router();
//const token = require('../middleware/token')
const token = require('authtokenpackage')
const filecontroller = require('../controllers/filecontroller')
const resp = require('../middleware/response')

router.get('/all',
  token.verifyToken,
  filecontroller.getAllFiles,
  resp.data
  )

router.get('/alll',
  //token.verifyToken,
  filecontroller.getAllFiles,
  resp.data
)

module.exports = router;