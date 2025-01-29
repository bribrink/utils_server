const Link = require('../models').Link;
const str = require('../untilz/randomstring');
const createlink = async(req,res,next)=>{
  let shortcode = str(5)
  let link = await Link.create({
    shortCode: shortcode,
    longUrl: req.body.url,
    clicks: 0,
    link_type: 'href'
  })
  req.data = link;
  next()
}

module.exports = {
  createlink
}