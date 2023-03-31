import {Response} from "express";
import {QueryResult} from "pg";

import RequestWithUser from "../types/custom/request.type";
import isValidUser from "../utils/verifyUser";
import {query} from "../database";
import {Messages, ServerMessages} from "../types/messages/message.type";
import responseMessage from "../utils/errorResponse";

export default async function summary(
	req: RequestWithUser,
	res: Response
): Promise<void> {
	const {user, name} = req;
	try {
		if (user && (await isValidUser(user))) {
			const summary: QueryResult = await query(
				"SELECT * FROM summary WHERE u_id=$1",
				[user]
			);
			res.status(200).json({
				success: true,
				summary: summary.rows[0],
				user: name,
			});
		} else {
			res
				.status(401)
				.json(responseMessage({message: Messages.not_authenticated}));
		}
	} catch (error) {
		if (error instanceof Error) {
			res
				.status(503)
				.json(responseMessage({message: ServerMessages.service_unavailable}));
		}
	}
}
