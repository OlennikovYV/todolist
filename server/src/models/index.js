const config = require("../config/db.config.js");
const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./extra-setup");

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

const modelDefiners = [
  require("./user/user.model.js"),
  require("./task/task.model.js"),
  require("./priority/priority.model.js"),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize, Sequelize);
}

// Дополнительные настройки после определения моделей
// Такие как добавление ассоциаций
applyExtraSetup(sequelize);

module.exports = sequelize;
