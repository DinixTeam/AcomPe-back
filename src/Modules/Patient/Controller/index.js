const Patient = require('../Model');
const Pediatra = require('../../Pediatra/Model/index');

async function create(req, res) {

  try {

  const { name, parentName, cpf, rg, sex, bornDate, phone, pediatraID } = req.body;

  const validCPF = await Patient.find({ cpf: cpf })

  if(validCPF.length == 0){

  }else{
    return res
      .status(400)
      .json({ message: `Esse cpf já está em uso!` });
  }

  const pediatra = await Pediatra.findById(pediatraID)

  if(!pediatra){
    return res
      .status(404)
      .json({ message: `Pediatra nao encontrado!` });
  }

  const patient = await Patient.create({
    name,
    parentName,
    cpf,
    rg,
    sex,
    bornDate,
    phone,
    pediatraResponsavel: pediatraID
  });

  pediatra.patients.push(patient._id)

  patient.password = patient._id.toString();

  await patient.save();
  await pediatra.save();

  return res.status(200).send('Paciente Cadastrado!');
  }catch ({ message }) {
    res.status(500).json({ message });
  }
}

async function read(req, res) {
  try {
    const patient = await Patient.find()
      .sort('-createdAt')
      .select({ password: 0, _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });

    return res.status(200).send(patient);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}

async function readOne(req, res) {
  try {
    const { _id } = req.params;

    const patient = await Patient.findById({ _id }).select({
      password: 0,
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!patient) {
      return res.status(404).send({ message: 'Paciente não foi encontrado!' });
    }

    return res.status(200).send(patient);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function readCPF(req, res) {
  try {
    const { cpf } = req.params;

    const patient = await Patient.find({ cpf: cpf }).select({
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!patient) {
      return res.status(404).send({ message: 'Paciente não foi encontrado!' });
    }
    return res.status(200).send(patient);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function update(req, res) {
  try {
    const _id = req.patientId;
    const { body } = req;

    const patient = await Patient.findByIdAndUpdate({ _id }, body, { new: true });

    if (!patient) {
      return res
        .status(404)
        .json({ message: 'Esse paciente não foi encontrado!' });
    }

    await patient.save();

    return res.status(200).json({ message: 'Paciente atualizado' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function remove(req, res) {
  try {
    const _id = req.patientId;

    const patient = await Patient.findByIdAndDelete({ _id });

    if (!patient) {
      return res
        .status(404)
        .json({ message: 'Esse paciente não foi encontrado!' });
    }

    return res.status(200).send({ message: 'Paciente deletado' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function readConsultsFromPatient(req, res) {
  try {

    const { patientID } = req.params

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

async function graphIdadePeso(req, res) {
  try {

    const { patientID } = req.params

    const patientConsults = await Patient.findById(patientID).populate('consultas')
    const patientAtendimento = await Patient.findById(patientID).populate('atendimento')
    const patientCaderneta = await Patient.findById(patientID).populate('caderneta')

    var graphArray = [];

    graphArray.push(['Idade', 'Peso']);

    if (!patientCaderneta) {
      return res.status(404).send({ message: 'Paciente não foi encontrado ou ainda nao fez a primeira consulta!' });
    }

    graphArray.push(['1/4', patientCaderneta.caderneta.peso]);

    if(patientAtendimento.atendimento.peso == undefined){
      return res.status(200).send(graphArray);
    }else{
      graphArray.push(['1', patientAtendimento.atendimento.peso]);
    }
    if(patientConsults.consultas.length == 0){
      return res.status(200).send(graphArray);
    }else{
      for(var i = 0; i < patientConsults.consultas.length; i++){
        graphArray.push([`${(patientConsults.consultas[i].consulta - 1)}`, patientConsults.consultas[i].peso])
      }
    }

    return res.status(200).send(graphArray);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function graphIdadeComprimento(req, res) {
  try {

    const { patientID } = req.params

    const patientConsults = await Patient.findById(patientID).populate('consultas')
    const patientAtendimento = await Patient.findById(patientID).populate('atendimento')
    const patientCaderneta = await Patient.findById(patientID).populate('caderneta')

    var graphArray = [];

    graphArray.push(['Idade', 'Comprimento']);

    if (!patientCaderneta) {
      return res.status(404).send({ message: 'Paciente não foi encontrado ou ainda nao fez a primeira consulta!' });
    }

    graphArray.push(['1/4', patientCaderneta.caderneta.comprimento]);

    if(patientAtendimento.atendimento.comprimento == undefined){
      return res.status(200).send(graphArray);
    }else{
      graphArray.push(['1', patientAtendimento.atendimento.comprimento]);
    }
    if(patientConsults.consultas.length == 0){
      return res.status(200).send(graphArray);
    }else{
      for(var i = 0; i < patientConsults.consultas.length; i++){
        graphArray.push([`${(patientConsults.consultas[i].consulta - 1)}`, patientConsults.consultas[i].comprimento])
      }
    }

    return res.status(200).send(graphArray);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function graphIdadePerimetro(req, res) {
  try {

    const { patientID } = req.params

    const patientConsults = await Patient.findById(patientID).populate('consultas')
    const patientAtendimento = await Patient.findById(patientID).populate('atendimento')
    const patientCaderneta = await Patient.findById(patientID).populate('caderneta')

    var graphArray = [];

    graphArray.push(['Idade', 'Perimetro Cefalico']);

    if (!patientCaderneta) {
      return res.status(404).send({ message: 'Paciente não foi encontrado ou ainda nao fez a primeira consulta!' });
    }

    graphArray.push(['1/4', patientCaderneta.caderneta.perimetroCefalico]);

    if(patientAtendimento.atendimento.perimetroCefalico == undefined){
      return res.status(200).send(graphArray);
    }else{
      graphArray.push(['1', patientAtendimento.atendimento.perimetroCefalico]);
    }
    if(patientConsults.consultas.length == 0){
      return res.status(200).send(graphArray);
    }else{
      for(var i = 0; i < patientConsults.consultas.length; i++){
        graphArray.push([`${(patientConsults.consultas[i].consulta - 1)}`, patientConsults.consultas[i].perimetroCefalico])
      }
    }

    return res.status(200).send(graphArray);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function graphIdadeIMC(req, res) {
  try {

    const { patientID } = req.params

    const patientConsults = await Patient.findById(patientID).populate('consultas')
    const patientAtendimento = await Patient.findById(patientID).populate('atendimento')
    const patientCaderneta = await Patient.findById(patientID).populate('caderneta')

    var graphArray = [];
    graphArray.push(['Idade', 'IMC']);
    var imc = 0;

    if (!patientCaderneta) {
      return res.status(404).send({ message: 'Paciente não foi encontrado ou ainda nao fez a primeira consulta!' });
    }

    imc = (patientCaderneta.caderneta.peso/Math.pow((patientCaderneta.caderneta.comprimento/100), 2))

    graphArray.push(['1/4', imc]);

    if(patientAtendimento.atendimento.peso == undefined){
      return res.status(200).send(graphArray);
    }else{
      imc = (patientAtendimento.atendimento.peso/Math.pow((patientAtendimento.atendimento.comprimento/100), 2))
      graphArray.push(['1', imc]);
    }
    if(patientConsults.consultas.length == 0){
      return res.status(200).send(graphArray);
    }else{
      for(var i = 0; i < patientConsults.consultas.length; i++){
        imc = (patientConsults.consultas[i].peso/Math.pow((patientConsults.consultas[i].comprimento/100), 2))
        graphArray.push([`${(patientConsults.consultas[i].consulta - 1)}`, imc])
      }
    }

    return res.status(200).send(graphArray);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

module.exports = {

  create,
  read,
  readOne,
  update,
  remove,
  readCPF,
  readConsultsFromPatient,
  graphIdadePeso,
  graphIdadeComprimento,
  graphIdadePerimetro,
  graphIdadeIMC,

};
