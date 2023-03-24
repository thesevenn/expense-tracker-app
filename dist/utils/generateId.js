"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
function generateId(target) {
    const time = String(Date.now());
    const specs = ["xc", "tr", "aq", "fz", "nj"];
    return `
		${specs[Math.floor(Math.random() * specs.length)] +
        time.substring(0, time.length / 2)}-${target.substring(0, 2) + time.substring(time.length / 2 + 1)}-${crypto_1.default
        .randomBytes(4)
        .toString("hex")}
		`;
}
exports.default = generateId;
