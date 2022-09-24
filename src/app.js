const express = require('express');
const login = require('./controllers/login');
const user = require('./controllers/user');
const validateToken = require('./middlewares/tokenValidation');
// ...

const app = express();

app.use(express.json());

app.post('/login', login);
app.post('/user', user.insert);
app.get('/user', validateToken, user.getAll);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
