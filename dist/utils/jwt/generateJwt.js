"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateJwt(id, secret = "zyNfmToxd03") {
    if (!secret) {
        return "";
    }
    const payload = {
        active: id,
        iat: Date.now() / 1000,
    };
    const webToken = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "30min" });
    return webToken;
}
exports.default = generateJwt;
