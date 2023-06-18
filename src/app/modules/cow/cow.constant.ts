const _cowLocation = [
  'Dhaka',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Chittagong',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
  'Cumilla',
];

const _cowCategory = ['Dairy', 'Beef', 'Dual-purpose'];

const _cowLabel = ['for sale', 'sold out'];

const cowSearchableFields = ['category', 'breed', 'location'];

const cowFilterFields = [
  'searchTerm',
  'location',
  'category',
  'label',
  'breed',
  'age',
  'maxPrice',
  'minPrice',
  'minWeight',
  'maxWeight',
];

export {
  _cowLocation,
  _cowCategory,
  _cowLabel,
  cowSearchableFields,
  cowFilterFields,
};
