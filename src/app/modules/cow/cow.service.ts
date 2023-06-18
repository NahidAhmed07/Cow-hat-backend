import { IPaginationOptions } from '../../../interface/pagination';
import { cowSearchableFields } from './cow.constant';
import { ICow, ICowFilterOptions } from './cow.interface';
import CowModel from './cow.model';

const createCow = async (payload: ICow) => {
  const result = await CowModel.create(payload);

  return result;
};

const getAllCow = async (
  filterOptions: ICowFilterOptions,
  paginationOptions: IPaginationOptions
) => {
  const { page, limit, skip, sort } = paginationOptions;
  const {
    searchTerm,
    maxPrice,
    minPrice,
    maxWeight,
    minWeight,
    ...filterFields
  } = filterOptions;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterFields).length) {
    andCondition.push(
      ...Object.entries(filterFields).map(([field, value]) => ({
        [field]: value,
      }))
    );
  }

  if (maxPrice) {
    andCondition.push({
      price: {
        $lte: maxPrice,
      },
    });
  }

  if (minPrice) {
    andCondition.push({
      price: {
        $gte: minPrice,
      },
    });
  }

  if (maxWeight) {
    andCondition.push({
      weight: {
        $lte: maxWeight,
      },
    });
  }

  if (minWeight) {
    andCondition.push({
      weight: {
        $gte: minWeight,
      },
    });
  }

  const whereCondition = andCondition.length ? { $and: andCondition } : {};

  const result = await CowModel.find(whereCondition)
    .populate('seller')
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .lean();
  const total = await CowModel.countDocuments(whereCondition);

  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  };
};

export const CowService = {
  createCow,
  getAllCow,
};
