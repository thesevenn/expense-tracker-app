"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
(0, cors_1.default)({ origin: "http:localhost:3000" });
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/v1/", routes_1.default);
app.use("/v1/auth", auth_1.default);
app.use("/v1/user", user_1.default);
exports.default = app;
