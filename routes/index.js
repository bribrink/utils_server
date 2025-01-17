const express = require('express');
const router = express.Router();
const token = require('@brianbrinkerhoff/authtokenpackage')
const trackingcontroller = require('../controllers/trackingcontroller')
const response = require('../middleware/response')
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'txtrd Util Server v. 0.1' });
});


router.all('/nrc',async(req,res,next)=>{
  res.send(200)
})


router.post('/clicks',
  trackingcontroller.trackclick,
  response.ok
  )
//96d51
module.exports = router;

//Invalid option value:
// '["awseb-e-pgqf3yjyar-stack-AWSEBLoadBalancerSecurityGroup-ESI3ZCIHYnPb","awseb-e-yipfbezme3-stack-AWSEBLoadBalancerSecurityGroup-LU8uoub9sPnh",
// "default","awseb-e-gdrndfuctn-stack-AWSEBSecurityGroup-XE5Dfi8275Es"]'
// (Namespace: 'aws:autoscaling:launchconfiguration', OptionName: 'SecurityGroups'): Value exceeds the maximum allowed length: 200
