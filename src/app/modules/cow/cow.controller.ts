import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CowService } from './cow.service';

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

export const CowController = {
  createCow,
};
