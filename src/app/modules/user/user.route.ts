import { Router } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidator } from './user.validation';

const UserRouter = Router();

UserRouter.post(
  '/create-user',
  validateRequest(UserValidator.createUserZodSchema),
  UserController.createUser
);

UserRouter.patch('/:id', UserController.updateUser);
UserRouter.get('/', UserController.getAllUser);

export default UserRouter;
