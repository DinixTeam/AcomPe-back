const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const UserAuth = require('../User/Controller/auth');

routes
  .route('/consulta')
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        consulta: Joi.number().required(),
        weight: Joi.number().required(),
        height: Joi.number().required().email(),
        glicose: Joi.number().required(),
        consultaDate: Joi.date().required(),
        pacientSituation: Joi.string().required(),
      }),
    }),
    UserAuth.verifyToken,
    Controller.create,
  )

routes.route('/consulta/read').get(Controller.read);

module.exports = routes;
