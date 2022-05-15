require('dotenv').config();
const { string } = require('joi');
const mongoose = require('mongoose');

const CadernetaSchema = new mongoose.Schema(
  {
    perimetroCefalico: {
        type: Number
    },
    peso: {
        type: Number
    },
    comprimento: {
        type: Number
    },
    leiteLME: {
        type: Boolean
    },
    leiteLMLA: {
        type: Boolean
    },
    dificuldadeAmamentar: {
        type: Boolean
    },
    parouAmamentar: {
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
    hepatiteB: {
        type: Boolean
    },
    bcg: {
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now
    }
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Caderneta', CadernetaSchema);
