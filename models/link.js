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
    },
    qrcode_data: {
      type: Sequelize.TEXT,
      get(){
        const rawValue = this.getDataValue('qrcode_data');
        return JSON.parse(rawValue)
      },
      set(value){
        this.setDataValue('qrcode_data',JSON.stringify(value))
      }
    }
  });

  //Link.sync({ alter: true })
  return Link
}