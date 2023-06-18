import { Model, Types } from 'mongoose';

type ICowLocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Rajshahi'
  | 'Khulna'
  | 'Barishal'
  | 'Sylhet'
  | 'Rangpur'
  | 'Mymensingh';
type ICowCategory = 'Dairy' | 'Beef' | 'Dual-purpose';

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
  seller: Types.ObjectId;
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
