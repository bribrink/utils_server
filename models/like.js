module.exports = function(Sequelize,sequelize){
  const Like = sequelize.define('like', {
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    video_uuid: {
      type: Sequelize.STRING,
      unique: true
    },
    user_uuid: {
      type: Sequelize.STRING
    }
  });

  //Like.sync({ alter: true })
  return Like
}