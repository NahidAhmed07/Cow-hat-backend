import { Schema, model } from 'mongoose';
import { ICow, ICowModel } from './cow.interface';
import { _cowCategory, _cowLabel, _cowLocation } from './cow.constant';
import User from '../user/user.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const CowSchema = new Schema<ICow, ICowModel>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
      enum: _cowLocation,
    },
    breed: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
      enum: _cowLabel,
    },
    category: {
      type: String,
      required: true,
      enum: _cowCategory,
    },
    image: {
      type: String,
      required: false,
      default:
        'https://artprojectsforkids.org/wp-content/uploads/2021/01/Cow.jpeg',
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

CowSchema.pre('save', async function (next) {
  const seller = await User.findOne({ _id: this.seller });

  if (!seller) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Seller not found. Please Enter a valid seller id'
    );
  } else if (seller.role !== 'seller') {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Seller not found. Your Entered Id not a seller Id . Please Enter a valid seller id'
    );
  }

  next();
});

const CowModel = model<ICow, ICowModel>('Cow', CowSchema);

export default CowModel;
