require('dotenv').config();

const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');


const Consulta = require('../Model/index');
const Patient = require('../../Patient/Model/index');

async function create(req, res) {
  try {

    const { weight, height, glicose, consultaDate, pacientSituation, patientID, pediatraID } = req.body;

    const patientConsult = await Patient.findById(patientID)

    patientConsult.consultas.length

    var consulta = patientConsult.consultas.length + 1;

    const consult = await Consulta.create({
      consulta: consulta,
      weight: weight,
      height : height,
      glicose : glicose,
      consultaDate: consultaDate,
      pacientSituation: pacientSituation,
      patientOwner: patientID,
      pediatraOwner: pediatraID,
    });

    await Patient.findByIdAndUpdate(
      { _id: patientID },
      { $push: { consultas: consult._id } },
    );

    return res.status(201).send({ message: 'Consulta criada' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function read(req, res) {
  try {

    const consult = await Consulta.find()

    return res.status(200).send({consult});
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

module.exports = {
  create,
  read,
};
