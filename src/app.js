const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

/* IMPORTING ROUTES */
const userRoutes = require('./Modules/User/Routes');
const cadernetaRoutes = require('./Modules/Caderneta/Routes');
const consultaRoutes = require('./Modules/Consulta/Routes')

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errors());

/* ROUTES */
app.use(userRoutes);
//app.use(cadernetaRoutes);
//app.use(consultaRoutes)

module.exports = app;