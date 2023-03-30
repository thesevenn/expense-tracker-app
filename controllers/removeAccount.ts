import {Response} from "express";
import {QueryResult} from "pg";

import RequestWithUser from "../types/custom/request.type";
import {query} from "../database";
import isValidUser from "../utils/verifyUser";
import {Messages, ServerMessages} from "../types/messages/message.type";
import responseMessage from "../utils/errorResponse";

export default async function removeAccount(
	req: RequestWithUser,
	res: Response
): Promise<void> {
	const {user, name} = req;
	try {
		if (user && (await isValidUser(user))) {
			const result: QueryResult = await query(
				"DELETE FROM users WHERE id=$1 returning id;",
				[user]
			);
			if (result.rows[0].id) {
				res
					.clearCookie("accessToken")
					.clearCookie("refreshToken")
					.clearCookie("user")
					.json(
						responseMessage({
							message: Messages.account_deleted,
							success: true,
							quote: "It's sad that we are loosing you!",
						})
					);
			}
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
