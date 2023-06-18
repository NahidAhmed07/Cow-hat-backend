import { ICow } from './cow.interface';
import CowModel from './cow.model';

const createCow = async (payload: ICow) => {
  const result = await CowModel.create(payload);

  return result;
};

export const CowService = {
  createCow,
};
