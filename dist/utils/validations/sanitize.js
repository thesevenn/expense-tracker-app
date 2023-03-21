"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitize = void 0;
const sanitize = (target) => {
    if (target)
        return target.trim();
    return "";
};
exports.sanitize = sanitize;
