require('dotenv').config();
const { string } = require('joi');
const mongoose = require('mongoose');

const AtendimentoSchema = new mongoose.Schema(
  {
    consulta: {
        type: Number,
        required: true
    },
    perimetroCefalico: {
      type: Number
    },
    peso: {
      type: Number
    },
    comprimento: {
      type: Number
    },
    pezinho: {
      type: Boolean
    },
    orelhinha: {
      type: Boolean
    },
    olhinho: {
      type: Boolean
    },
    coracaozinho: {
      type: Boolean
    },
    cotoUmbilical: {
      type: Boolean
    },
    inctericia: {
      type: Boolean
    },
    diarreiaVomito: {
      type: Boolean
    },
    dificuldadeRespirar: {
      type: Boolean
    },
    febre: {
      type: Boolean
    },
    hipotermia: {
      type: Boolean
    },
    convulsoesOuMovAnor: {
      type: Boolean
    },
    auscultaCardiaca: {
      type: Boolean
    },
    aberturaOcular: {
      type: Boolean
    },
    pupilasNormais: {
      type: Boolean
    },
    estrabismo: {
      type: Boolean
    }
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Atendimento', AtendimentoSchema);
