require('dotenv').config();

const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const path = require('path');


const Caderneta = require('../Model/index');

async function create(req, res) {
  try {

    const { patient } = req.body;

    const { consulta, exitFeeding, importantInformations } = req.body;

    const { bornHour, bornDate, sex, bornWeight, bblength, cephalic, gestationalAge, bloodType, exitWeight, exitDate, motherName  } = req.body;

    const { ortolaniIsPositive, ortolaniConduct, redReflectionIsNormal, redReflectionConduct, tootsyYesOrNo, tootsyMadeAt } = req.body;

    const { feniceltonuriaIsNormal, hipotireodismoIsNormal, anemiaFalciformeIsNormal } = req.body;

    const { hearingScreeningYesOrNo, hearingScreeningMadeAt, testPerformed, resultText1, resultText2, resultIsNormal } = req.body;

    const caderneta = await Caderneta.create({
      consulta: consulta,
      exitFeeding: exitFeeding,
      importantInformations : importantInformations,
    });

    caderneta.bornData.push({bornHour, bornDate, sex, bornWeight, bblength, cephalic, gestationalAge, bloodType, exitWeight, exitDate, motherName})

    caderneta.neonatal.push({ortolaniIsPositive, ortolaniConduct, redReflectionIsNormal, redReflectionConduct, tootsyYesOrNo, tootsyMadeAt})

    caderneta.results.push({feniceltonuriaIsNormal, hipotireodismoIsNormal, anemiaFalciformeIsNormal})

    caderneta.others.push({hearingScreeningYesOrNo, hearingScreeningMadeAt, testPerformed, resultText1, resultText2, resultIsNormal})

    await User.findByIdAndUpdate(
      { _id: patient },
      { $set: { caderneta: caderneta._id } },
    );

    return res.status(201).send({ message: 'Caderneta criada' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function read(req, res) {
  try {

    const caderneta = await Caderneta.find()

    return res.status(200).send({caderneta});
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

module.exports = {
  create,
  read,
};
