"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    const finalObj = {};
    if (keys.length === 0 || !obj || typeof obj !== 'object') {
        return finalObj;
    }
    else {
        keys.forEach(key => {
            if (key in obj) {
                finalObj[key] = obj[key];
            }
        });
        return finalObj;
    }
};
exports.default = pick;
