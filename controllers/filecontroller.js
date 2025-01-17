const File = require('../models').File

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

module.exports = {
  getAllFiles,
  getFiles
}