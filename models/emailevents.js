module.exports = function(Sequelize,sequelize){
  const Emailevents = sequelize.define('emailevent', {
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    email:{
      type: Sequelize.STRING(50)
    },
    event_id:{
      type: Sequelize.STRING(50)
    },
    uuid: {
      type: Sequelize.STRING(50),
    },
    event: {
      type: Sequelize.STRING(20)
    },
    data: {
      type: Sequelize.STRING(5000)
    }
  });

  //Emailevents.sync({ alter: true })
  return Emailevents
}