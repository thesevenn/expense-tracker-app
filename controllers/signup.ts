import {Request, Response} from "express";
import {QueryResult} from "pg";
import bcrypt from "bcrypt";

import User from "../types/user.type";
import generateId from "../utils/generateId";
import {sanitize} from "../utils/validations/sanitize";
import {query} from "../database";

export default async function signup(
	req: Request,
	res: Response
): Promise<void> {
	let {email, password, username} = req.body;
	email = sanitize(email);
	password = sanitize(password);
	try {
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
				const id = generateId(email);
				const {rows} = await query(
					"INSERT INTO users (id,email,password) values ($1,$2,$3) returning *;",
					[id, email, hashPassword]
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
			res.status(500).json({
				success: false,
				message: "An error occured on our side try again later.",
			});
		}
	}
}
