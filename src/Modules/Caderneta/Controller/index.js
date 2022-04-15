require('dotenv').config();

const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');


const Caderneta = require('../Model/index');
const User = require('../../User/Model/index');

async function create(req, res) {
  try {



    return res.status(201).send({ message: 'Caderneta criada' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function read(req, res) {
  try {



    return res.status(200).send();
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

module.exports = {
  create,
  read,
};
