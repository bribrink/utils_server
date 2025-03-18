const sequelize = require('../models').sequelize
const Click = require('../models').Click;
const Emailevents = require('../models').Emailevents;

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

const trackEmailOpen = async (req, res, next) => {
  try {
    await Emailevents.create({
      uuid: req.params.uuid,
      event: 'Test',
      data: JSON.stringify(req.body)
    })
  } catch (error) {
    req.error = error
  }
  next()
}


const trackEmailEvent = async (req, res, next) => {
  const msg = JSON.parse(req.body.Sns.Message)
  console.log( msg.eventType,'\n', msg.mail.messageId.length, msg.mail.messageId,'\n', msg.mail.destination[0])
  try {
    await Emailevents.create({
      event_id: msg.mail.messageId,
      uuid: msg.mail.tags.psy,
      event: msg.eventType,
      data: JSON.stringify(req.body)
    })
  } catch (error) {
    req.error = error
  }
  next()
}


module.exports = {
  trackclick,
  trackEmailOpen,
  trackEmailEvent
}