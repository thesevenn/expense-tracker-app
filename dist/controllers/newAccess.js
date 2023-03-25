"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyJwtReturnUser_1 = __importDefault(require("../utils/jwt/verifyJwtReturnUser"));
const generateJwt_1 = __importDefault(require("../utils/jwt/generateJwt"));
const token_type_1 = require("../types/token.type");
const durations_type_1 = require("../types/durations.type");
function newAccess(req, res) {
    const { refreshToken } = req.cookies;
    try {
        if (!refreshToken) {
            res.status(400).json({
                success: false,
                message: "token required",
            });
        }
        const user = (0, verifyJwtReturnUser_1.default)(refreshToken);
        if (user) {
            const accessToken = (0, generateJwt_1.default)(user, {
                type: token_type_1.Type.access,
                expiresIn: durations_type_1.durations.short,
            });
            res
                .status(200)
                .cookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 1800000,
            })
                .json({
                success: true,
                message: "access provided",
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.name == "JsonWebTokenError") {
                res.status(401).clearCookie("refreshToken").json({
                    success: false,
                    auth: false,
                    message: "refresh token is invalid",
                });
            }
            else {
                res.status(503).json({
                    success: false,
                    message: "An error occured on our side, try again later.",
                });
            }
        }
    }
}
exports.default = newAccess;
