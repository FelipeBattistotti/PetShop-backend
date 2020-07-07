const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const api = require('./api');
const app = express();

app.use(cors());
app.use(express.json());
app.use(api);
app.use(errors());

module.exports = app;
