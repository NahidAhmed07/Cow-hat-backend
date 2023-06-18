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
const mongoose_1 = require("mongoose");
const cow_constant_1 = require("./cow.constant");
const user_model_1 = __importDefault(require("../user/user.model"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const CowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: cow_constant_1._cowLocation,
    },
    breed: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: cow_constant_1._cowLabel,
    },
    category: {
        type: String,
        required: true,
        enum: cow_constant_1._cowCategory,
    },
    image: {
        type: String,
        required: false,
        default: 'https://artprojectsforkids.org/wp-content/uploads/2021/01/Cow.jpeg',
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
CowSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const seller = yield user_model_1.default.findOne({ _id: this.seller });
        if (!seller) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Seller not found. Please Enter a valid seller id');
        }
        else if (seller.role !== 'seller') {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Seller not found. Your Entered Id not a seller Id . Please Enter a valid seller id');
        }
        next();
    });
});
const CowModel = (0, mongoose_1.model)('Cow', CowSchema);
exports.default = CowModel;
