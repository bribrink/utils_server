const express= require('express');
const router = express.Router();
const likecontroller = require('../controllers/likecontroller')
const resp = require('../middleware/response')
const token = require('@brianbrinkerhoff/authtokenpackage')



router.post('/like',
  token.verifyToken,
  likecontroller.likeVideo,
  likecontroller.getVideoLikes,
  resp.data)

router.post('/rate',
  token.verifyToken,
  likecontroller.rateVideo,
  likecontroller.getVideoRating,
  resp.data)

router.get('/videolikesandratings/:uuid',
  //token.verifyToken,
  likecontroller.getVideoLikesAndRatings,
  resp.data)


router.get('/videolikes/:uuid',
  //token.verifyToken,
  likecontroller.getVideoLikes,
  resp.data)


router.get('/videoratings/:uuid',
  //token.verifyToken,
  likecontroller.getVideoRating,
  resp.data)

module.exports = router;