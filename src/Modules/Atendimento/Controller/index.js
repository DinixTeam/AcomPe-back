require('dotenv').config();

const Atendimento = require('../Model/index');
const Patient = require('../../Patient/Model/index');

async function createFirstMonth(req, res) {
  try {

    const { perimetroCefalico, peso, comprimento, pezinho, orelhinha, olhinho, coracaozinho,
      cotoUmbilical, inctericia, diarreiaVomito, dificuldadeRespirar, febre, hipotermia, convulsoesOuMovAnor,
      auscultaCardiaca, aberturaOcular, pupilasNormais, estrabismo, patientID, pediatraID } = req.body;

    const patientConsult = await Patient.findById(patientID)

    if(!patientConsult){
      return res.status(404).send({ message: 'Paciente não foi encontrado!' });
    }

    const consult = await Atendimento.create({
      consulta: 1,
      perimetroCefalico: perimetroCefalico,
      peso: peso,
      comprimento: comprimento,
      pezinho: pezinho,
      orelhinha: orelhinha,
      olhinho: olhinho,
      coracaozinho: coracaozinho,
      cotoUmbilical: cotoUmbilical,
      inctericia: inctericia,
      diarreiaVomito: diarreiaVomito,
      dificuldadeRespirar: dificuldadeRespirar,
      febre: febre,
      hipotermia: hipotermia,
      convulsoesOuMovAnor: convulsoesOuMovAnor,
      auscultaCardiaca: auscultaCardiaca,
      aberturaOcular: aberturaOcular,
      pupilasNormais: pupilasNormais,
      estrabismo: estrabismo,
      patientOwner: patientID,
      pediatraOwner: pediatraID,
    });

    await Patient.findByIdAndUpdate(
      { _id: patientID },
      { $push: { consultas: consult._id } },
    );

    return res.status(201).send({ message: 'Atendimento criado!' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

module.exports = {
    createFirstMonth,
  };