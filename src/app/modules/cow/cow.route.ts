import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CowValidator } from './cow.validation';
import { CowController } from './cow.controller';

const CowRouter = Router();

CowRouter.post(
  '/create-cow',
  validateRequest(CowValidator.createCowZosSchema),
  CowController.createCow
);

CowRouter.patch(
  '/:id',
  validateRequest(CowValidator.updateCowZodSchema),
  CowController.updateCow
);

CowRouter.get('/:id', CowController.getSingleCow);
CowRouter.delete('/:id', CowController.deleteCow);
CowRouter.get('/', CowController.getAllCow);

export default CowRouter;
