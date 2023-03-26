"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const _env_1 = require("../../constants/_env");
const token_type_1 = require("../../types/utils/token.type");
function verifyJwtToken(token, type = token_type_1.Token.access) {
    const secret = type == "access" ? _env_1.env.ACCESS_SECRET : _env_1.env.REFRESH_SECRET;
    const decoded = {
        invalid: true,
        expired: true,
        user: null,
        name: null,
        error: null,
    };
    try {
        if (secret) {
            const verifiedPayload = jsonwebtoken_1.default.verify(token, secret);
            if (verifiedPayload instanceof Object && verifiedPayload.active) {
                decoded.user = verifiedPayload.active;
                decoded.name = verifiedPayload.name;
                decoded.expired = false;
                decoded.invalid = false;
            }
        }
    }
    catch (error) {
        if (error instanceof Error) {
            decoded.error = error.name;
        }
    }
    return decoded;
}
exports.default = verifyJwtToken;
