"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appProvider = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const _env_1 = require("./constants/_env");
const logger_1 = __importDefault(require("./middlewares/logger"));
const app = (0, express_1.default)();
function appProvider() {
    (0, cors_1.default)({ origin: _env_1.env.ORIGIN, credentials: true });
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    app.use(logger_1.default);
    app.use("/v1/", routes_1.default);
    app.use("/api/v1/auth", auth_1.default);
    app.use("/api/v1/user", user_1.default);
    return app;
}
exports.appProvider = appProvider;
exports.default = app;
