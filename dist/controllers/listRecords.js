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
function listRecords(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user, name } = req;
        if (user && (yield (0, verifyUser_1.default)(user))) {
            const { rows } = yield (0, database_1.query)("SELECT * FROM records WHERE u_id=$1 ORDER BY added_at DESC", [user]);
            res.status(200).json({
                success: true,
                records: rows,
            });
        }
    });
}
exports.default = listRecords;
/*
for every year -> query of month;
if no year provided month are of current year
filter for month and year with query and asc or desc
pagination for 10-20 records per req.
*/
