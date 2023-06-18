import { Router } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidator } from './user.validation';

const UserRouter = Router();

// create user controller with validation middleware and controller
UserRouter.post(
  '/create-user',
  validateRequest(UserValidator.createUserZodSchema),
  UserController.createUser
);

// get all user controller with validation middleware and controller
UserRouter.patch(
  '/:id',
  validateRequest(UserValidator.updateUserZodSchema),
  UserController.updateUser
);

// get single user controller
UserRouter.get('/:id', UserController.getSingleUser);

// delete user controller
UserRouter.delete('/:id', UserController.deleteUser);

// get all user controller with filter and pagination
UserRouter.get('/', UserController.getAllUser);

export default UserRouter;
