import { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import orderZodSchema from './order.validation';
import { orderController } from './order.controller';

const OrderRouter = Router();

// create order controller with validation middleware and controller
OrderRouter.post(
  '/',
  validateRequest(orderZodSchema),
  orderController.createOrder
);

// get single order controller
OrderRouter.get('/:id', orderController.getSingleOrder);

// get all order controller
OrderRouter.get('/', orderController.getOrders);

export default OrderRouter;
