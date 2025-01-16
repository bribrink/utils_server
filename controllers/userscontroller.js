const createError = require('http-errors');

const User = require('../models').User;
const File = require('../models').File;
const AWS = require('../untilz/aws')
const str = require('../untilz/randomstring');
const {userbucket,videobucket,region} = require('../untilz/configz')

const getAuthenticatedUser = async (req, res, next) => {
    try {
        req.data = await User.findOne({
            attributes: ['email', 'id','username','uuid','createdAt'],
            where:{
                id:res.decoded.userId
            },
            raw:true,
            logging: false
        })
        req.data.channelName = ''
        req.data.photoUrl = ''
        next()
    } catch(error) {
        res.error = error
        return next(error);
    }

};

const getUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
    
        const user = users.find(user => user.id == id);
    
        if (user) {
            return res.status(200).json({
                data: user
            })
        }
    
        const error = createError.NotFound();
        throw error;
    } catch(error) {
        return next(error);
    }
};

const setProfileImage = async (req,res,next) =>{
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
        const updated = await User.update(
          {profilepic:profilepic},
          {
              where:{
                  id: req.decoded.userId
              }
          })
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
        req.error = e;
        next()
    }
};

const adminGetUsers = async (req,res,next)=>{
    try{
        const users = await User.findAll()
        req.data = users
    }catch(e){
        req.error = e
    }
    next();
}

module.exports = {
    adminGetUsers,
    getAuthenticatedUser,
    getUserById,
    setProfileImage
}