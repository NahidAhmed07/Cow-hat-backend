import mongoose from 'mongoose';

export type IPaginationQuery = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: mongoose.SortOrder;
};

export type IPaginationOptions = {
  page: number;
  limit: number;
  skip: number;
  sort: {
    [key: string]: mongoose.SortOrder;
  };
};
