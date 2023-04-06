import {Response} from "express";

import {query} from "../database";
import {Varient} from "../types/utils/idvarient.type";
import RequestWithUser from "../types/custom/request.type";
import generateId from "../utils/generateId";
import {sanitize} from "../utils/validations/sanitize";
import isValidUser from "../utils/verifyUser";
import parseBoolean from "../utils/parseBoolean";
import {Messages, ServerMessages} from "../types/messages/message.type";
import responseMessage from "../utils/errorResponse";

export default async function newRecord(
	req: RequestWithUser,
	res: Response
): Promise<void> {
	let {amount, credit, description} = req.body;

	const {user, name} = req;
	try {
		// TODO => validation on amount, credit, userId
		if (user && (await isValidUser(user))) {
			credit = parseBoolean(credit);
			description = sanitize(description);
			if (!description) {
				description = "-";
			} else if (!amount) {
				res
					.status(400)
					.json(responseMessage({message: Messages.required_field}));
			} else if (isNaN(amount)) {
				res
					.status(400)
					.json(responseMessage({message: Messages.invalid_input}));
			} else {
				amount = parseFloat(sanitize(amount));
				const id: string = generateId(name, Varient.tiny);
				const result = await query(
					"INSERT INTO records(id,amount,credit,description,u_id) values($1,$2,$3,$4,$5) returning *;",
					[id, amount, credit, description, user]
				);
				const summary = await query(
					"SELECT credited,debited FROM summary WHERE u_id=$1;",
					[user]
				);
				if (summary.rows[0]) {
					console.log(summary.rows);

					let {credited, debited} = summary.rows[0];
					if (credit) {
						console.log(credited);

						const updatedCredit: string = amount + parseFloat(credited);
						await query("UPDATE summary SET credited=$1 WHERE u_id=$2;", [
							updatedCredit,
							user,
						]);
					} else if (!credit) {
						console.log(debited);

						const updatedDebit: string = amount + parseFloat(debited);
						await query("UPDATE summary SET debited=$1 WHERE u_id=$2;", [
							updatedDebit,
							user,
						]);
					}
					res.status(200).json({
						success: true,
						record: result.rows[0],
					});
				}
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
