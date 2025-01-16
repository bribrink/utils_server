const video = require('../models').Video
const job = require('../bin/job');
const str = require("../untilz/randomstring");
const generateName = async function(userId, bucket, pathname){
  // returns an insert record {
  //   id: 2,
  //     uuid: '3OiYlxasv8y',
  //   user_id: 33,
  //   bucket: 'bucket',
  //   url: 'url',
  //   updatedAt: 2024-12-20T05:49:20.819Z,
  //   createdAt: 2024-12-20T05:49:20.819Z
  // }
  return await generateUniqueStringAddToDb(userId, bucket, pathname)
}

const generateUniqueStringAddToDb = async function(userid,bucket,pathname) {
  console.log('Running')
  const result = str(11); //will be the video key
  try{
    const url = `https://${bucket}.s3.us-west-2.amazonaws.com/${result}/${result}.mpd`

    let resp = await video.create({uuid:result, user_id:userid, bucket:bucket, filepath:pathname, url:url })

    console.log(result, 'PATH', url, resp.dataValues)
    return resp.dataValues
  }catch(e){
    console.log(e.message)
    await generateUniqueStringAddToDb(userid,bucket,url)
  }
}

module.exports = {
  generateName
}
