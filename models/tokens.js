module.exports = function(Sequelize,sequelize){
  const Token = sequelize.define('token', {
    id:{
      type:Sequelize.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    token: {
      type: Sequelize.STRING,
      unique: true
    },
    fuuid: {
      type: Sequelize.STRING
    },
    user_id:{
      type:Sequelize.INTEGER
    },
    expirationTime: {
      type: Sequelize.BIGINT
    }
  });

  //Token.sync({ alter: true })
  return Token;

};