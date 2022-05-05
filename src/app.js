const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');

/* IMPORTING ROUTES */
const pediatraRoutes = require('./Modules/Pediatra/Routes');
const patientRoutes = require('./Modules/Patient/Routes');
const cadernetaRoutes = require('./Modules/Caderneta/Routes');
const consultaRoutes = require('./Modules/Consulta/Routes')

const app = express();

var fileupload = require('express-fileupload');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(errors());
app.use(fileupload());

/* ROUTES */
app.use(pediatraRoutes);
app.use(patientRoutes);
app.use(cadernetaRoutes);
app.use(consultaRoutes);

module.exports = app;