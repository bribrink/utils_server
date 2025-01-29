module.exports = function(Sequelize,sequelize,Link){
  const Link_Click = sequelize.define('link_click', {
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    shortCode: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
      references: {
        model: Link,
        key: 'shortCode'
      }
    },
    print: {
      type: Sequelize.STRING,
      allowNull: true
    },
    ip: {
      type: Sequelize.STRING
    }
  });

  //Link_Click.sync({ alter: true })
  return Link_Click
}