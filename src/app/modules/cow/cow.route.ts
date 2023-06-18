import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CowValidator } from './cow.validation';
import { CowController } from './cow.controller';

const CowRouter = Router();

// create cow controller with validation middleware and controller
CowRouter.post(
  '/create-cow',
  validateRequest(CowValidator.createCowZosSchema),
  CowController.createCow
);

// get all cow controller with validation middleware and controller
CowRouter.patch(
  '/:id',
  validateRequest(CowValidator.updateCowZodSchema),
  CowController.updateCow
);

// get single cow controller
CowRouter.get('/:id', CowController.getSingleCow);
// delete cow controller
CowRouter.delete('/:id', CowController.deleteCow);
// get all cow controller
CowRouter.get('/', CowController.getAllCow);

export default CowRouter;
