const Pediatra = require('../Model');

async function create(req, res, next) {

  try{

  const { username, email, password } = req.body;

  if (req.emailInUse) {
    return res
      .status(400)
      .json({ message: `O email ${req.body.email} já está em uso!` });
  }

  const pediatra = await Pediatra.create({
    username,
    password,
    email,
    avatar : '',
  });

  pediatra.password = null;

  return res.status(200).send('Pediatra Criado!');
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}

async function read(req, res) {
  try {
    const pediatra = await Pediatra.find()
      .sort('-createdAt')
      .select({ password: 0, _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });

    return res.status(200).send(pediatra);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}

async function readOne(req, res) {
  try {
    const { _id } = req.params;

    const pediatra = await Pediatra.findById({ _id }).select({
      password: 0,
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!pediatra) {
      return res.status(404).send({ message: 'Pediatra não foi encontrado!' });
    }

    return res.status(200).send(pediatra);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function readPatients(req, res) {
  try {
    const { _id } = req.params;

    const pediatraPatients = await Pediatra.findById(_id).populate('patients')

    if (!pediatraPatients) {
      return res.status(404).send({ message: 'Pediatra não foi encontrado!' });
    }

    const patients = pediatraPatients.patients

    return res.status(200).send(patients);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function update(req, res) {
  try {
    const _id = req.pediatraId;
    const { body } = req;

    const pediatra = await Pediatra.findByIdAndUpdate({ _id }, body, { new: true });

    if (!pediatra) {
      return res
        .status(404)
        .json({ message: 'Pediatra não foi encontrado!' });
    }

    await pediatra.save();

    return res.status(200).json({ message: 'Pediatra atualizado' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function remove(req, res) {
  try {
    const _id = req.pediatraId;

    const pediatra = await Pediatra.findByIdAndDelete({ _id });

    if (!pediatra) {
      return res
        .status(404)
        .json({ message: 'Pediatra não foi encontrado!' });
    }

    return res.status(200).send({ message: 'Pediatra deletado' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function uploadAvatar(req, res) {

  try{
  
  const _id = req.params;
  const file = req.files.photo;
  file.mv('./uploads/' + file.name, function(err, result) {
  if(err) 
  throw err;
  res.send({
  success: true,
  message: "File uploaded!"
  });
})

  const pediatra = await Pediatra.findById(_id)

  pediatra.avatar = file.name;

  await pediatra.save();

  }catch({ message }){
    return res.status(500).json({ message });
  }
 }

module.exports = {

  create,
  read,
  readOne,
  update,
  remove,
  uploadAvatar,
  readPatients,

};
