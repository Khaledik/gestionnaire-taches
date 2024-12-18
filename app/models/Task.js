const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Task = db.define("Task", {
  id: { type: DataTypes.INTEGER, autoIncrements: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  date_start: { type: DataTypes.DATE, allowNull: false },
  date_end: { type: DataTypes.DATE, allowNull: true },
  done: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});

module.exports = Task;
