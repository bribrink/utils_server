const { Model } = require("../models");
const get = async(req,res,next)=>{
  try{
    const data = async ()=>{}
    req.data = data;
    next()
  }catch(e){
    req.error = e
    next();
  }
}

module.exports = {
  get
}