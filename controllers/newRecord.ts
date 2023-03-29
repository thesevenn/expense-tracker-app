import {Response} from "express";

import {query} from "../database";
import {Varient} from "../types/utils/idvarient.type";
import RequestWithUser from "../types/custom/request.type";
import generateId from "../utils/generateId";
import {sanitize} from "../utils/validations/sanitize";
import isValidUser from "../utils/verifyUser";
import parseBoolean from "../utils/parseBoolean";

// TODO add auth middleware done
export default async function newRecord(
	req: RequestWithUser,
	res: Response
): Promise<void> {
	let {amount, credit} = req.body;
	console.log(credit);

	const {user, name} = req;
	if (!amount || !credit) {
		res.status(400).json({
			success: false,
			message: "Required fields cannot be empty",
		});
	}

	try {
		// TODO => validation on amount, credit, userId
		if (user && (await isValidUser(user))) {
			amount = parseFloat(sanitize(amount));
			credit = parseBoolean(credit);

			const id: string = generateId(name, Varient.tiny);
			const result = await query(
				"INSERT INTO records(id,amount,credit,u_id) values($1,$2,$3,$4) returning *;",
				[id, amount, credit, user]
			);
			const summary = await query(
				"SELECT credited,debited FROM summary WHERE u_id=$1;",
				[user]
			);
			let {credited, debited} = summary.rows[0];
			if (credit) {
				const updatedCredit: string = amount + parseFloat(credited);
				await query("UPDATE summary SET credited=$1 WHERE u_id=$2;", [
					updatedCredit,
					user,
				]);
			} else if (!credit) {
				console.log(false);
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
