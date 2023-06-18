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
const config_1 = require("./config");
const app_1 = __importDefault(require("./app"));
let server;
// step 5: handle uncaught exceptions and shutdown the server gracefully
process.on('uncaughtException', err => {
    console.log(err);
    console.log('Shutting down the server due to Uncaught Exception');
    process.exit(1);
});
function run_server() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // step 1: connect to mongodb database
            yield (0, mongoose_1.connect)(config_1.config.db_uri);
            console.log('Connected to MongoDB');
            // step 2: start the server on port 5000
            server = app_1.default.listen(config_1.config.port, () => {
                console.log(`Server is running on port ${config_1.config.port}`);
            });
            // step 3: handle unhandled promise rejections
            process.on('unhandledRejection', err => {
                console.log(err);
                console.log('Shutting down the server due to Unhandled Promise rejection');
                if (server) {
                    server.close(() => {
                        process.exit(1);
                    });
                }
                else {
                    process.exit(1);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
// step 4: handle SIGTERM signal to gracefully shutdown the server
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    if (server) {
        server.close(() => {
            console.log('Process terminated');
        });
    }
});
run_server();
