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
const verifyUser_1 = __importDefault(require("../utils/verifyUser"));
const database_1 = require("../database");
function summary(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user, name } = req;
        try {
            if (user && (yield (0, verifyUser_1.default)(user))) {
                const summary = yield (0, database_1.query)("SELECT * FROM summary WHERE u_id=$1", [user]);
                res.status(200).json({
                    success: true,
                    summary: summary.rows[0],
                    user: name,
                });
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Cannot find what you are looking for",
                });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(403).json({
                    success: false,
                    message: "An error occured on Our side, try again later",
                });
            }
        }
    });
}
exports.default = summary;
/*
updated_on field - updates on every update of summary route .
check if update has been done in last 7 new records

if not, select entries from records after the time of last update and them to summary to update the summary table
else return the summary as it is.

opt 1 - use last added records count or once per day.

*/
