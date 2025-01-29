const express = require('express');
const router = express.Router();
const token = require('@brianbrinkerhoff/authtokenpackage')
const XLSX = require("xlsx");

const filecontroller = require('../controllers/filecontroller')
const resp = require('../middleware/response')

router.all('/all',
  (req,res,next)=>{
    next()
    },
  token.verifyToken,
  filecontroller.getAllFiles,
  resp.data
  )

router.all('/alll',
  //token.verifyToken,
  filecontroller.getAllFiles,
  resp.data
)

router.get('/xlsx')



module.exports = router;