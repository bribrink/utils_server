/**
 * Created by bribrink on 3/6/2017.
 */
module.exports = function(Sequelize,sequelize){
    var User = sequelize.define('user', {
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        username: {
            type: Sequelize.STRING,
            unique: true
        },
        email:{
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: {
                msg:"Email must be of valid form" }
            }
        },
        password: {
            type: Sequelize.STRING
        },
        uuid:{
            type: Sequelize.UUID
        },
        profilepic: {
            type: Sequelize.STRING
        },
        verified: {
            type:Sequelize.BOOLEAN,
            default: false
        }
    });


    //User.sync({ alter: true })
    return User;

};



