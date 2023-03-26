"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _env_1 = require("../../constants/_env");
const durations_type_1 = require("../../types/utils/durations.type");
function signJwtToken(id, { type, expiresIn = durations_type_1.durations.short }) {
    const secret = type == "access" ? _env_1.env.ACCESS_SECRET : _env_1.env.REFRESH_SECRET;
    if (secret) {
        const payload = {
            active: id,
            iat: Date.now() / 1000,
        };
        const webToken = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: expiresIn });
        return webToken;
    }
    else {
        return false;
    }
}
exports.default = signJwtToken;
