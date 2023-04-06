"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyUserAccess_1 = __importDefault(require("../middlewares/verifyUserAccess"));
const newRecord_1 = __importDefault(require("../controllers/newRecord"));
const listRecords_1 = __importDefault(require("../controllers/listRecords"));
const summary_1 = __importDefault(require("../controllers/summary"));
const removeAccount_1 = __importDefault(require("../controllers/removeAccount"));
const router = (0, express_1.Router)();
// auth middleware
router.use(verifyUserAccess_1.default);
// POST at - /records
// body - {amount,creditBool,userId}
router.route("/records").post(newRecord_1.default).get(listRecords_1.default);
// GET at - /records
// response shape => 10-20 recent records [...{record-row}]
// router.get("/records", listRecords);
// GET at - /summary
// response shape => {summary-row}
router.get("/summary", summary_1.default);
router.delete("/account", removeAccount_1.default);
//
exports.default = router;
// TODO => add description in new records
// csrf prevent
// validation of email and password and text counts of description
