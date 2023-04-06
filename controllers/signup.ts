import {Request, Response} from "express";
import {QueryResult} from "pg";
import bcrypt from "bcrypt";

import User from "../types/user/user.type";
import generateId from "../utils/generateId";
import {sanitize} from "../utils/validations/sanitize";
import {query} from "../database";
import {Varient} from "../types/utils/idvarient.type";
import responseMessage from "../utils/errorResponse";
import {Messages, ServerMessages} from "../types/messages/message.type";

export default async function signup(
	req: Request,
	res: Response
): Promise<void> {
	let {email, password, name} = req.body;
	email = sanitize(email);
	password = sanitize(password);
	name = sanitize(name).toLowerCase();
	try {
		if (!name) {
			res.status(400).json(responseMessage({message: Messages.name_required}));
		} else if (!email || !password) {
			res
				.status(400)
				.json(responseMessage({message: Messages.fields_cannot_empty}));
		} else {
			const {rows}: QueryResult<Array<User>> = await query(
				"SELECT * FROM users WHERE email= $1;",
				[email]
			);
			if (rows.length) {
				res
					.status(400)
					.json(responseMessage({message: Messages.account_already_exists}));
			} else {
				const hashPassword: string = await bcrypt.hash(password, 15);
				const id = generateId(email, Varient.full);
				await query(
					"INSERT INTO users (id,email,password,name) values ($1,$2,$3,$4);",
					[id, email, hashPassword, name]
				);

				// create summary for first time
				const summaryId = generateId(name, Varient.tiny);
				await query(
					"INSERT INTO summary(id,debited,credited,u_id) values($1,$2,$3,$4);",
					[summaryId, "0.00", "0.00", id]
				);
				res.status(201).json({
					success: true,
					message: Messages.registerd_success,
				});
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
			res
				.status(503)
				.json(responseMessage({message: ServerMessages.service_unavailable}));
		}
	}
}
