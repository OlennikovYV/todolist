module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "2357",
  DB: "todolist",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
