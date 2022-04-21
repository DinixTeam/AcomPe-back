const Pediatra = require('../Modules/Pediatra/Model/index');

async function emailInUse(req, res, next) {
  try {
    const pediatra = await Pediatra.findOne({ email: req.body.email });

    req.emailInUse = pediatra !== null;

    return next();
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

module.exports = {
  emailInUse,
};
