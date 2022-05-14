require('dotenv').config();

const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');


const Caderneta = require('../Model/index');
const Patient = require('../../Patient/Model/index')

async function create(req, res) {
  try {

    const { perimetroCefalico, peso, comprimento, leiteLME, leiteLMLA, dificuldadeAmamentar, parouAmamentar,
    cotoUmbilical, inctericia, diarreiaVomito, dificuldadeRespirar, febre, hipotermia, convulsoesOuMovAnor,
    auscultaCardiaca, hepatiteB, bcg, patientID, pediatraID } = req.body;

    const patientCadernet = await Patient.findById(patientID)

    if(!patientCadernet){
      return res.status(404).send({ message: 'Paciente não foi encontrado!' });
    }

    if(patientCadernet.caderneta.length != 0){
      return res.status(409).send({ message: 'Nao e possivel realizar tal acao!' });
    }

    const caderneta = await Caderneta.create({
      perimetroCefalico: perimetroCefalico,
      peso: peso,
      comprimento: comprimento,
      leiteLME: leiteLME,
      leiteLMLA: leiteLMLA,
      dificuldadeAmamentar: dificuldadeAmamentar,
      parouAmamentar: parouAmamentar,
      cotoUmbilical: cotoUmbilical,
      inctericia: inctericia,
      diarreiaVomito: diarreiaVomito,
      dificuldadeRespirar: dificuldadeRespirar,
      febre: febre,
      hipotermia: hipotermia,
      convulsoesOuMovAnor: convulsoesOuMovAnor,
      auscultaCardiaca: auscultaCardiaca,
      hepatiteB: hepatiteB,
      bcg: bcg,
      patientOwner: patientID,
      pediatraOwner: pediatraID,
    });

    await Patient.findByIdAndUpdate(
      { _id: patientID },
      { $push: { caderneta: caderneta._id } },
    );

    return res.status(201).send({ message: 'Caderneta criada' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function readCadernetaFromPatient(req, res) {
  try {

    const { patientID } = req.params;

    const patientCaderneta = await Patient.findById(patientID).populate('caderneta')

    if (!patientCaderneta) {
      return res.status(404).send({ message: 'Paciente não foi encontrado!' });
    }

    var caderneta = patientCaderneta.caderneta

    return res.status(200).send({caderneta});
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

module.exports = {
  create,
  readCadernetaFromPatient,
};
