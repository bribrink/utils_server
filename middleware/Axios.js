const axios = require('axios')

const postImageProcess =  async(req,res,next)=>{

  const params = {
    method:'post',
    url:'http://localhost:5002/images',
    headers: {
      'Content-Type': 'application/json'
    },
    data:{
      url: req.data.profilepic,
      user_id:req.decoded.userId,
      user_uuid: req.decoded.user_uuid,
      uuid: req.data.file.uuid
    },
  }
  console.log(params)
  let resp = await axios(params)
  next()
}

module.exports = {
  postImageProcess
}