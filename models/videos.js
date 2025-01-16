module.exports = function(Sequelize,sequelize){
  const Video = sequelize.define('video', {
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    uuid: {
      type: Sequelize.STRING,
      unique: true
    },
    user_id:{
      type:Sequelize.INTEGER
    },
    user_uuid:{
      type:Sequelize.UUID
    },
    filepath:{
      type:Sequelize.STRING
    },
    bucket: {
      type: Sequelize.STRING,
    },
    url: {
      type: Sequelize.STRING,
    },
    meta: {
      type: Sequelize.STRING(5000),
      get(){
        const rawValue = this.getDataValue('meta');
        return JSON.parse(rawValue)
      },
      set(value){
        this.setDataValue('meta',JSON.stringify(value))
      }
    },
    size: {
      type: Sequelize.INTEGER
    }
  });

  //Video.sync({ alter: true })
  return Video;

};