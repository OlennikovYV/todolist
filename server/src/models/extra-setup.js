function applyExtraSetup(sequelize) {
  const { priority, task } = sequelize.models;

  priority.hasMany(task, {
    foreignKey: "priorityId",
  });
  task.belongsTo(priority);
}

module.exports = { applyExtraSetup };
