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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const preparePaginationOptions_1 = __importDefault(require("../../helper/preparePaginationOptions"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const user_constant_1 = require("./user.constant");
// create user controller
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    const result = yield user_service_1.UserService.createUser(bodyData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User created successfully',
        data: result,
    });
}));
// end of create user controller
// get all user controller
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, preparePaginationOptions_1.default)((0, pick_1.default)(req.query, pagination_1.paginationFields));
    // filter options for user  role and location
    const filterOptions = (0, pick_1.default)(req.query, user_constant_1.userFilterOptions);
    const result = yield user_service_1.UserService.getAllUser(filterOptions, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
// end of get all user controller
// update user controller
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedData = req.body;
    const id = req.params.id;
    const result = yield user_service_1.UserService.updateUser(id, updatedData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User updated successfully',
        data: result,
    });
}));
// end of update user controller
// get single user controller
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User fetched successfully',
        data: result,
    });
}));
// end of get single user controller
// delete user controller
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.deleteUser(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User Deleted successfully',
        data: result,
    });
}));
// end of delete user controller
exports.UserController = {
    createUser,
    getAllUser,
    updateUser,
    getSingleUser,
    deleteUser,
};
