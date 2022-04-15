const generatePassword = require('generate-password');
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const bcrypt = require('bcryptjs');
const User = require('../Model');
const Caderneta = require('../../Caderneta/Model/index');
const Token = require('../Model/token');
const crypto = require('crypto-js');

async function create(req, res, next) {

  const { name, parentName, cpf, rg, sex, bornDate, email, password, phone } = req.body;

  const validCPF = await User.find({ cpf: cpf })

  if(validCPF.length == 0){

  }else{
    return res
      .status(400)
      .json({ message: `Esse cpf já está em uso!` });
  }

  if (req.emailInUse) {
    return res
      .status(400)
      .json({ message: `O email ${req.body.email} já está em uso!` });
  }

  const user = await User.create({
    name,
    parentName,
    cpf,
    rg,
    sex,
    bornDate,
    email,
    password,
    phone,
  });

  user.password = null;

  return next();
}

async function read(req, res) {
  try {
    const users = await User.find()
      .sort('-createdAt')
      .select({ password: 0, _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });

    return res.status(200).send(users);
  } catch ({ message }) {
    res.status(500).json({ message });
  }
}

async function readOne(req, res) {
  try {
    const { _id } = req.params;

    const user = await User.findById({ _id }).select({
      password: 0,
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!user) {
      return res.status(404).send({ message: 'usuário não foi encontrado!' });
    }

    return res.status(200).send(user);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function readEmail(req, res) {
  try {
    const { email } = req.params;

    const user = await User.find({ email: email }).select({
      password: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!user) {
      return res.status(404).send({ message: 'usuário não foi encontrado!' });
    }
    return res.status(200).send(user);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function update(req, res) {
  try {
    const _id = req.userId;
    const { body } = req;

    const user = await User.findByIdAndUpdate({ _id }, body, { new: true });

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Esse usuário não foi encontrado!' });
    }

    await user.save();

    return res.status(200).json({ message: 'Usuário atualizado' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function remove(req, res) {
  try {
    const _id = req.userId;

    const user = await User.findByIdAndDelete({ _id });

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Esse usuário não foi encontrado!' });
    }

    return res.status(200).send({ message: 'Usuário deletado' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function changePassword(req, res) {
  try {
    const _id = req.userId;
    const plainTextPassword = req.body.password;
    const newPassword = req.body.newpassword;
    const user = await User.findById(_id).select('+password');

    async function match(plainTextPassword, hashedPassword) {
      if (!plainTextPassword || !hashedPassword) {
        return false;
      }

      return bcrypt.compare(plainTextPassword, hashedPassword);
    }

    const passwordMatch = await match(plainTextPassword, user?.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    user.password = newPassword;
    user.save();

    return res.status(200).json("Senha modificada");
  } catch({ message }) {
    return res.status(500).json({ message });
  }
}

async function resetPassword(req, res) {
  try{
    const {email, token, newpassword } = req.body;

    const emailUser = await User.findOne({ email });

    if(!emailUser){
      return res
      .status(404)
      .json({ message: 'Esse email não foi encontrado!' });
    } else{
      const user = await User.findOne({ email })
      .select("+passwordResetToken passwordResetExpires");

      console.log(user.passwordResetToken)
      console.log(token)
  
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Esse email não foi encontrado!' });
      }
  
      if(token !== user.passwordResetToken){
        return res
          .status(402)
          .json({ message: 'Esse código não foi encontrado!' });
      }
  
      const now = new Date();
  
      if(now > user.passwordResetExpires){
        return res
          .status(401)
          .json({ message: 'Token expirado' });
      }
  
      user.password = newpassword;
       user.save();
       return res.status(200).json("Senha modificada");
    }

   
  } catch({ message }) {
    return res.status(500).json({ message });
  }
}

module.exports = {

  create,
  read,
  readOne,
  update,
  remove,
  readEmail,
  changePassword,
  resetPassword,

};
