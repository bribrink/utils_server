const User = require('../models').User;
const { Op } = require("sequelize");
const crypto = require('crypto')
const response = require('../middleware/response')
const {PASSWORD_SALT } = process.env;
const token = require('../middleware/token')
const sendsms = require('../untilz/telnyxsend')

const signUp = async (req, res, next) => {
  const {name, username, email, password} = req.body;
  if (!name || !username || !email || !password) {
    return res.json({
      error: 'Please fill all the required fields'
    });
  }
  try {
    const userAlreadyExists =  await User.findOne({
      where:{
        [Op.or]:[{email:username},{username:username}]
      },
      raw:true
    })

    if (!!userAlreadyExists) {
        return res.json({error:{message:'User/Email exist',code:'USER_EXISTS'}})
    }

    const hash = HashPassword(password)
    const uuid = crypto.randomUUID();
    const newUser = await User.create({
      email:email,username:username,password:hash,uuid:uuid
    })

    sendsms(username, email)

    req.user = newUser.dataValues;
    req.data = newUser.dataValues;
    return next();
  } catch (error) { console.log(error)
    return next(error);
  }
};

const login = async (req, res, next) => {
  const {username, password} = req.body;
  //console.log('SALT', PASSWORD_SALT, username, password, req.body)
  try {
    if (!username || !password) {
      return response.error(res,'Username/Password required', 'MISSING_DATA')
    }

    const checkuser = await User.findOne({
      where:{
        [Op.or]:[{email:username},{username:username}]
      },
      raw:true
    })
    //console.log('CHECKUSER', checkuser)
    const user = (checkuser.username === username || checkuser.email === username)
    //console.log('USER', user)
    if (!user) {
      return response.loginerror(res)
    }
    const hpw = HashPassword(password)
    const passwordsMatch = checkuser.password === hpw;
    // console.log('CHECKPASSWORD',
    //   PASSWORD_SALT,
    //   checkuser.password === hpw,
    //   checkuser.password, hpw,
    //   checkuser.password.length,
    //   hpw.length
    // )
    if (!passwordsMatch) {
      return response.loginerror(res)
    }

    req.user = checkuser
    req.data = checkuser
    return next();
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  await token.clearTokens(res)
  next()
};

const refreshAccessToken = async (req, res, next) => {
  const {REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE} = process.env;
  const {signedCookies} = req;
  const {refreshToken} = signedCookies;
  if (!refreshToken) {
    return res.sendStatus(204);
  }
  try {
    const refreshTokenInDB = tokens.find(token => token.refreshToken === refreshToken)?.refreshToken;

    if (!refreshTokenInDB) {
      await clearTokens(req, res, next);
      const error = createError.Unauthorized();
      throw error;
    }

    try {
      const decodedToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
      const {userId} = decodedToken;
      const user = users.find(user => user.id == userId);

      if (!user) {
        await clearTokens(req, res);
        const error = createError("Invalid credentials", 401);
        throw error;
      }

      const accessToken = generateJWT(
        user.id,
        ACCESS_TOKEN_SECRET,
        ACCESS_TOKEN_LIFE
      );
      return res.status(200).json({
        user,
        accessToken,
        expiresAt: new Date(Date.now() + ms(ACCESS_TOKEN_LIFE)),
      });
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  signUp,
  login,
  logout,
  refreshAccessToken
};

function HashPassword(pw){
  return crypto.createHash('sha512', PASSWORD_SALT)
    .update(pw)
    .digest('hex');
}