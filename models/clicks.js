module.exports = function(Sequelize,sequelize){
  const Click = sequelize.define('click', {
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    url: {
      type: Sequelize.STRING
    },
    target: {
      type: Sequelize.STRING
    },
    targethost: {
      type: Sequelize.STRING
    },
    token: {
      type: Sequelize.STRING
    },
    print: {
      type: Sequelize.STRING
    }
  });

  //Click.sync({ alter: true })
  return Click
}