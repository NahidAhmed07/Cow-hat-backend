import { Model } from 'mongoose';

type IUser = {
  phoneNumber: string;
  role: 'seller' | 'buyer';
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
};

type IUserFilterOptions = {
  searchTerm?: string;
  role?: 'seller' | 'buyer';
  minBudget?: number;
  maxBudget?: number;
  minIncome?: number;
  maxIncome?: number;
};

type IUserModel = Model<IUser, Record<string, unknown>>;

export { IUser, IUserModel, IUserFilterOptions };
