module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fathername: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      supervisorid: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return User;
};
