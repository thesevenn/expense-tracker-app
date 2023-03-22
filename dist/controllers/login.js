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
const generateJwt_1 = __importDefault(require("../utils/jwt/generateJwt"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { email, password } = req.body;
        email = (0, sanitize_1.sanitize)(email);
        try {
            if (!email || !password) {
                res.status(400).json({
                    success: false,
                    message: "email and password fields cannot be empty",
                });
            }
            else {
                const { rows } = yield (0, database_1.query)("SELECT email,password,id FROM users WHERE email = $1", [email]);
                if (rows) {
                    const verifyPassword = yield bcrypt_1.default.compare(password, rows[0].password);
                    if (!verifyPassword) {
                        res.status(401).json({
                            success: false,
                            message: "email and password pair not match.",
                        });
                    }
                    else if (verifyPassword && rows[0].email == email) {
                        console.log((0, generateJwt_1.default)("eur3h33230jf"));
                        res
                            .status(201)
                            .cookie("token", (0, generateJwt_1.default)(rows[0].id), {
                            httpOnly: true,
                        })
                            .json({
                            success: true,
                            message: "login successfully as: " + rows[0].email,
                        });
                    }
                }
                else {
                    res.status(401).json({
                        success: false,
                        message: "email and password pair not match.",
                    });
                }
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
                res.status(500).json({
                    success: false,
                    message: "An error occured on our side try again later.",
                });
            }
        }
    });
}
exports.default = login;
