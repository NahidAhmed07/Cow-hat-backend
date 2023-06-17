import { Model } from 'mongoose';

type IUser = {
  id: number;
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

type IUserModel = Model<IUser, Record<string, unknown>>;

export { IUser, IUserModel };
