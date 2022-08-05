const express = require('express');
const config = require('../config/config');

const app = express();

app.get('/', (req, res) => {
    res.send("Welcome world");
});

app.listen(config.development, () => console.log(`App is listening on port ${config.development.port}`));