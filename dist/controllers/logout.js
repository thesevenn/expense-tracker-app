"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const message_type_1 = require("../types/messages/message.type");
function logout(req, res) {
    try {
        res
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .clearCookie("user")
            .json((0, errorResponse_1.default)({ message: message_type_1.Messages.logout_success, success: true }));
    }
    catch (error) {
        if (error instanceof Error) {
            res
                .status(503)
                .json((0, errorResponse_1.default)({ message: message_type_1.ServerMessages.service_unavailable }));
        }
    }
}
exports.default = logout;
