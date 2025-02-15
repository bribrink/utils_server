const data = (req,res,next)=>{
  if(req.error){
    return res.json({error: {message:req.error.message,code:req.error.code}})
  } else{
    res.json({data: req.data, tokens: req.tokens || false, decoded: req.decoded || false})
  }
}



const send = (data) => {
  return (req,res,next) => {
    res.json(data)
  }

}

const expired = (res) =>{
  return error(res,  'expired login credentials, please log in again', 'TOKEN_EXPIRED')
}

const error = (res,msg,code)=> {
  return res.json({error: {message:msg,code:code}})
}

const loginerror = (res) => {
  return res.json({error:{message:'Invalid username or password', code:'INVALID_DATA'}})
}

const readbody = (req,res,next) => {
  console.log('POST BODY',req.body);
  next()
}

const ok = (req,res,next)=>{
  res.sendStatus(200)
}



module.exports = {
  ok,
  data,
  expired,
  error,
  loginerror,
  send,
  readbody
}