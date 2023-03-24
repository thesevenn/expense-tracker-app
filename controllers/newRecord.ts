import {Request, Response} from "express";

import {query} from "../database";
import generateId from "../utils/generateId";

// TODO add auth middleware
export default async function newRecord(
	req: Request,
	res: Response
): Promise<void> {
	const {amount, credit, userId} = req.body;
	// TODO => sanitize

	try {
		if (!amount || !credit || !userId) {
			res.status(400).json({
				success: false,
				message: "Required fields cannot be empty",
			});
		} else {
			// TODO => validation on amount, credit, userId
			const id: string = generateId(userId);
			const result = await query(
				"INSERT INTO records(id,amount,credit,u_id) values($!,$2,$3) returning *;",
				[id, amount, credit, userId]
			);
		}
	} catch (error) {
		if (error instanceof Error) console.log(error.message);
	}
}
