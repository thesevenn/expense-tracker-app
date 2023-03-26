import {Request, Response} from "express";
import {QueryResult} from "pg";
import bcrypt from "bcrypt";

import User from "../types/user/user.type";
import {sanitize} from "../utils/validations/sanitize";
import {query} from "../database";
import signJwtToken from "../utils/jwt/signJwtToken";
import {Token} from "../types/utils/token.type";
import {durations} from "../types/utils/durations.type";

export default async function login(req: Request, res: Response) {
	let {email, password} = req.body;
	email = sanitize(email);
	try {
		if (!email || !password) {
			res.status(400).json({
				success: false,
				message: "email and password fields cannot be empty",
			});
		} else {
			const {rows}: QueryResult<User> = await query(
				"SELECT email,password,id,name FROM users WHERE email = $1",
				[email]
			);
			if (rows.length) {
				const verifyPassword = await bcrypt.compare(password, rows[0].password);
				if (!verifyPassword) {
					res.status(401).json({
						success: false,
						message: "email and password pair not match.",
					});
				} else if (verifyPassword && rows[0].email == email) {
					res
						.status(201)
						.cookie(
							"accessToken",
							signJwtToken(rows[0].id, rows[0].name, {
								type: Token.access,
								expiresIn: durations.short,
							}),
							{
								httpOnly: true,
								maxAge: 1000 * 60 * 30,
							}
						)
						.cookie(
							"refreshToken",
							signJwtToken(rows[0].id, rows[0].name, {
								type: Token.refresh,
								expiresIn: durations.long,
							}),
							{httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7}
						)
						.cookie("user", rows[0].id, {httpOnly: true})
						.json({
							success: true,
							auth: true,
							user: rows[0].name,
							message: "login successfully as: " + rows[0].name,
						});
				}
			} else {
				res.status(401).json({
					success: false,
					message: "email and password pair not match.",
				});
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
			res.status(503).json({
				success: false,
				message: "An error occured on our side, try again later.",
			});
		}
	}
}
