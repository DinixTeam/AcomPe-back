require('dotenv').config();
const { string } = require('joi');
const mongoose = require('mongoose');

const ConsultaSchema = new mongoose.Schema(
  {
    consulta: {
        type: Number
    },
    weight: {
        type: Number
    },
    height: {
        type: Number
    },
    glicose: {
        type: Number
    },
    consultaDate: {
        type: Date
    },
    pacientSituation: {
        type: String
    }
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Consulta', ConsultaSchema);
