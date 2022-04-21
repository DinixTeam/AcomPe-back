const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const PediatraAuth = require('./Controller/auth');
const EmailInUse = require('../../Middlewares/emailInUse');

routes.route('/login').post(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      emailOrCPF: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  PediatraAuth.authenticate,
);

routes.route('/pediatra').post(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  EmailInUse.emailInUse,
  Controller.create,
).put(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      cpf: Joi.string().allow(null, '').max(500),
      rg: Joi.string().allow(null, '').max(500),
      sex: Joi.string().allow(null, '').max(500),
      phone: Joi.string().allow(null, '').max(500),
    }),
  }),
  PediatraAuth.verifyToken,
  Controller.update,
).delete(PediatraAuth.verifyToken, Controller.remove);

routes.route('/pediatra/:_id').get(
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      _id: Joi.string().required(),
    }),
  }),
  Controller.readOne,
);

routes.route('/pediatra/read').get(Controller.read);

routes.route('/pediatra/:email').get(
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      email: Joi.string().required(),
    }),
  }),
  Controller.readEmail,
);

module.exports = routes;
