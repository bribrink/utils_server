const express = require('express');
const router = express.Router();
const token = require('@brianbrinkerhoff/authtokenpackage')
const trackcontroller = require('../controllers/trackcontroller');
const response = require('../middleware/response')

router.post('/createlink',
  token.verifyToken,
  trackcontroller.createlink,
  response.data
)