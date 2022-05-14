const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');

routes.route('/patient').post(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      parentName: Joi.string().required(),
      phone: Joi.string().required(),
      cpf: Joi.string().required(),
      rg: Joi.string().required(),
      sex: Joi.string().required(),
      bornDate: Joi.date().required(),
      pediatraID: Joi.string().required(),
    }),
  }),
  Controller.create,
).put(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      phone: Joi.string().allow(null, '').max(500),
      parentName: Joi.string().allow(null, '').max(500),
    }),
  }),
  Controller.update,
).delete(Controller.remove);

routes.route('/patient/:_id').get(
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      _id: Joi.string().required(),
    }),
  }),
  Controller.readOne,
);

routes.route('/patient/read').get(Controller.read);

routes.route('/patient/:cpf').get(
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      cpf: Joi.string().required(),
    }),
  }),
  Controller.readCPF,
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
