'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: "TaskCategory" });
    }
  }
  Task.init({
    TaskID:{
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    TaskName: DataTypes.STRING,
    TaskCategory: DataTypes.NUMBER,
    TaskCompleted: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Task',
    // disable default Sequelize createdAt, updatedAt
    createdAt: false,
    updatedAt: false,
  });
  return Task;
};