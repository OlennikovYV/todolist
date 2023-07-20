const config = require("../config/db.config.js");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,
  // Время выполнения операций в логе
  benchmark: true,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user/user.model.js")(sequelize, Sequelize);
db.task = require("./task/task.model.js")(sequelize, Sequelize);
db.priority = require("./priority/priority.model.js")(sequelize, Sequelize);

db.priority.hasMany(db.task, {
  foreignKey: "priorityId",
});
db.task.belongsTo(db.priority);

module.exports = db;
