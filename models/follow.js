module.exports = function(Sequelize,sequelize){
  const Follow = sequelize.define('follow', {
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    channel_uuid: {
      ///will be the user uuid for now
      type: Sequelize.STRING,
      unique: true
    },
    user_uuid: {
      type: Sequelize.STRING
    }
  });

  //Follow.sync({ alter: true })
  return Follow
}