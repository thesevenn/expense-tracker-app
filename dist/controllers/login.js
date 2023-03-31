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
const bcrypt_1 = __importDefault(require("bcrypt"));
const sanitize_1 = require("../utils/validations/sanitize");
const database_1 = require("../database");
const signJwtToken_1 = __importDefault(require("../utils/jwt/signJwtToken"));
const token_type_1 = require("../types/utils/token.type");
const durations_type_1 = require("../types/utils/durations.type");
const message_type_1 = require("../types/messages/message.type");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { email, password } = req.body;
        email = (0, sanitize_1.sanitize)(email);
        try {
            if (!email || !password) {
                res
                    .status(400)
                    .json((0, errorResponse_1.default)({ message: message_type_1.Messages.fields_cannot_empty }));
            }
            else {
                const { rows } = yield (0, database_1.query)("SELECT email,password,id,name FROM users WHERE email = $1", [email]);
                if (rows.length) {
                    const verifyPassword = yield bcrypt_1.default.compare(password, rows[0].password);
                    if (!verifyPassword) {
                        res
                            .status(401)
                            .json((0, errorResponse_1.default)({ message: message_type_1.Messages.invalid_combination }));
                    }
                    else if (verifyPassword && rows[0].email == email) {
                        res
                            .status(201)
                            .cookie("accessToken", (0, signJwtToken_1.default)(rows[0].id, rows[0].name, {
                            type: token_type_1.Token.access,
                            expiresIn: durations_type_1.durations.short,
                        }), {
                            httpOnly: true,
                            maxAge: 1000 * 60 * 30,
                        })
                            .cookie("refreshToken", (0, signJwtToken_1.default)(rows[0].id, rows[0].name, {
                            type: token_type_1.Token.refresh,
                            expiresIn: durations_type_1.durations.long,
                        }), { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
                            .cookie("user", rows[0].id, { httpOnly: true })
                            .json({
                            success: true,
                            auth: true,
                            user: rows[0].name,
                            message: message_type_1.Messages.login_success,
                        });
                    }
                }
                else {
                    res
                        .status(401)
                        .json((0, errorResponse_1.default)({ message: message_type_1.Messages.invalid_combination }));
                }
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res
                    .status(503)
                    .json((0, errorResponse_1.default)({ message: message_type_1.ServerMessages.service_unavailable }));
            }
        }
    });
}
exports.default = login;
