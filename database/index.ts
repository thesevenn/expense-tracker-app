import {Pool} from "pg";

import PoolConfig from "../types/pool.type";
import {env} from "../constants/_env";

const config: PoolConfig = {
	host: env.PGHOST || "localhost",
	port: env.PGPORT || 5432,
	database: env.PGDATABASE || "test",
	user: env.PGUSERNAME || "postgres",
	password: env.PGPASSWORD || "",
};

export const pool = new Pool(config);

export const query = (text: string, params?: Array<string>) =>
	pool.query(text, params);
