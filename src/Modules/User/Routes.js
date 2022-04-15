const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const Controller = require('./Controller');
const UserAuth = require('./Controller/auth');
const EmailInUse = require('../../Middlewares/emailInUse');

routes.route('/login').post(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      emailOrUsername: Joi.string().required(),
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
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        phone: Joi.string().allow(null, '').max(500),
        profession: Joi.string().allow(null, '').max(500),
        find: Joi.string().allow(null, '').max(500),
        interest: Joi.string().allow(null, '').max(500),
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
        find: Joi.string().allow(null, '').max(500),
        interest: Joi.string().allow(null, '').max(500),
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

routes.route('/user/changepass').put(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      newpassword: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  UserAuth.verifyToken,
  Controller.changePassword,
);

routes.route('/user/resetpassword').post(
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      newpassword: Joi.string().required(),
      email: Joi.string().required().email(),
      token: Joi.string().required(),
    }),
  }),
  Controller.resetPassword,
);

routes.route('/users/:email').get(
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      email: Joi.string().required(),
    }),
  }),
  Controller.readEmail,
);

module.exports = routes;
