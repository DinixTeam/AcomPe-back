const mongoose = require('mongoose');


const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    parentName: {
      type: String,
      required: true,
    },
    cpf:{
      type: String,
      required: true
    },
    rg:{
      type: String,
      required: true
    },
    sex:{
      type: String,
      required: true
    },
    bornDate:{
      type: Date,
      required: true
    },
    password: {
      type: String
    },
    phone:{
      type: String,
      required: true
    },
    pediatraResponsavel:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Pediatra',
      required: true
    },
    caderneta:{
        type: mongoose.Schema.ObjectId,
        ref: 'Caderneta',
    },
    atendimento:{
      type: mongoose.Schema.ObjectId,
      ref: 'Atendimento',
    },
    consultas:[
      {
      type: mongoose.Schema.ObjectId,
      ref: 'Consulta',
      }
    ],
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Patient', PatientSchema);
