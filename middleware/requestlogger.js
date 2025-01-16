const sequelize = require('../models').sequelize
module.exports = async function(req,res,next){
  //c//onsole.log(process.env.NODE_ENV)
  let orgn = req.get('origin') || req.get('referer') || req.originalUrl
  //console.log(orgn)
  if(req.get('user-agent')==='ELB-HealthChecker/2.0'){return next()}
  let body = JSON.stringify(req.body)||""
  let headers = JSON.stringify(req.headers)
  await sequelize.query('INSERT INTO requests (route,origin,body,method,headers) VALUES (?,?,?,?,?) ',{
    replacements:[
      req.path,
      orgn,
      JSON.stringify(req.body)||"",
      JSON.stringify(req.method),
      headers
    ],
    logging: false
  })
  next()
}
