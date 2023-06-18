import { Schema, model } from 'mongoose';
import { ICow, ICowModel } from './cow.enterface';
import { _cowCategory, _cowLabel, _cowLocation } from './cow.constant';

const CowSchema = new Schema<ICow, ICowModel>({
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
});

const CowModel = model<ICow, ICowModel>('Cow', CowSchema);

export default CowModel;
