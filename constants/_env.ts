import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

export const env = {
	PORT,
};
