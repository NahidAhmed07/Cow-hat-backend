import { IPaginationQuery } from '../../interface/pagination';

const preparePaginationOptions = ({
  page = '1',
  limit = '10',
  sortBy = 'createdAt',
  sortOrder = 'desc',
}: IPaginationQuery) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const sort = { [sortBy]: sortOrder };
  const paginationOptions = { page, limit, skip, sort };
  return paginationOptions;
};

export default preparePaginationOptions;
