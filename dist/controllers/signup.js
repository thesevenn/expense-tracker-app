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
const generateId_1 = __importDefault(require("../utils/generateId"));
const sanitize_1 = require("../utils/validations/sanitize");
const database_1 = require("../database");
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { email, password, username } = req.body;
        email = (0, sanitize_1.sanitize)(email);
        password = (0, sanitize_1.sanitize)(password);
        try {
            if (!email || !password) {
                res.status(400).json({
                    success: false,
                    message: "email and password fields cannot be empty",
                });
            }
            else {
                const { rows } = yield (0, database_1.query)("SELECT * FROM users WHERE email= $1;", [email]);
                if (rows.length) {
                    res.status(400).json({
                        success: false,
                        message: "email already in use",
                    });
                }
                else {
                    const hashPassword = yield bcrypt_1.default.hash(password, 15);
                    const id = (0, generateId_1.default)(email);
                    const { rows } = yield (0, database_1.query)("INSERT INTO users (id,email,password) values ($1,$2,$3) returning *;", [id, email, hashPassword]);
                    res.status(200).json({
                        success: true,
                        message: "user registerd succesfully.",
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
exports.default = signup;
