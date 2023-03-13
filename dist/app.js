"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const _env_1 = require("./constants/_env");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
(0, cors_1.default)({ origin: "http:localhost:3000" });
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/v1", routes_1.default);
app.listen(_env_1.env.PORT, () => {
    console.log("running at: ", _env_1.env.PORT);
});
exports.default = app;
