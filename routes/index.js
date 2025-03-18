const express = require('express');
const router = express.Router();
const token = require('@brianbrinkerhoff/authtokenpackage')
const trackingcontroller = require('../controllers/trackingcontroller')
const response = require('../middleware/response')
const {join} = require("node:path");
const Link = require('../models').Link
const Link_Click = require('../models').Link_Click
/* GET home page. */


router.get('/px/:uuid',async(req,res,next)=>{
  const imagePath = join(__dirname, '../public', 'img', 'pixel.png');
  res.sendFile(imagePath)
})

router.post('/emailevents',
  trackingcontroller.trackEmailEvent,
  response.data)

router.get('/:shortcode', async function(req, res, next) {
  if(req.params.shortcode.includes('%')){
    return res.json(404)
  }
  const { shortcode } = req.params;
  const ip = req.socket.remoteAddress;
  console.log(ip)
  try{
    const link = await Link.findOne({
      where:{
        shortCode:shortcode
      }
    })
    if(!link){
      throw new Error('No link found')
    }
    res.redirect(302,link.longUrl);
    //do this after for speed
    link.set({
      clicks:link.get('clicks')+1
    })
    link.save();
    console.log(link.dataValues, link.get('clicks'));
    const linkC = await Link_Click.create({
      shortCode:shortcode,
      print: 'dd',
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    })
    console.log(linkC)
  }catch(e){
    res.send(e.message)
  }
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'txtrd Util Server v. 0.1' });
});


router.all('/nrc',async(req,res,next)=>{
  res.send(200)
})

router.post('/incomming',(req,res,next)=>{
  res.json(200)
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
