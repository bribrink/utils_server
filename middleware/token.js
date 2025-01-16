const jwt = require('jsonwebtoken')
const {ACCESS_TOKEN_LIFE, REFRESH_TOKEN_LIFE, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV} = process.env;
const response = require('../middleware/response')
const dev = NODE_ENV === 'development';
const Token = require('../models').Token
const crypto = require("crypto");
const refreshexpirey = parseInt(REFRESH_TOKEN_LIFE);
const accessexpirey = parseInt(ACCESS_TOKEN_LIFE);

const generateAuthTokens = async (req, res, next) => {
  try {
    const fuuid = crypto.randomUUID();
    const id = req.user.id
    const user_uuid = req.user.uuid
    const expt = Math.floor(Date.now() / 1000) + refreshexpirey
    req.tokens = await makeTokens(id, fuuid, user_uuid, expt)
    res.cookie("refreshToken", req.tokens.refresh, {
      httpOnly: true,
      secure: !dev,
      signed: true,
      //expires: Math.floor(Date.now() / 1000) + (60*3),
    });
  } catch (err) {
    console.log(err)
    response.error(res, 'Something went wrong', 'FUBAR')
  }
  next();
}

const verifyToken = async (req, res, next) => {
  const authToken = req.get('Authorization');
  const accessToken = authToken?.split('Bearer ')[1];
  if (!accessToken) {
    console.log('NO Access Token')
    clearTokens(res);
    return response.expired(res);
  }
  const decodedaccess = jwt.decode(accessToken, ACCESS_TOKEN_SECRET)
  try {
    req.decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET)
    console.log('ACCESS Token Verified', req.decoded)
    next();
  } catch (e) {
    if (e.message !== 'jwt expired') {
      response.error(res, 'Credentials Error', 'UNVERIFIED')
    }
    if (e.message === 'jwt expired') {  console.log('JWT ACCESS EXPIRED, ATTEMPTING TO REFRESH - ')
      //CHECK REFRESH TOKEN, IF GOOD, REFRESH ACCESS
      let rfrsh = await checkRefreshToken(req)
      if (rfrsh) {
        req.tokens = await makeTokens(
          decodedaccess.userId,
          decodedaccess.fuuid,
          decodedaccess.user_uuid,
          rfrsh.exp, //WE WANT THE OVERAL TOKEN FAMILY TO EXPIRE AT THE SAME TIME
        );
        res.cookie("refreshToken", req.tokens.refresh, {
          httpOnly: true,
          secure: !dev,
          signed: true,
          //expires: Math.floor(Date.now() / 1000) + (60*3),
        });
        req.decoded = decodedaccess //TODO change to 'res.decoded'
        next();
      } else {
        console.log(`REFRESH TOKEN ${rfrsh ? 'GOOD' : 'NO-GOOD :line 52'} `)
        clearTokens(res)
        return response.expired(res)
      }
    }
  }
}

//actual tokens get made here, so we can use same logic for gen or re-gen
//the family uuid can be grabbed from the previoous login
async function makeTokens(id, fuuid, user_uuid, expt) {
  const access = await generateAccessToken(id, fuuid, user_uuid)
  const refresh = await generateRefreshToken(id, fuuid, user_uuid, expt)
  return {access: access, refresh: refresh}
}

async function generateAccessToken(id, fuuid, user_uuid) {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + accessexpirey,
    audience: "http://pc/protected",
    issuer: "http://issuer",
    userId: id,
    user_uuid: user_uuid,
    fuuid: fuuid
  }, ACCESS_TOKEN_SECRET, {algorithm: 'HS256',})
}

async function generateRefreshToken(userid, fuuid, user_uuid, expt) {
  let rfsh = jwt.sign({
    exp: expt,
    audience: "http://pc/protected",
    issuer: "http://issuer",
    userId: userid,
    user_uuid: user_uuid,
    fuuid: fuuid
  }, REFRESH_TOKEN_SECRET, {algorithm: 'HS256',})
  await Token.create({token: rfsh, fuuid: fuuid, user_id: userid, user_uuid:user_uuid, expirationTime: expt});
  return rfsh
}

async function checkRefreshToken(req) {
  const {signedCookies = {}} = req;
  const {refreshToken} = signedCookies;
  try {
    let decoded = jwt.decode(refreshToken, REFRESH_TOKEN_SECRET)
    console.log('DECODED REFRESH', decoded)
    let dcv = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
    console.log('REFRESH TOKEN VERIFIED line 114')
    // let refreshTokenInDB = await Token.findOne({
    //   where: {
    //     fuuid: dcv.fuuid
    //   },
    //   raw: true,
    //   order:[['expirationTime', 'desc']]
    // })
    // console.log(refreshTokenInDB)
    return decoded
  } catch (e) {
    console.log('REFRESH TOKEN ERROR', e.message)
    return false
  }
}

async function clearTokens(res) {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: !dev,
    signed: true,
  });
  return;
}


module.exports = {
  generateAuthTokens,
  verifyToken,
  clearTokens
}