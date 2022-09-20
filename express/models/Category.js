'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Task, { foreignKey: "TaskCategory" });
    }
  }
  Category.init({
    CategoryID: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    Title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category',
    // disable default Sequelize createdAt, updatedAt
    createdAt: false,
    updatedAt: false,
  });
  return Category;
};