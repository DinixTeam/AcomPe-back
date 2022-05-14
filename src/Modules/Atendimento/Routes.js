const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');

routes.route('/consultafirst').post(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      perimetroCefalico: Joi.number().required(),
      peso: Joi.number().required(),
      comprimento: Joi.number().required(),
      pezinho: Joi.boolean().required(),
      orelhinha: Joi.boolean().required(),
      olhinho: Joi.boolean().required(),
      coracaozinho: Joi.boolean().required(),
      cotoUmbilical: Joi.boolean().required(),
      inctericia: Joi.boolean().required(),
      diarreiaVomito: Joi.boolean().required(),
      dificuldadeRespirar: Joi.boolean().required(),
      febre: Joi.boolean().required(),
      hipotermia: Joi.boolean().required(),
      convulsoesOuMovAnor: Joi.boolean().required(),
      auscultaCardiaca: Joi.boolean().required(),
      aberturaOcular: Joi.boolean().required(),
      pupilasNormais: Joi.boolean().required(),
      estrabismo: Joi.boolean().required(),
      patientID: Joi.string().required(),
      pediatraID: Joi.string().required(),
    }),
  }),
  Controller.createFirstMonth,
);

module.exports = routes;