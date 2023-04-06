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
const idvarient_type_1 = require("../types/utils/idvarient.type");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const message_type_1 = require("../types/messages/message.type");
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { email, password, name } = req.body;
        email = (0, sanitize_1.sanitize)(email);
        password = (0, sanitize_1.sanitize)(password);
        name = (0, sanitize_1.sanitize)(name).toLowerCase();
        try {
            if (!name) {
                res.status(400).json((0, errorResponse_1.default)({ message: message_type_1.Messages.name_required }));
            }
            else if (!email || !password) {
                res
                    .status(400)
                    .json((0, errorResponse_1.default)({ message: message_type_1.Messages.fields_cannot_empty }));
            }
            else {
                const { rows } = yield (0, database_1.query)("SELECT * FROM users WHERE email= $1;", [email]);
                if (rows.length) {
                    res
                        .status(400)
                        .json((0, errorResponse_1.default)({ message: message_type_1.Messages.account_already_exists }));
                }
                else {
                    const hashPassword = yield bcrypt_1.default.hash(password, 15);
                    const id = (0, generateId_1.default)(email, idvarient_type_1.Varient.full);
                    yield (0, database_1.query)("INSERT INTO users (id,email,password,name) values ($1,$2,$3,$4);", [id, email, hashPassword, name]);
                    // create summary for first time
                    const summaryId = (0, generateId_1.default)(name, idvarient_type_1.Varient.tiny);
                    yield (0, database_1.query)("INSERT INTO summary(id,debited,credited,u_id) values($1,$2,$3,$4);", [summaryId, "0.00", "0.00", id]);
                    res.status(201).json({
                        success: true,
                        message: message_type_1.Messages.registerd_success,
                    });
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
exports.default = signup;
