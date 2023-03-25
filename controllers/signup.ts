import {Request, Response} from "express";
import {QueryResult} from "pg";
import bcrypt from "bcrypt";

import User from "../types/user.type";
import generateId from "../utils/generateId";
import {sanitize} from "../utils/validations/sanitize";
import {query} from "../database";
import {Varient} from "../types/idvarient.type";

export default async function signup(
	req: Request,
	res: Response
): Promise<void> {
	let {email, password, name} = req.body;
	email = sanitize(email);
	password = sanitize(password);
	name = sanitize(name);
	try {
		if (!name) {
			res.status(400).json({
				success: false,
				message: "everyone has a name, please tell us yours",
			});
		}
		if (!email || !password) {
			res.status(400).json({
				success: false,
				message: "email and password fields cannot be empty",
			});
		} else {
			const {rows}: QueryResult<Array<User>> = await query(
				"SELECT * FROM users WHERE email= $1;",
				[email]
			);
			if (rows.length) {
				res.status(400).json({
					success: false,
					message: "email already in use",
				});
			} else {
				const hashPassword: string = await bcrypt.hash(password, 15);
				const id = generateId(email, Varient.full);
				const {rows} = await query(
					"INSERT INTO users (id,email,password,name) values ($1,$2,$3,$4) returning *;",
					[id, email, hashPassword, name]
				);

				res.status(200).json({
					success: true,
					message: "user registerd succesfully.",
				});
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
			res.status(503).json({
				success: false,
				message: "An error occured on our side try again later.",
			});
		}
	}
}
