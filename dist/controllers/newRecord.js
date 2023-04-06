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
const idvarient_type_1 = require("../types/utils/idvarient.type");
const generateId_1 = __importDefault(require("../utils/generateId"));
const sanitize_1 = require("../utils/validations/sanitize");
const verifyUser_1 = __importDefault(require("../utils/verifyUser"));
const parseBoolean_1 = __importDefault(require("../utils/parseBoolean"));
const message_type_1 = require("../types/messages/message.type");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
function newRecord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { amount, credit, description } = req.body;
        const { user, name } = req;
        if (!amount) {
            res.status(400).json((0, errorResponse_1.default)({ message: message_type_1.Messages.required_field }));
        }
        try {
            // TODO => validation on amount, credit, userId
            if (user && (yield (0, verifyUser_1.default)(user))) {
                amount = parseFloat((0, sanitize_1.sanitize)(amount));
                credit = (0, parseBoolean_1.default)(credit);
                description = (0, sanitize_1.sanitize)(description);
                if (!description) {
                    description = "-";
                }
                else if (!amount || !description) {
                    res
                        .status(400)
                        .json((0, errorResponse_1.default)({ message: message_type_1.Messages.required_field }));
                }
                const id = (0, generateId_1.default)(name, idvarient_type_1.Varient.tiny);
                const result = yield (0, database_1.query)("INSERT INTO records(id,amount,credit,description,u_id) values($1,$2,$3,$4,$5) returning *;", [id, amount, credit, description, user]);
                const summary = yield (0, database_1.query)("SELECT credited,debited FROM summary WHERE u_id=$1;", [user]);
                if (summary.rows[0]) {
                    console.log(summary.rows);
                    let { credited, debited } = summary.rows[0];
                    if (credit) {
                        const updatedCredit = amount + parseFloat(credited);
                        yield (0, database_1.query)("UPDATE summary SET credited=$1 WHERE u_id=$2;", [
                            updatedCredit,
                            user,
                        ]);
                    }
                    else if (!credit) {
                        const updatedDebit = amount + parseFloat(debited);
                        yield (0, database_1.query)("UPDATE summary SET debited=$1 WHERE u_id=$2;", [
                            updatedDebit,
                            user,
                        ]);
                    }
                    res.status(200).json({
                        success: true,
                        record: result.rows[0],
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
exports.default = newRecord;
