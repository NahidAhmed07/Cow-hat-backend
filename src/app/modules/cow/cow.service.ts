import { IPaginationOptions } from '../../../interface/pagination';
import { cowSearchableFields } from './cow.constant';
import { ICow, ICowFilterOptions } from './cow.interface';
import CowModel from './cow.model';

const createCow = async (payload: ICow) => {
  const result = await CowModel.create(payload);

  return result;
};

// get all cow service with pagination and filter options and populate seller
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

  // search by name, location, category, label, breed
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

  // filter by location, category, label, breed
  if (Object.keys(filterFields).length) {
    andCondition.push(
      ...Object.entries(filterFields).map(([field, value]) => ({
        [field]: value,
      }))
    );
  }

  // filter by price, weight
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
// end of get all cow service

// update cow service
const updateCow = async (id: string, payload: Partial<ICow>) => {
  const result = await CowModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('seller');

  return result;
};
// end of update cow service

// get single cow service
const getSingleCow = async (id: string) => {
  const result = await CowModel.findById(id).populate('seller');
  return result;
};
// end of get single cow service

// delete cow service
const deleteCow = async (id: string) => {
  const result = await CowModel.findOneAndDelete({ _id: id }).populate(
    'seller'
  );
  return result;
};
// end of delete cow service

export const CowService = {
  createCow,
  getAllCow,
  getSingleCow,
  deleteCow,
  updateCow,
};
