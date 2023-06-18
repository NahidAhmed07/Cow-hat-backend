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
exports.orderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const preparePaginationOptions_1 = __importDefault(require("../../helper/preparePaginationOptions"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const order_service_1 = require("./order.service");
// create order controller
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    const order = yield order_service_1.orderService.createOrder(bodyData);
    (0, sendResponse_1.default)(res, {
        data: order,
        message: 'Order created successfully',
        statusCode: http_status_1.default.OK,
        success: true,
    });
}));
// end of create order controller
// get orders controller with pagination and filter
const getOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, preparePaginationOptions_1.default)((0, pick_1.default)(req.query, pagination_1.paginationFields));
    const filterOption = (0, pick_1.default)(req.query, ['buyer']);
    const orders = yield order_service_1.orderService.getOrders(paginationOptions, filterOption);
    (0, sendResponse_1.default)(res, {
        data: orders.data,
        message: 'Orders fetched successfully',
        statusCode: http_status_1.default.OK,
        success: true,
        meta: orders.meta,
    });
}));
// end of get orders controller with pagination and filter
// get single order controller
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.id;
    const order = yield order_service_1.orderService.getSingleOrder(orderId);
    (0, sendResponse_1.default)(res, {
        data: order,
        message: 'Order fetched successfully',
        statusCode: http_status_1.default.OK,
        success: true,
    });
}));
// end of get single order controller
exports.orderController = {
    createOrder,
    getOrders,
    getSingleOrder,
};
