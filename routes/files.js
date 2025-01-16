const express = require('express');
const router = express.Router();
const token = require('../middleware/token')
const filecontroller = require('../controllers/filecontroller')
const resp = require('../middleware/response')

router.get('/all',
  token.verifyToken,
  filecontroller.getFiles,
  resp.data
  )

module.exports = router;