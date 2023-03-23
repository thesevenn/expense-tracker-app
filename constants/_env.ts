import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const PGHOST = process.env.PGHOST;
const PGUSERNAME = process.env.PGUSERNAME;
const PGPASSWORD = process.env.PGPASSWORD;
const PGDATABASE = process.env.PGDATABASE;
const PGPORT = Number(process.env.PGPORT);
const ORIGIN = process.env.ORIGIN;
const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const env = {
	PORT,
	PGHOST,
	PGUSERNAME,
	PGPASSWORD,
	PGDATABASE,
	PGPORT,
	ORIGIN,
	ACCESS_SECRET,
	REFRESH_SECRET,
};
