const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Pediatra = require('../Model');

async function authenticate(req, res) {
  try {
    
    const emailOrCPF = req.body.emailOrCPF;
    const plainTextPassword = req.body.password;
    var pediatra;

    pediatra = await Pediatra.findOne({ cpf: emailOrCPF }).select('+password');

    if(!pediatra){
      pediatra = await Pediatra.findOne({ email: emailOrCPF }).select('+password');
    }

    if (!pediatra) {
      return res.status(400).json({ message: 'Email ou cpf não cadastrado' });
    }

    async function match(plainTextPassword, hashedPassword) {
      if (!plainTextPassword || !hashedPassword) {
        return false;
      }

      return bcrypt.compare(plainTextPassword, hashedPassword);
    }

    const passwordMatch = await match(plainTextPassword, pediatra?.password);

    if (!pediatra || !passwordMatch) {
      return res.status(400).json({ message: 'Email ou senha incorretos' });
    }

    pediatra.password = undefined;
    const id = pediatra._id;
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: '1d' });

    return res.status(200).json({ token, _id: id, auth: true });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function verifyToken(req, res, next) {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: 'Auntenticação necessária' });
    }

    function wrongFormat(type, token) {
      if (!type || !token) {
        return true;
      }

      if (type !== 'Bearer') {
        return true;
      }

      return false;
    }

    const [type, token] = header.split(' ');

    if (wrongFormat(type, token)) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    if (!decoded) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.pediatraId = decoded.id;

    return next();
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

module.exports = {
  authenticate,
  verifyToken,
};
