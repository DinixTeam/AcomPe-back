const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');

routes.route('/consulta').post(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      weight: Joi.number().required(),
      height: Joi.number().required(),
      glicose: Joi.number().required(),
      consultaDate: Joi.date().required(),
      pacientSituation: Joi.string().required(),
      patientID: Joi.string().required(),
      pediatraID: Joi.string().required(),
    }),
  }),
  Controller.create,
);

routes.route('/consulta/frompatient').get(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      patientID: Joi.string().required(),
    }),
  }),
  Controller.readConsultsFromPatient,
);

module.exports = routes;
