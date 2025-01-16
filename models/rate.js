module.exports = function(Sequelize,sequelize){
  const Rating = sequelize.define('rating', {
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
    },
    rating: {
      type: Sequelize.DECIMAL
    }
  });

  //Rating.sync({ alter: true })
  return Rating
}