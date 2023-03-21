"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logger(req, res, next) {
    console.log(`request made at: ${req.originalUrl} :: method:${req.method}`);
    next();
}
exports.default = logger;
