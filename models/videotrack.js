module.exports = function(Sequelize,sequelize){
  const Videotrack = sequelize.define('videotrack', {
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    video_uuid: {
      type: Sequelize.STRING,
    },
    user_uuid:{
      type:Sequelize.STRING,
      nullable: true
    },
    starttime: {
      type: Sequelize.STRING
    },
    endtime:{
      type: Sequelize.STRING
    }
  });

  //Videotrack.sync({ alter: true })
  return Videotrack;

};