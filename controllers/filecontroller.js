const File = require('../models').File
const AWS = require('../untilz/aws')
const str = require('../untilz/randomstring');
const {userbucket,videobucket,region} = require('../untilz/configz')

const getFiles = async(req,res,next)=>{
  try{
    const files = await File.findAll({
      where:{
        user_id:req.decoded.userId
      }
    })
    req.data = files;
    next()
  }catch(e){
    req.error = e
    next()
  }
}

const getAllFiles = async(req,res,next)=>{
  try{
    const files = await File.findAll()
    req.data = files;
    next()
  }catch(e){
    req.error = e
    next()
  }
}


const saveFile = async(req,res,next)=>{
  try{
    const s3 = new AWS.S3();
    const unq = str(11)
    const filetype = req.body.file.type.split('/').slice(-1)
    const params = {
      "Bucket": userbucket,
      "CopySource": `/${userbucket}/${req.body.file.name}`,
      "ACL":"public-read",
      "Key": `${unq}.${filetype}`
    }
    const resp = await s3.copyObject(params).promise()
    const profilepic = `https://${userbucket}.s3.${region}.amazonaws.com/${unq}.${filetype}`
    const file = await File.create({
      uuid:unq,
      user_id:req.decoded.userId,
      user_uuid: req.decoded.user_uuid,
      filepath: `${unq}.${filetype}`,
      bucket: userbucket,
      url: profilepic,
      meta: resp,
      size: req.body.file.size
    })
    console.log(file.dataValues)
    req.data = {copied:resp,params:params,profilepic:profilepic,file:file.dataValues}
    //send to mediaserver
    next()
  }catch(e){
    console.log(e)
    req.error = e;
    next()
  }
}

module.exports = {
  saveFile,
  getAllFiles,
  getFiles
}