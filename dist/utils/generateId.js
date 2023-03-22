"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
function generateId(target) {
    return (Date.now() + target.substring(0, 4) + crypto_1.default.randomBytes(5).toString("hex"));
}
exports.default = generateId;
