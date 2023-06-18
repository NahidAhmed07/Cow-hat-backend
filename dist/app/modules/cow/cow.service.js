"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const cow_constant_1 = require("./cow.constant");
const cow_model_1 = __importDefault(require("./cow.model"));
const createCow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.create(payload);
    return result;
});
// get all cow service with pagination and filter options and populate seller
const getAllCow = (filterOptions, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sort } = paginationOptions;
    const { searchTerm, maxPrice, minPrice, maxWeight, minWeight } = filterOptions, filterFields = __rest(filterOptions, ["searchTerm", "maxPrice", "minPrice", "maxWeight", "minWeight"]);
    const andCondition = [];
    // search by name, location, category, label, breed
    if (searchTerm) {
        andCondition.push({
            $or: cow_constant_1.cowSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // filter by location, category, label, breed
    if (Object.keys(filterFields).length) {
        andCondition.push(...Object.entries(filterFields).map(([field, value]) => ({
            [field]: value,
        })));
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
    const result = yield cow_model_1.default.find(whereCondition)
        .populate('seller')
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .lean();
    const total = yield cow_model_1.default.countDocuments(whereCondition);
    return {
        data: result,
        meta: {
            page,
            limit,
            total,
        },
    };
});
// end of get all cow service
// update cow service
const updateCow = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('seller');
    return result;
});
// end of update cow service
// get single cow service
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findById(id).populate('seller');
    return result;
});
// end of get single cow service
// delete cow service
const deleteCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findOneAndDelete({ _id: id }).populate('seller');
    return result;
});
// end of delete cow service
exports.CowService = {
    createCow,
    getAllCow,
    getSingleCow,
    deleteCow,
    updateCow,
};
