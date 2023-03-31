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
const createQuery_1 = __importDefault(require("../database/createQuery"));
const message_type_1 = require("../types/messages/message.type");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
function listRecords(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user } = req;
        const userQueries = req.query;
        try {
            const page = userQueries.page || "1";
            const count = userQueries.count || "10";
            const offset = "" + (parseInt(page) - 1) * parseInt(count);
            if (user && (yield (0, verifyUser_1.default)(user))) {
                let records;
                if (userQueries.month) {
                    const date = new Date();
                    const year = (userQueries.year || date.getFullYear());
                    const month = userQueries.month;
                    const fetchQuery = (0, createQuery_1.default)({ month, year });
                    records = yield (0, database_1.query)(fetchQuery, [user, year, month, offset, count]);
                }
                else if (userQueries.year && !userQueries.month) {
                    const year = userQueries.year;
                    const fetchQuery = (0, createQuery_1.default)({ year });
                    records = yield (0, database_1.query)(fetchQuery, [user, year, offset, count]);
                }
                else {
                    const fetchQuery = (0, createQuery_1.default)();
                    records = yield (0, database_1.query)(fetchQuery, [user, offset, count]);
                }
                res.status(200).json({
                    success: true,
                    total: records.rowCount,
                    records: records.rows,
                });
            }
            else {
                res
                    .status(401)
                    .json((0, errorResponse_1.default)({ message: message_type_1.Messages.not_authenticated }));
            }
        }
        catch (error) {
            console.log(error);
            res
                .status(503)
                .json((0, errorResponse_1.default)({ message: message_type_1.ServerMessages.service_unavailable }));
        }
    });
}
exports.default = listRecords;
