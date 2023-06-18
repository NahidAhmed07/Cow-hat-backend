"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const cow_validation_1 = require("./cow.validation");
const cow_controller_1 = require("./cow.controller");
const CowRouter = (0, express_1.Router)();
CowRouter.post('/create-cow', (0, validateRequest_1.default)(cow_validation_1.CowValidator.createCowZosSchema), cow_controller_1.CowController.createCow);
CowRouter.patch('/:id', (0, validateRequest_1.default)(cow_validation_1.CowValidator.updateCowZodSchema), cow_controller_1.CowController.updateCow);
CowRouter.get('/:id', cow_controller_1.CowController.getSingleCow);
CowRouter.delete('/:id', cow_controller_1.CowController.deleteCow);
CowRouter.get('/', cow_controller_1.CowController.getAllCow);
exports.default = CowRouter;
