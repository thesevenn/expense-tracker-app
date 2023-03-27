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
const verifyJwtToken_1 = __importDefault(require("../utils/jwt/verifyJwtToken"));
const token_type_1 = require("../types/utils/token.type");
function isAuthenticated(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accessToken } = req.cookies;
        try {
            if (!accessToken) {
                res.status(401).json({
                    success: false,
                    auth: false,
                    message: "Not Authorized",
                });
            }
            else if (accessToken) {
                const { user, invalid, expired, name } = (0, verifyJwtToken_1.default)(accessToken, token_type_1.Token.access);
                if (user && name && !invalid && !expired) {
                    req.user = user;
                    req.name = name;
                    next();
                }
                else if (invalid || expired) {
                    res.status(401).json({
                        success: false,
                        auth: false,
                        message: "Token is not valid or expired",
                    });
                }
            }
        }
        catch (error) {
            if (error instanceof Error && error.name == "JsonWebTokenError") {
                res.status(401).json({
                    success: false,
                    auth: false,
                    message: "Invalid Credentials",
                });
            }
            else {
                res.status(503).json({
                    success: false,
                    auth: false,
                    message: "An error occured on our side, try again later.",
                });
            }
        }
    });
}
exports.default = isAuthenticated;
