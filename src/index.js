const express = require('express');
const handlebars = require('express-handlebars');
const config = require('./config/config');
const routes = require('./config/routes');
const app = express();

app.use('/static', express.static('static'));

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(routes);

app.listen(config.development, () => console.log(`App is listening on port ${config.development.port}`));