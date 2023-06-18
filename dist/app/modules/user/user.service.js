"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.UserService = void 0;
const user_constant_1 = require("./user.constant");
const user_model_1 = __importDefault(require("./user.model"));
// create user service start
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(payload);
    return result;
});
const getAllUser = (filterOptions, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sort } = paginationOptions;
    const { searchTerm } = filterOptions, filterFields = __rest(filterOptions, ["searchTerm"]);
    const andCondition = [];
    // push search term in and condition if search term is provided
    if (searchTerm) {
        andCondition.push({
            $or: user_constant_1.userSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // push filter fields in and condition if filter fields are provided //
    if (Object.keys(filterFields).length) {
        andCondition.push(...Object.entries(filterFields).map(([field, value]) => ({
            [field]: value,
        })));
    }
    // if and condition is not empty then create where condition otherwise empty object //
    const whereCondition = andCondition.length ? { $and: andCondition } : {};
    const result = yield user_model_1.default.find(whereCondition)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .lean();
    const total = yield user_model_1.default.countDocuments(whereCondition);
    return {
        data: result,
        meta: {
            page,
            limit,
            total,
        },
    };
});
// create user service end
// update user service start
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = payload, userData = __rest(payload, ["name"]);
    /**
     * if name is provided then update name fields separately
     * because name is an object in user model
     * and we don't want to override the whole name object
     */
    if (name && Object.keys(name).length) {
        Object.entries(name).forEach(([field, value]) => {
            userData[`name.${field}`] = value;
        });
    }
    // update user data
    const result = yield user_model_1.default.findOneAndUpdate({ _id: id }, userData, {
        new: true,
    });
    return result;
});
// update user service end
// get single user service start
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById(id);
    return result;
});
// get single user service end
// delete user service start
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOneAndDelete({ _id: id });
    return result;
});
// delete user service end
exports.UserService = {
    createUser,
    getAllUser,
    updateUser,
    getSingleUser,
    deleteUser,
};
