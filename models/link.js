module.exports = function(Sequelize,sequelize){
  const Link = sequelize.define('link', {
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    shortCode: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    longUrl: {
      type: Sequelize.STRING,
      allowNull: false
    },
    clicks: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    link_type: {
      type: Sequelize.STRING,
      default: 'href' //could be qrcode, in-video.. etc.
    }
  });

  //Link.sync({ alter: true })
  return Link
}