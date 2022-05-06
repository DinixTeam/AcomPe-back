require('dotenv').config();

const Consulta = require('../Model/index');
const Patient = require('../../Patient/Model/index');

async function create(req, res) {
  try {

    const { weight, height, glicose, consultaDate, pacientSituation, patientID, pediatraID } = req.body;

    const patientConsult = await Patient.findById(patientID)

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

async function readConsultsFromPatient(req, res) {
  try {

    const { patientID } = req.body

    const patientConsults = await Patient.findById(patientID).populate('consultas')

    if (!patientConsults) {
      return res.status(404).send({ message: 'Paciente não foi encontrado!' });
    }

    consults = patientConsults.consultas

    return res.status(200).send({consults});
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

module.exports = {
  create,
  readConsultsFromPatient,
};
