"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const user_route_1 = __importDefault(require("./app/modules/user/user.route"));
const cow_route_1 = __importDefault(require("./app/modules/cow/cow.route"));
const order_route_1 = __importDefault(require("./app/modules/order/order.route"));
const app = (0, express_1.default)();
// using cors to allow cross origin resource sharing
app.use((0, cors_1.default)());
// using express.json() to parse json data from the request body
app.use(express_1.default.json());
// using express.urlencoded() to parse urlencoded data from the request body
app.use(express_1.default.urlencoded({ extended: false }));
// using the user router
app.use('/api/v1/user', user_route_1.default);
// using the cow router
app.use('/api/v1/cow', cow_route_1.default);
// using the order router
app.use('/api/v1/order', order_route_1.default);
// using globalErrorHandler middleware to handle all the errors
app.use(globalErrorHandler_1.default);
// this is not found middleware which will be executed when a request is made to a route which is not defined
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        message: 'Not Found',
        statusCode: http_status_1.default.NOT_FOUND,
        success: false,
        errorMessages: [
            {
                message: 'Not Found',
                path: req.originalUrl,
            },
        ],
    });
    next();
});
exports.default = app;
