/* eslint-disable @typescript-eslint/no-explicit-any */

import { IPaginationOptions } from '../../../interface/pagination';
import { userSearchableFields } from './user.constant';
import { IUser, IUserFilterOptions } from './user.interface';
import User from './user.model';

// create user service start
const createUser = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUser = async (
  filterOptions: IUserFilterOptions,
  paginationOptions: IPaginationOptions
) => {
  const { page, limit, skip, sort } = paginationOptions;
  const { searchTerm, ...filterFields } = filterOptions;

  const andCondition = [];
  // push search term in and condition if search term is provided
  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // push filter fields in and condition if filter fields are provided //
  if (Object.keys(filterFields).length) {
    andCondition.push(
      ...Object.entries(filterFields).map(([field, value]) => ({
        [field]: value,
      }))
    );
  }

  // if and condition is not empty then create where condition otherwise empty object //
  const whereCondition = andCondition.length ? { $and: andCondition } : {};

  const result = await User.find(whereCondition)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .lean();
  const total = await User.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  };
};
// create user service end

// update user service start
const updateUser = async (id: string, payload: Partial<IUser>) => {
  const { name, ...userData } = payload;

  /**
   * if name is provided then update name fields separately
   * because name is an object in user model
   * and we don't want to override the whole name object
   */
  if (name && Object.keys(name).length) {
    Object.entries(name).forEach(([field, value]) => {
      (userData as any)[`name.${field}`] = value;
    });
  }

  // update user data
  const result = await User.findOneAndUpdate({ _id: id }, userData, {
    new: true,
  });

  return result;
};
// update user service end

// get single user service start
const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
// get single user service end

// delete user service start
const deleteUser = async (id: string) => {
  const result = await User.findOneAndDelete({ _id: id });
  return result;
};
// delete user service end

export const UserService = {
  createUser,
  getAllUser,
  updateUser,
  getSingleUser,
  deleteUser,
};
