import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CowService } from './cow.service';
import pick from '../../../shared/pick';
import preparePaginationOptions from '../../helper/preparePaginationOptions';
import { paginationFields } from '../../../constants/pagination';
import { cowFilterFields } from './cow.constant';

// create cow controller
const createCow = catchAsync(async (req, res) => {
  const bodyData = req.body;
  const result = await CowService.createCow(bodyData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow created successfully',
    data: result,
  });
});
// end of create cow controller

// get all cow controller
const getAllCow = catchAsync(async (req, res) => {
  const paginationOptions = preparePaginationOptions(
    pick(req.query, paginationFields)
  );
  const filterOptions = pick(req.query, cowFilterFields);

  const result = await CowService.getAllCow(filterOptions, paginationOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
// end of get all cow controller

// update cow controller
const updateCow = catchAsync(async (req, res) => {
  const updatedData = req.body;
  const id = req.params.id;

  const result = await CowService.updateCow(id, updatedData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow updated successfully',
    data: result,
  });
});
// end of update cow controller

// get single cow controller
const getSingleCow = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CowService.getSingleCow(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow fetched successfully',
    data: result,
  });
});
// end of get single cow controller

// delete cow controller
const deleteCow = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CowService.deleteCow(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Cow Deleted successfully',
    data: result,
  });
});
// end `of delete cow controller

export const CowController = {
  createCow,
  getAllCow,
  updateCow,
  getSingleCow,
  deleteCow,
};
