"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const newRecord_1 = __importDefault(require("../controllers/newRecord"));
const verifyUserAccess_1 = __importDefault(require("../middlewares/verifyUserAccess"));
const router = (0, express_1.Router)();
// TODO =>
/*
User should be able to create new entry for expense or earnings √
list recent entries 10-20 √
then filter by month, year . if only month then year is current year.
summary of complete record for each user.
monthly summary.
yearly summary.
pagination for list.
*/
// auth middleware
router.use(verifyUserAccess_1.default);
// POST at - /records
// body - {amount,creditBool,userId}
router.post("/records", newRecord_1.default);
// GET at - /records
// response shape => 10-20 recent records [...{record-row}]
router.get("/records");
// GET at - /summary
// response shape => {summary-row}
router.get("/summary");
//
exports.default = router;
