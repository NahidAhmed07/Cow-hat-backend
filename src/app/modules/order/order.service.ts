import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { IOrder } from './order.interface';
import CowModel from '../cow/cow.model';
import mongoose from 'mongoose';
import Order from './order.model';

const createOrder = async (payload: IOrder) => {
  const { cow, buyer } = payload;

  const buyerData = await User.findOne({ _id: buyer });

  if (!buyerData) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Buyer not found. Please provide a valid buyer id'
    );
  } else if (buyerData.role !== 'buyer') {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Buyer not found. Please provide a valid buyer id'
    );
  }

  const cowData = await CowModel.findOne({ _id: cow });

  if (!cowData) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Cow not found. Please select another cow'
    );
  } else if (cowData.label === 'sold out') {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Cow already sold. Please select another cow'
    );
  }

  if (buyerData.budget < cowData.price) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Insufficient budget. Please top up your account to proceed with this order'
    );
  }

  const sellerId = cowData.seller;

  let createdOrderId;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const cowUpdated = await CowModel.updateOne(
      { _id: cow },
      { label: 'sold out' },
      { session }
    );

    if (!cowUpdated.acknowledged) {
      throw new Error('Something went wrong. Please try again');
    }

    const buyerUpdated = await User.updateOne(
      { _id: buyer },
      { $inc: { budget: -cowData.price } },
      { session }
    );

    if (!buyerUpdated.acknowledged) {
      throw new Error('Something went wrong. Please try again');
    }

    const sellerUpdated = await User.updateOne(
      { _id: sellerId },
      { $inc: { income: cowData.price } },
      { session }
    );

    if (!sellerUpdated.acknowledged) {
      throw new Error('Something went wrong. Please try again');
    }

    const createResult = await Order.create([payload], { session });

    if (!createResult || createResult.length === 0) {
      throw new Error('Something went wrong. Please try again');
    }

    createdOrderId = createResult[0]._id;

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Something went wrong. Please try again'
    );
  } finally {
    session.endSession();
  }

  const createdOrder = await Order.findOne({ _id: createdOrderId })
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
        },
      ],
    })
    .populate('buyer');

  return createdOrder;
};

export const orderService = {
  createOrder,
};
