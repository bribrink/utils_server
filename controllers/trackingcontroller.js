const sequelize = require('../models').sequelize
const Click = require('../models').Click;

const trackclick = async (req, res, next) => {
  try {
    console.log(req.body)
    const resp = await Click.create({
      targethost: req.body.targethost,
      target: req.body.target,
      url: req.body.url,
      token: req.body.token,
      print: req.body.print,
    })
    next()
  } catch (e) {
    next(e)///theoretically ends the request?
  }
}


module.exports = {
  trackclick
}