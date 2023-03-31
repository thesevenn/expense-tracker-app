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
const database_1 = require("../database");
const verifyUser_1 = __importDefault(require("../utils/verifyUser"));
const message_type_1 = require("../types/messages/message.type");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
function removeAccount(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user, name } = req;
        try {
            if (user && (yield (0, verifyUser_1.default)(user))) {
                const result = yield (0, database_1.query)("DELETE FROM users WHERE id=$1 returning id;", [user]);
                if (result.rows[0].id) {
                    res
                        .clearCookie("accessToken")
                        .clearCookie("refreshToken")
                        .clearCookie("user")
                        .json((0, errorResponse_1.default)({
                        message: message_type_1.Messages.account_deleted,
                        success: true,
                        quote: "It's sad that we are loosing you!",
                    }));
                }
            }
            else {
                res
                    .status(401)
                    .json((0, errorResponse_1.default)({ message: message_type_1.Messages.not_authenticated }));
            }
        }
        catch (error) {
            if (error instanceof Error) {
                res
                    .status(503)
                    .json((0, errorResponse_1.default)({ message: message_type_1.ServerMessages.service_unavailable }));
            }
        }
    });
}
exports.default = removeAccount;
