"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _env_1 = require("../../constants/_env");
function verifyTokenReturnUser(token) {
    if (_env_1.env.REFRESH_SECRET) {
        const payload = jsonwebtoken_1.default.verify(token, _env_1.env.REFRESH_SECRET);
        if (payload instanceof Object) {
            return payload.active;
        }
    }
    return "";
}
exports.default = verifyTokenReturnUser;
