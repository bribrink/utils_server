const express = require('express');
const router = express.Router();
const videocontroller = require('../controllers/videocontroller')
const videotrackcontroller = require('../controllers/videotrackcontroller')
const response = require('../middleware/response')
const token = require('@brianbrinkerhoff/authtokenpackage')


router.post('/signedurl',
  token.verifyToken,
  videocontroller.getSignedUrl,
  response.data)


router.post('/signedurlusers',
  token.verifyToken,
  videocontroller.getSignedUrlUsers,
  response.data)


router.use('/all',
  token.verifyToken,
  videocontroller.getVideos,
  response.data
)

router.post('/triggerjob',
  token.verifyToken,
  videocontroller.generateUniqueVideoName,
  videocontroller.objectCopy,
  videocontroller.triggerJob,
  (req,res,next)=>{
    res.json({trigger: 'Job Triggers', key: req.dbrecord.uuid})
  }

)

router.get('/generateuniquename',
  token.verifyToken,
  videocontroller.generateUniqueVideoName,
  response.data
)

router.post('/startplay',
  token.verifyToken,
  videotrackcontroller.startPlay,
  response.data)

router.post('/endplay',
  token.verifyToken,
  videotrackcontroller.endPlay,
  response.data)

module.exports = router