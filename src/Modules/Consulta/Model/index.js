require('dotenv').config();
const { string } = require('joi');
const mongoose = require('mongoose');

const ConsultaSchema = new mongoose.Schema(
  {
    consulta: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    glicose: {
        type: Number,
        required: true
    },
    consultaDate: {
        type: Date,
        required: true
    },
    pacientSituation: {
        type: String,
        required: true
    },
    patientOwner:{
      type: mongoose.SchemaTypes.ObjectId,
      required: true
    },
    pediatraOwner:{
      type: mongoose.SchemaTypes.ObjectId,
      required: true
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
