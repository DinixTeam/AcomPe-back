require('dotenv').config();

const Atendimento = require('../Model/index');
const Patient = require('../../Patient/Model/index');

async function createFirstMonth(req, res) {
  try {

    const { perimetroCefalico, peso, comprimento, leiteLME, leiteLMLA, dificuldadeAmamentar, parouAmamentar, pezinho, orelhinha, olhinho, coracaozinho,
      cotoUmbilical, inctericia, diarreiaVomito, dificuldadeRespirar, febre, hipotermia, convulsoesOuMovAnor,
      auscultaCardiaca, aberturaOcular, pupilasNormais, estrabismo, patientID, pediatraID } = req.body;

    const patientAtendimento = await Patient.findById(patientID)

    if(!patientAtendimento){
      return res.status(404).send({ message: 'Paciente não foi encontrado!' });
    }

    if(patientAtendimento.atendimento != undefined){
      return res.status(409).send({ message: 'Nao e possivel realizar tal acao!' });
    }

    const atendi = await Atendimento.create({
      perimetroCefalico: perimetroCefalico,
      peso: peso,
      comprimento: comprimento,
      leiteLME: leiteLME,
      leiteLMLA: leiteLMLA,
      dificuldadeAmamentar: dificuldadeAmamentar,
      parouAmamentar: parouAmamentar,
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
      { $push: { atendimento: atendi._id } },
    );

    return res.status(201).send({ message: 'Atendimento criado!' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function readAtendimentoFromPatient(req, res) {
  try {

    const { patientID } = req.params;

    const patientAtendimento = await Patient.findById(patientID).populate('atendimento')

    if (!patientAtendimento) {
      return res.status(404).send({ message: 'Paciente não foi encontrado!' });
    }

    var atendimento = patientAtendimento.atendimento

    return res.status(200).send({atendimento});
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

module.exports = {
    createFirstMonth,
    readAtendimentoFromPatient
  };