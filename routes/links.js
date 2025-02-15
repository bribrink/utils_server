const express= require('express');
const router = express.Router();
const linkcontroller = require('../controllers/linkcontroller')
const resp = require('../middleware/response')
const token = require('@brianbrinkerhoff/authtokenpackage')

router.get('/all',
  token.verifyToken,
  linkcontroller.getLinks,
  resp.data)

router.get('/data',
  token.verifyToken,
  linkcontroller.getLinkData,
  resp.data)

router.post('/create',
  token.verifyToken,
  linkcontroller.createLink,
  resp.data)

module.exports = router