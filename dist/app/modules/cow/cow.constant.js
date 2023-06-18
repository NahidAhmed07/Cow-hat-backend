"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowFilterFields = exports.cowSearchableFields = exports._cowLabel = exports._cowCategory = exports._cowLocation = void 0;
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
exports._cowLocation = _cowLocation;
const _cowCategory = ['Dairy', 'Beef', 'Dual-purpose'];
exports._cowCategory = _cowCategory;
const _cowLabel = ['for sale', 'sold out'];
exports._cowLabel = _cowLabel;
const cowSearchableFields = ['category', 'breed', 'location'];
exports.cowSearchableFields = cowSearchableFields;
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
exports.cowFilterFields = cowFilterFields;
