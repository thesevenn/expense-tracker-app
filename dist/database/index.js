"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.pool = void 0;
const pg_1 = require("pg");
const _env_1 = require("../constants/_env");
const config = {
    host: _env_1.env.PGHOST || "localhost",
    port: _env_1.env.PGPORT || 5432,
    database: _env_1.env.PGDATABASE || "test",
    user: _env_1.env.PGUSERNAME || "postgres",
    password: _env_1.env.PGPASSWORD || "",
};
exports.pool = new pg_1.Pool(config);
const query = (text, params) => exports.pool.query(text, params);
exports.query = query;
