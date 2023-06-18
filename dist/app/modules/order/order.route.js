"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const order_validation_1 = __importDefault(require("./order.validation"));
const order_controller_1 = require("./order.controller");
const OrderRouter = (0, express_1.Router)();
// create order controller with validation middleware and controller
OrderRouter.post('/', (0, validateRequest_1.default)(order_validation_1.default), order_controller_1.orderController.createOrder);
// get single order controller
OrderRouter.get('/:id', order_controller_1.orderController.getSingleOrder);
// get all order controller
OrderRouter.get('/', order_controller_1.orderController.getOrders);
exports.default = OrderRouter;
