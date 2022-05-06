const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');

routes
  .route('/caderneta')
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        patientID: Joi.string().required(),
        pediatraID: Joi.string().required(),
        exitFeeding: Joi.string().required(),
        importantInformations: Joi.string().required(),
        bornHour: Joi.string().required(),
        bornDate: Joi.date().required(),
        sex: Joi.string().required(),
        bornWeight: Joi.number().required(),
        bblength: Joi.number().required(),
        cephalic: Joi.number().required(),
        gestationalAge: Joi.number().required(),
        bloodType: Joi.string().required(),
        exitWeight: Joi.number().required(),
        exitDate: Joi.date().required(),
        motherName: Joi.string().required(),
        ortolaniIsPositive: Joi.boolean().required(),
        ortolaniConduct: Joi.string().required(),
        redReflectionIsNormal: Joi.boolean().required(),
        redReflectionConduct: Joi.string().required(),
        tootsyYesOrNo: Joi.boolean().required(),
        tootsyMadeAt: Joi.date().required(),
        feniceltonuriaIsNormal: Joi.boolean().required(),
        hipotireodismoIsNormal: Joi.boolean().required(),
        anemiaFalciformeIsNormal: Joi.boolean().required(),
        hearingScreeningYesOrNo: Joi.boolean().required(),
        hearingScreeningMadeAt: Joi.date().required(),
        testPerformed: Joi.string().required(),
        resultText1: Joi.string().required(),
        resultText2: Joi.string().required(),
        resultIsNormal: Joi.boolean().required(),
      }),
    }),
    Controller.create,
  )

  routes.route('/caderneta/frompatient').get(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        patientID: Joi.string().required(),
      }),
    }),
    Controller.readCadernetaFromPatient,
  );

module.exports = routes;
