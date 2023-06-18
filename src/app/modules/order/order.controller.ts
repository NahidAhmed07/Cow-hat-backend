import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import preparePaginationOptions from '../../helper/preparePaginationOptions';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { orderService } from './order.service';

// create order controller
const createOrder = catchAsync(async (req, res) => {
  const bodyData = req.body;

  const order = await orderService.createOrder(bodyData);

  sendResponse(res, {
    data: order,
    message: 'Order created successfully',
    statusCode: httpStatus.OK,
    success: true,
  });
});
// end of create order controller

// get orders controller with pagination and filter
const getOrders = catchAsync(async (req, res) => {
  const paginationOptions = preparePaginationOptions(
    pick(req.query, paginationFields)
  );
  const filterOption = pick(req.query, ['buyer']);

  const orders = await orderService.getOrders(paginationOptions, filterOption);

  sendResponse(res, {
    data: orders.data,
    message: 'Orders fetched successfully',
    statusCode: httpStatus.OK,
    success: true,
    meta: orders.meta,
  });
});
// end of get orders controller with pagination and filter

// get single order controller
const getSingleOrder = catchAsync(async (req, res) => {
  const orderId = req.params.id;

  const order = await orderService.getSingleOrder(orderId);

  sendResponse(res, {
    data: order,
    message: 'Order fetched successfully',
    statusCode: httpStatus.OK,
    success: true,
  });
});
// end of get single order controller

export const orderController = {
  createOrder,
  getOrders,
  getSingleOrder,
};
