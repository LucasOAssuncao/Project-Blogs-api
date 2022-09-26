const express = require('express');
const login = require('./controllers/login');
const user = require('./controllers/user');
const validateToken = require('./middlewares/tokenValidation');
const categories = require('./controllers/categories');
const post = require('./controllers/post');
// ...

const app = express();

app.use(express.json());

app.post('/login', login);
app.post('/user', user.insert);
app.post('/categories', validateToken, categories.insert);
app.post('/post', validateToken, post.insert);
app.get('/post', validateToken, post.getAll);

app.get('/user', validateToken, user.getAll);
app.get('/categories', validateToken, categories.getAll);
app.get('/user/:id', validateToken, user.getById);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
