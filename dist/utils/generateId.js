"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const idvarient_type_1 = require("../types/utils/idvarient.type");
function generateId(target = "excq", varient) {
    const time = String(Date.now());
    const specs = ["xc", "tr", "aq", "fz", "nj", "en"];
    if (varient == idvarient_type_1.Varient.full) {
        return `${specs[Math.floor(Math.random() * specs.length)] +
            time.substring(0, time.length / 2)}-${target.substring(0, 2) + time.substring(time.length / 2 + 1)}-${crypto_1.default
            .randomBytes(4)
            .toString("hex")}`;
    }
    else {
        return `${specs[Math.floor(Math.random() * specs.length)] + time.substring(0, 5)}-${target.substring(0, 2) + time.substring(time.length / 2 + 2)}`;
    }
}
exports.default = generateId;
// tiny => [en]34892x-e14489[tr]
// full => [en]192303-[ej]892831-[rt]139041
