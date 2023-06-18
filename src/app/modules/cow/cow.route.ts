import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CowValidator } from './cow.validation';
import { CowController } from './cow.controller';

const CowRouter = Router();

CowRouter.post(
  '/create-cow',
  validateRequest(CowValidator.createCowValidation),
  CowController.createCow
);

// CowRouter.patch(
//   '/:id',
//   validateRequest(UserValidator.updateUserZodSchema),
//   UserController.updateUser
// );
CowRouter.get('/', CowController.getAllCow);

export default CowRouter;
