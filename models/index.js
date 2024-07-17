const Sequelize = require("sequelize");
const SpeedData = require("./SpeedData");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    operatorsAliases: false,
    timezone: '+09:00',
    port: config.port,
  }
);

db.sequelize = sequelize;

db.SpeedData = SpeedData;

SpeedData.initiate(sequelize);

SpeedData.associate(db);

module.exports = db;
