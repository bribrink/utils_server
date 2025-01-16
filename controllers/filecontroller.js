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
  }
}

module.exports = {
  getFiles
}