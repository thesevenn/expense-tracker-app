import {Response} from "express";

import {query} from "../database";
import {Varient} from "../types/utils/idvarient.type";
import RequestWithUser from "../types/custom/request.type";
import generateId from "../utils/generateId";
import {sanitize} from "../utils/validations/sanitize";

// TODO add auth middleware done
export default async function newRecord(
	req: RequestWithUser,
	res: Response
): Promise<void> {
	let {amount, credit} = req.body;
	const {user, name} = req;
	if (!amount || !credit) {
		res.status(400).json({
			success: false,
			message: "Required fields cannot be empty",
		});
	}
	try {
		// TODO => validation on amount, credit, userId
		if (user) {
			amount = parseFloat(sanitize(amount));
			credit = sanitize(credit);
			console.log(amount, credit);
			const id: string = generateId(name, Varient.tiny);
			const result = await query(
				"INSERT INTO records(id,amount,credit,u_id) values($1,$2,$3,$4) returning *;",
				[id, amount, credit, user]
			);
			res.status(200).json({
				success: true,
				record: result.rows[0],
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log(error.message);
			res.status(503).json({
				success: false,
				message: "An error occured on our side, try again later",
			});
		}
	}
}
