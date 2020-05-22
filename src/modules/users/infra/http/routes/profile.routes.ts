import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticaded);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  profileController.update);

profileRouter.get(
  '/',
  profileController.show);

export default profileRouter;
