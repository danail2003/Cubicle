const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const routes = require('./config/routes');
const { initializeDb } = require('./config/database');
const { auth } = require('./middlewares/authMiddleware');
const app = express();

app.use('/static', express.static('static'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

require('./config/handlebars')(app);
app.use(auth);
app.use(routes);

initializeDb()
    .then(() => {
        app.listen(config.development, () => console.log(`App is listening on port ${config.development.port}`));
    })
    .catch(err => {
        console.log(err.message);
    });
