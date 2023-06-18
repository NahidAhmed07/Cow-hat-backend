import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

type ICowLocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Khulna'
  | 'Rangpur'
  | 'Mymensingh'
  | 'Comilla';
type ICowCategory = 'Dairy' | 'Beef' | 'DualPurpose';

type ICow = {
  name: string;
  age: number;
  price: number;
  location: ICowLocation;
  breed: string;
  weight: number;
  label: 'for sale' | 'sold out';
  category: ICowCategory;
  image?: string;
  seller: Types.ObjectId | IUser;
};

type ICowFilterOptions = {
  searchTerm?: string;
  location?: string;
  category?: string;
  label?: string;
  breed?: string;
  age?: number;
  maxPrice?: number;
  minPrice?: number;
  minWeight?: number;
  maxWeight?: number;
};

type ICowModel = Model<ICow, Record<string, unknown>>;

export { ICow, ICowModel, ICowLocation, ICowCategory, ICowFilterOptions };
