const Post = require('./models/Post');
const Categoria = require('./models/Categoria');


Categoria.hasOne(Post);

Post.belongsTo(Categoria);