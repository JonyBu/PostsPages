const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Categoria extends Model {}

Categoria.init(
  {
    name: DataTypes.STRING,
  },
  { sequelize, modelName: "categoria", timestamps: false }
);

module.exports = Categoria;
