const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Post extends Model {}

Post.init(
  {
    Titulo: DataTypes.STRING,
    Contenido: DataTypes.STRING,
    Imagen: {
      type: DataTypes.STRING,
      validate: {
        is: /[.]png$|[.]jpg$/gs,
      },
    },
    FechaDeCreacion: DataTypes.DATE
  },
  { sequelize, modelName: "post" ,timestamps: false  }
);

module.exports = Post;
