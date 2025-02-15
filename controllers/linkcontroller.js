const {User} = require("../models");
const Link = require('../models').Link
const Link_Click = require('../models').Link_Click
const str = require('../untilz/randomstring')
const getLinks = async (req, res, next) => {
  console.log(req.decoded)
  req.data = await Link.findAll()
  next();
}

const getLinkData = async (req, res, next) => {
  req.data = await Link_Click.findAll({
    where: {
      shortCode: req.query.shortcode
    }
  })
  next()
}

const createLink = async(req,res,next)=>{
  try{
    console.log(req.body)
    const code = str(8)
    req.data = await Link.create({
      shortCode: code,
      longUrl: req.body.url,
      link_type: req.body.type,
      qrcode_data: req.body.qrcode_data
    })
  }catch(e){
    console.log(e)
    req.error = e
  }
  next()
}

module.exports = {
  getLinks,
  getLinkData,
  createLink
}