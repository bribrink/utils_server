const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller')
const token = require('../middleware/token')
const response = require('../middleware/response')

router.post('/sign-up',
  authController.signUp,
  token.generateAuthTokens,
  response.data
)

router.post('/login',
  authController.login,
  token.generateAuthTokens,
  response.data
);

router.post('/checktoken',
  token.verifyToken,
  response.send({verified:true})
  )

router.post('/logout',
  authController.logout,
  (req,res,next)=>{
  res.json({error:{message:'expired login credentials, please log in again',code:'INVALID_DATA'}})
  }
)

router.post('/refresh')

module.exports = router