"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const PGHOST = process.env.PGHOST;
const PGUSERNAME = process.env.PGUSERNAME;
const PGPASSWORD = process.env.PGPASSWORD;
const PGDATABASE = process.env.PGDATABASE;
const PGPORT = Number(process.env.PGPORT);
const ORIGIN = process.env.ORIGIN;
exports.env = {
    PORT,
    PGHOST,
    PGUSERNAME,
    PGPASSWORD,
    PGDATABASE,
    PGPORT,
    ORIGIN,
};
