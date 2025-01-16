module.exports = function(Sequelize,sequelize){
  const Tag = sequelize.define('tag', {
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    video_uuid: {
      ///will be the user uuid for now
      type: Sequelize.STRING,
      unique: true
    },
    user_uuid: {
      type: Sequelize.STRING
    }
  });

  //Tag.sync({ alter: true })
  return Tag
}