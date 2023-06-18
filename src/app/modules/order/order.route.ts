import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import orderZodSchema from './order.validation';
import { orderController } from './order.controller';

const OrderRouter = Router();

OrderRouter.post(
  '/',
  validateRequest(orderZodSchema),
  orderController.createOrder
);

export default OrderRouter;