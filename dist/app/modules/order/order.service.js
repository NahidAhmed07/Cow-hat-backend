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
exports.orderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { cow, buyer } = payload;
    // buyer check start here //
    const buyerData = yield user_model_1.default.findOne({ _id: buyer });
    // if buyer not found or buyer is not a buyer role then throw error
    if (!buyerData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Buyer not found. Please provide a valid buyer id');
    }
    else if (buyerData.role !== 'buyer') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Buyer not found. Please provide a valid buyer id');
    }
    // end buyer check here // buyer check done
    // cow check start here //
    const cowData = yield cow_model_1.default.findOne({ _id: cow });
    // if cow not found or cow is sold out then throw error
    if (!cowData) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow not found. Please select another cow');
    }
    else if (cowData.label === 'sold out') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cow already sold. Please select another cow');
    }
    // end cow check here // cow check done
    // if buyer budget is less than cow price then throw error
    if (buyerData.budget < cowData.price) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Insufficient budget. Please top up your account to proceed with this order');
    }
    // end buyer budget check here // buyer budget check done
    const sellerId = cowData.seller;
    let createdOrderId;
    // start transaction here //
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // update cow label to sold out //
        const cowUpdated = yield cow_model_1.default.updateOne({ _id: cow }, { label: 'sold out' }, { session });
        // if cow not updated then throw error because we can't proceed without updating cow label to sold out //
        if (!cowUpdated.acknowledged) {
            throw new Error('Something went wrong. Please try again');
        }
        // update buyer budget to buyer budget - cow price //
        const buyerUpdated = yield user_model_1.default.updateOne({ _id: buyer }, { $inc: { budget: -cowData.price } }, { session });
        // if buyer not updated then throw error because we can't proceed without updating buyer budget to buyer budget - cow price //
        if (!buyerUpdated.acknowledged) {
            throw new Error('Something went wrong. Please try again');
        }
        // update seller income to seller income + cow price //
        const sellerUpdated = yield user_model_1.default.updateOne({ _id: sellerId }, { $inc: { income: cowData.price } }, { session });
        // if seller not updated then throw error because we can't proceed without updating seller income to seller income + cow price //
        if (!sellerUpdated.acknowledged) {
            throw new Error('Something went wrong. Please try again');
        }
        // create order // make sure to use session here and pass data in a array otherwise mongoose will throw error //
        const createResult = yield order_model_1.default.create([payload], { session });
        // if order not created then throw error because we can't proceed without creating order //
        if (!createResult || createResult.length === 0) {
            throw new Error('Something went wrong. Please try again');
        }
        createdOrderId = createResult[0]._id;
        yield session.commitTransaction();
    }
    catch (error) {
        yield session.abortTransaction();
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Something went wrong. Please try again');
    }
    finally {
        session.endSession();
    }
    // finally order created successfully // now we need to populate data and return // make sure populate cow with nested seller // and populate buyer //
    const createdOrder = yield order_model_1.default.findOne({ _id: createdOrderId })
        .populate({
        path: 'cow',
        populate: [
            {
                path: 'seller',
            },
        ],
    })
        .populate('buyer');
    return createdOrder;
});
// end create order
// get all orders start here //
const getOrders = (paginationOptions, filterOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { buyer } = filterOptions;
    const { page, limit, skip, sort } = paginationOptions;
    // if buyer is provided then query with buyer otherwise query with empty object //
    const query = buyer ? { buyer } : {};
    const orders = yield order_model_1.default.find(query)
        .populate({
        path: 'cow',
        populate: [
            {
                path: 'seller',
            },
        ],
    })
        .populate('buyer')
        .skip(skip)
        .limit(limit)
        .sort(sort);
    const total = yield order_model_1.default.countDocuments(query);
    return {
        data: orders,
        meta: {
            total,
            page,
            limit,
        },
    };
});
// end get all orders
// get single order start here //
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = order_model_1.default.findOne({ _id: id })
        .populate({
        path: 'cow',
        populate: [
            {
                path: 'seller',
            },
        ],
    })
        .populate('buyer');
    return result;
});
// end get single order
exports.orderService = {
    createOrder,
    getOrders,
    getSingleOrder,
};
