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
// TODO add auth middleware
function newRecord(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { amount, credit, userId } = req.body;
        // TODO => sanitize
        const { user } = req;
        try {
            if (!amount || !credit || !userId) {
                res.status(400).json({
                    success: false,
                    message: "Required fields cannot be empty",
                });
            }
            else {
                // TODO => validation on amount, credit, userId
                const id = (0, generateId_1.default)(userId, idvarient_type_1.Varient.tiny);
                const result = yield (0, database_1.query)("INSERT INTO records(id,amount,credit,u_id) values($!,$2,$3,$4) returning *;", [id, amount, credit, userId]);
            }
        }
        catch (error) {
            if (error instanceof Error)
                console.log(error.message);
        }
    });
}
exports.default = newRecord;
