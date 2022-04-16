const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const UserAuth = require('./Controller/auth');
const EmailInUse = require('../../Middlewares/emailInUse');

routes.route('/login').post(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      emailOrCPF: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  UserAuth.authenticate,
);

routes
  .route('/user')
  .post(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        parentName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        cpf: Joi.string().required(),
        rg: Joi.string().required(),
        sex: Joi.string().required(),
        bornDate: Joi.date().required(),
      }),
    }),
   
    EmailInUse.emailInUse,
    Controller.create,
  )
  .put(
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().allow(null, '').max(500),
        phone: Joi.string().allow(null, '').max(500),
        parentName: Joi.string().allow(null, '').max(500),
      }),
    }),
    UserAuth.verifyToken,
    Controller.update,
  )
  .delete(UserAuth.verifyToken, Controller.remove);

routes.route('/user/:_id').get(
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      _id: Joi.string().required(),
    }),
  }),
  Controller.readOne,
);

routes.route('/users/read').get(Controller.read);

routes.route('/users/:email').get(
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      email: Joi.string().required(),
    }),
  }),
  Controller.readEmail,
);

module.exports = routes;
