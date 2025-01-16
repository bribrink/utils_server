const response = require('../middleware/response')
const Videotrack = require('../models').Videotrack

const startPlay = async(req,res,next)=>{
  const resp = await Videotrack.create({
    video_uuid: req.body.video_uuid,
    user_uuid: req.decoded.user_uuid||null,
    starttime: req.body.starttime,
    endtime: req.body.endtime
  })
}

const endPlay = async(req,res,next)=>{

}

module.exports = {
  startPlay,
  endPlay
}