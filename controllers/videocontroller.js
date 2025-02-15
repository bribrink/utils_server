const AWS= require('../untilz/aws')
const job = require('../bin/job')
const videoutils = require('../middleware/videoutils')
const client = new AWS.MediaConvert()
const s3 = new AWS.S3()
const response = require('../middleware/response')
const Video = require('../models').Video
const User = require('../models').User
const getVideos = async(req,res,next)=>{
  try{
    const videos = await Video.findAll({
      include:[{
        model:User,
        required: true,
        attributes:['username', 'profilepic']
      }],
      attributes:['bucket','createdAt','filepath','id','updatedAt','url','user_id','user_uuid','uuid']
    })
    req.data = videos
    next()
  }catch(e){
    req.error = e
    next()
  }
}

const getSignedUrl = async(req,res,next)=>{
  console.log(req.body)
  try {
    const bucket = `parentcritic-tmp`
    const params = {
      Bucket: bucket,
      Key: req.body.name,
      ContentType: req.body.type,
      ACL: 'public-read', //USE ACL for video 'public, private, unlisted'
      Expires: 30,
      Metadata: {'useruuid':req.decoded.user_uuid, 'userid': req.decoded.userId.toString(), 'filetype':req.body.filetype},
    }
    const url = await s3.getSignedUrlPromise('putObject', params);
    req.data = {url:url}
    next()
  } catch (e) {
    req.error = {message:e.message,code:'GetError'}
    next()
  }
}


const getSignedUrlUsers = async(req,res,next)=>{
  console.log(req.body)
  try {
    const bucket = `parentcritic-users`
    const params = {
      Bucket: bucket,
      Key: req.body.name,
      ContentType: req.body.type,
      ACL: 'public-read', //USE ACL for video 'public, private, unlisted'
      Expires: 30,
      Metadata: {'useruuid':req.decoded.user_uuid, 'userid': req.decoded.userId.toString(), 'filetype':req.body.filetype}
    }
    const url = await s3.getSignedUrlPromise('putObject', params);
    req.data = {url:url}
    next()
  } catch (e) {
    req.error = {message:e.message,code:'GetError'}
    next()
  }
}

const generateUniqueVideoName = async(req,res,next)=>{
  try{
    console.log('VIDEONAME',req.body)
    let dbrecord =
      await videoutils.generateName(req.decoded.userId,'parentcritic-1',req.body.pathname)
      req.dbrecord = dbrecord;
      next()
  }catch(e){
    console.log(e.message);
    return res.json({error: {message:req.error.message,code:req.error.code}})
  }

}

//this is how to 'rename' the bject in s3.. F!!!
const objectCopy = async(req,res,next) =>{
  try{
    console.log(req.body.pathname)
    req.newkey = `${req.dbrecord.uuid}.${req.body.type.split('/')[1]||''}`;
    let resp = await s3.copyObject(
      {
        "Bucket": "parentcritic-tmp",
        "CopySource": `/parentcritic-tmp${req.body.pathname}`,
        "ACL":"public-read",
        "Key": req.newkey
      }).promise()
    console.log(resp, req.newkey)
    next();
  }catch(e){
    console.log(e.message);
    return res.json({error: {message:e.message,code:e.code}})
  }
}

const triggerJob = async(req,res,next)=>{
  try{
    console.log('REQUEST')
    let resp = await client.createJob(job(`${req.newkey}`, req.dbrecord.uuid)).promise();
    console.log('CONVERTER', resp);
    next()
  }catch(e){
    console.log(e.message);
    next()
  }
}
//arn:aws:iam::752438713513:role/service-role/MediaConvert_Default_Role

module.exports = {
  objectCopy,
  generateUniqueVideoName,
  getVideos,
  getSignedUrl,
  getSignedUrlUsers,
  triggerJob
}