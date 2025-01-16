const Like = require('../models').Like
const Rate = require('../models').Rate
const sequelize = require('../models').sequelize

const likeVideo = async(req,res,next)=>{
  try{
    console.log(req.body)
    let resp = await Like.upsert({
      video_uuid:req.body.video_uuid,
      user_uuid:req.decoded.user_uuid})
    req.data = resp.dataValues
  }catch(e){
    req.error = e
  }
  next()
}

const rateVideo = async(req,res,next)=>{
  try{
    console.log(req.body)
    let resp = await Rate.upsert({
      video_uuid:req.body.video_uuid,
      user_uuid: req.decoded.user_uuid,
      rating:req.body.rating
    })
    req.data = resp
  }catch(e){
    req.error=e
  }
  next()
}

const getVideoLikes = async(req,res,next) =>{
  const {count, rows} = await Like.findAndCountAll({
    where:{
      video_uuid:req.params.uuid||req.body.video_uuid
    }
  })
  req.data = count
  next()
}

const getVideoRating = async(req,res,next)=>{
  try{
    const resp = await Rate.findAll({
      raw:true,
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgrating']],
      where:{
        video_uuid:req.params.uuid||req.body.video_uuid
      }
    })
    let av = Math.round(resp[0].avgrating * 2) / 2
    req.data = {averagerating:av}
  }catch(e){
    req.error=e
  }

  next()
}

const getVideoLikesAndRatings = async(req,res,next)=> {
  try{
    const {count, rows} = await Like.findAndCountAll({
      where:{
        video_uuid:req.params.uuid||req.body.video_uuid
      }
    })
    const resp = await Rate.findAll({
      raw:true,
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgrating']],
      where:{
        video_uuid:req.params.uuid||req.body.video_uuid
      }
    })
    console.log(resp[0])
    let av = Math.round(resp[0].avgrating * 2) / 2
    req.data = {averagerating:av,likes:count}
  }catch(e){
    req.error=e
  }
  next();
}

module.exports = {
  getVideoLikesAndRatings,
  getVideoRating,
  getVideoLikes,
  likeVideo,
  rateVideo
}