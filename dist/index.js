"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const _env_1 = require("./constants/_env");
app_1.default.listen(_env_1.env.PORT, () => {
    console.log("Server running At url:http://localhost:" + _env_1.env.PORT);
});
