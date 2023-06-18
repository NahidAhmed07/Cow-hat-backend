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
exports.CowController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const cow_service_1 = require("./cow.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const preparePaginationOptions_1 = __importDefault(require("../../helper/preparePaginationOptions"));
const pagination_1 = require("../../../constants/pagination");
const cow_constant_1 = require("./cow.constant");
// create cow controller
const createCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    const result = yield cow_service_1.CowService.createCow(bodyData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Cow created successfully',
        data: result,
    });
}));
// end of create cow controller
// get all cow controller
const getAllCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, preparePaginationOptions_1.default)((0, pick_1.default)(req.query, pagination_1.paginationFields));
    const filterOptions = (0, pick_1.default)(req.query, cow_constant_1.cowFilterFields);
    const result = yield cow_service_1.CowService.getAllCow(filterOptions, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Cow fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
// end of get all cow controller
// update cow controller
const updateCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedData = req.body;
    const id = req.params.id;
    const result = yield cow_service_1.CowService.updateCow(id, updatedData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Cow updated successfully',
        data: result,
    });
}));
// end of update cow controller
// get single cow controller
const getSingleCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cow_service_1.CowService.getSingleCow(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Cow fetched successfully',
        data: result,
    });
}));
// end of get single cow controller
// delete cow controller
const deleteCow = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield cow_service_1.CowService.deleteCow(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Cow Deleted successfully',
        data: result,
    });
}));
// end `of delete cow controller
exports.CowController = {
    createCow,
    getAllCow,
    updateCow,
    getSingleCow,
    deleteCow,
};
