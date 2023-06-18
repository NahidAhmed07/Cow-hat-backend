import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';
import preparePaginationOptions from '../../helper/preparePaginationOptions';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { userFilterOptions } from './user.constant';

const createUser = catchAsync(async (req, res) => {
  const bodyData = req.body;

  const result = await UserService.createUser(bodyData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const paginationOptions = preparePaginationOptions(
    pick(req.query, paginationFields)
  );
  const filterOptions = pick(req.query, userFilterOptions);

  const result = await UserService.getAllUser(filterOptions, paginationOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const updatedData = req.body;
  const id = req.params.id;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User fetched successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User Deleted successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUser,
  updateUser,
  getSingleUser,
  deleteUser,
};
