import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { IOrder } from './order.interface';
import CowModel from '../cow/cow.model';
import mongoose from 'mongoose';
import Order from './order.model';
import { IPaginationOptions } from '../../../interface/pagination';

const createOrder = async (payload: IOrder) => {
  const { cow, buyer } = payload;

  // buyer check start here //
  const buyerData = await User.findOne({ _id: buyer });
  // if buyer not found or buyer is not a buyer role then throw error
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
  // end buyer check here // buyer check done

  // cow check start here //
  const cowData = await CowModel.findOne({ _id: cow });
  // if cow not found or cow is sold out then throw error
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
  // end cow check here // cow check done

  // if buyer budget is less than cow price then throw error
  if (buyerData.budget < cowData.price) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Insufficient budget. Please top up your account to proceed with this order'
    );
  }
  // end buyer budget check here // buyer budget check done

  const sellerId = cowData.seller;
  let createdOrderId;

  // start transaction here //
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // update cow label to sold out //
    const cowUpdated = await CowModel.updateOne(
      { _id: cow },
      { label: 'sold out' },
      { session }
    );

    // if cow not updated then throw error because we can't proceed without updating cow label to sold out //
    if (!cowUpdated.acknowledged) {
      throw new Error('Something went wrong. Please try again');
    }

    // update buyer budget to buyer budget - cow price //
    const buyerUpdated = await User.updateOne(
      { _id: buyer },
      { $inc: { budget: -cowData.price } },
      { session }
    );

    // if buyer not updated then throw error because we can't proceed without updating buyer budget to buyer budget - cow price //
    if (!buyerUpdated.acknowledged) {
      throw new Error('Something went wrong. Please try again');
    }

    // update seller income to seller income + cow price //
    const sellerUpdated = await User.updateOne(
      { _id: sellerId },
      { $inc: { income: cowData.price } },
      { session }
    );

    // if seller not updated then throw error because we can't proceed without updating seller income to seller income + cow price //
    if (!sellerUpdated.acknowledged) {
      throw new Error('Something went wrong. Please try again');
    }

    // create order // make sure to use session here and pass data in a array otherwise mongoose will throw error //
    const createResult = await Order.create([payload], { session });

    // if order not created then throw error because we can't proceed without creating order //
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

  // finally order created successfully // now we need to populate data and return // make sure populate cow with nested seller // and populate buyer //
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

const getOrders = async (
  paginationOptions: IPaginationOptions,
  filterOptions: { buyer?: string }
) => {
  const { buyer } = filterOptions;
  const { page, limit, skip, sort } = paginationOptions;

  const query = buyer ? { buyer } : {};

  const orders = await Order.find(query)
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
        },
      ],
    })
    .populate('buyer')
    .skip(skip)
    .limit(limit)
    .sort(sort);

  const total = await Order.countDocuments(query);

  return {
    data: orders,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const getSingleOrder = async (id: string) => {
  const result = Order.findOne({ _id: id })
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
        },
      ],
    })
    .populate('buyer');

  return result;
};

export const orderService = {
  createOrder,
  getOrders,
  getSingleOrder,
};
