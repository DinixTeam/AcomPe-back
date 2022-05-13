const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');

routes.route('/caderneta').post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        perimetroCefalico: Joi.number().required(),
        peso: Joi.number().required(),
        comprimento: Joi.number().required(),
        leiteLME: Joi.boolean().required(),
        leiteLMLA: Joi.boolean().required(),
        dificuldadeAmamentar: Joi.boolean().required(),
        parouAmamentar: Joi.boolean().required(),
        cotoUmbilical: Joi.boolean().required(),
        inctericia: Joi.boolean().required(),
        diarreiaVomito: Joi.boolean().required(),
        dificuldadeRespirar: Joi.boolean().required(),
        febre: Joi.boolean().required(),
        hipotermia: Joi.boolean().required(),
        convulsoesOuMovAnor: Joi.boolean().required(),
        auscultaCardiaca: Joi.boolean().required(),
        hepatiteB: Joi.boolean().required(),
        bcg: Joi.boolean().required(),
        patientID: Joi.string().required(),
        pediatraID: Joi.string().required(),
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
