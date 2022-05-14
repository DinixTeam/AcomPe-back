require('dotenv').config();

const Consulta = require('../Model/index');
const Patient = require('../../Patient/Model/index');

async function createOtherMonths(req, res) {
  try {

    const { perimetroCefalico, peso, comprimento, leiteLME, leiteLMLA, dificuldadeAmamentar, parouAmamentar, cotoUmbilical, inctericia, diarreiaVomito,
      dificuldadeRespirar, febre, hipotermia, convulsoesOuMovAnor,
      auscultaCardiaca, aberturaOcular, pupilasNormais, estrabismo, patientID, pediatraID } = req.body;

    const patientConsult = await Patient.findById(patientID)

    if(!patientConsult){
      return res.status(404).send({ message: 'Paciente não foi encontrado!' });
    }

    var consulta = patientConsult.consultas.length + 1;

    const consult = await Consulta.create({
      consulta: consulta,
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

    return res.status(201).send({ message: 'Consulta criada' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

module.exports = {
  createOtherMonths,
};
