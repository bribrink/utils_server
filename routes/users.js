const express = require('express');
const router = express.Router();
const userController = require('../controllers/userscontroller')
const resp = require('../middleware/response')
const axios = require('../middleware/Axios')
const token = require('@brianbrinkerhoff/authtokenpackage')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/me',
  token.verifyToken,
  userController.getAuthenticatedUser,
  resp.data
)

router.post('/upload',async (req,res,next)=>{
  console.log(req.body)
  res.json({done:true})
})

router.post('/profilepic',
  resp.readbody,
  token.verifyToken,
  userController.setProfileImage,
  //axios.postImageProcess,
  resp.data
)

router.get('/admingetusers',
  token.verifyToken,
  userController.adminGetUsers,
  resp.data
  )

module.exports = router;
