const express = require("express");
const app = express();
const sequelize = require("./database/db");
require("./database/Asociaciones");

const Post = require("./database/models/Post");
const Categoria = require("./database/models/Categoria");

//Config
const PORT = process.env.PORT || 3000;

//el metodo json es para obtener el body del request en formato json
app.use(express.json());

//Rutas
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/posts", (req, res) => {
  Post.findAll({
    include: {
      model: Categoria,
    },
  })
    .then(function (post) {
      res.json(post);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  Post.findByPk(id)
    .then(function (post) {
      res.json(post);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

app.post("/posts", (req, res) => {
  const post = Post.build({
    Titulo: req.body.Titulo,
    Contenido: req.body.Contenido,
    Imagen: req.body.Imagen,
    Categoria: req.body.Categoria,
    FechaDeCreacion: Date.now(),
  });
  post
    .save()
    .then(function (datos) {
      return res.send(datos);
    })
    .catch((error) => {
      res.send(error.message);
    });
});

app.patch("/posts/:id", async (req, res) => {
  const id = req.params.id;
  Post.update(req.body, { where: { id: id } })
    .then((data) => {
      res.json(`${data} fila con id: ${id} se ha actualizado`);
    })
    .catch((error) => {
      console.error(error.message);
    });
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  Post.destroy({ where: { id: id } })
    .then((data) => {
      res.json(`${data} fila con id: ${id} se ha eliminado`);
    })
    .catch((error) => {
      console.error(error.message);
    });
});

//Server Start
app.listen(PORT, async () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  try {
    // await sequelize.sync({ force: true })
    // await sequelize.sync({ force: false })
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
});
