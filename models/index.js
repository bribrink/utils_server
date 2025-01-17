const Sequelize = require('sequelize');
//var cfg = require('../lib/config.js');
const models = {};
const { NODE_ENV } = process.env;



const db = NODE_ENV==='development' ?
  {
  host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'wde475&88&&*dhfG',
    database: 'pc_local',
    dialect: 'mariadb'
} : {
  host: 'athleteforlife.cf5wt13purb7.us-west-2.rds.amazonaws.com',
    port: 3306,
    username: 'bribrink',
    password: '23sh4eDD436452WSd3e',
    database: 'parentcritic',
    dialect: "mysql"
}

//console.log('DB', db, NODE_ENV)

const sequelize = new Sequelize(
  db.database,
  db.username,
  db.password,
  {
    host: db.host,
    dialect: db.dialect,

    pool: {
      max: 10,
      min: 0,
      idle: 10000
    }
  });

models.sequelize = sequelize;
models.User = require('./user')(Sequelize,sequelize);
models.Token = require('./tokens')(Sequelize,sequelize);
models.Video = require('./videos')(Sequelize,sequelize);
models.File = require('./files')(Sequelize,sequelize);
models.Like = require('./like')(Sequelize,sequelize);
models.Follow = require('./follow')(Sequelize,sequelize);
models.Tag = require('./tag')(Sequelize,sequelize);
models.Rate = require('./rate')(Sequelize,sequelize);
models.Videotrack = require('./videotrack')(Sequelize,sequelize);
models.Click = require('./clicks')(Sequelize,sequelize);

const Video = models.Video;
const User = models.User;

User.hasMany(Video,{foreignKey:'id'})
Video.belongsTo(User,{foreignKey:'user_id'})

module.exports = models