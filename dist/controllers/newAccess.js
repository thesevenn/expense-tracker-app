"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyJwtToken_1 = __importDefault(require("../utils/jwt/verifyJwtToken"));
const signJwtToken_1 = __importDefault(require("../utils/jwt/signJwtToken"));
const token_type_1 = require("../types/utils/token.type");
const durations_type_1 = require("../types/utils/durations.type");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const message_type_1 = require("../types/messages/message.type");
function newAccess(req, res) {
    const { refreshToken } = req.cookies;
    try {
        if (!refreshToken) {
            res.status(400).json((0, errorResponse_1.default)({ message: message_type_1.Messages.token_required }));
        }
        const { user, name, expired, invalid } = (0, verifyJwtToken_1.default)(refreshToken, token_type_1.Token.refresh);
        if (user && name && !expired && !invalid) {
            const accessToken = (0, signJwtToken_1.default)(user, name, {
                type: token_type_1.Token.access,
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
                message: message_type_1.Messages.access_granted,
            });
        }
        else {
            res.status(401).clearCookie("refreshToken").json({
                success: false,
                auth: false,
                message: message_type_1.Messages.token_expired,
            });
        }
    }
    catch (error) {
        console.log(error instanceof Error);
        if (error instanceof Error) {
            if (error.name == "JsonWebTokenError") {
                res.status(401).clearCookie("refreshToken").json({
                    success: false,
                    auth: false,
                    message: message_type_1.Messages.token_expired,
                });
            }
            else {
                res
                    .status(503)
                    .json((0, errorResponse_1.default)({ message: message_type_1.ServerMessages.service_unavailable }));
            }
        }
    }
}
exports.default = newAccess;
