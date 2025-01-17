const express = require('express');
const router = express.Router();
const token = require('@brianbrinkerhoff/authtokenpackage')


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



module.exports = router;