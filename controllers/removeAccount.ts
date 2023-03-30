import {Response} from "express";
import {QueryResult} from "pg";

import RequestWithUser from "../types/custom/request.type";
import {query} from "../database";
import isValidUser from "../utils/verifyUser";

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
					.json({
						success: true,
						message:
							name +
							", Your account has been deleted and all the associated data will be removed from our servers.",
						quote: "It's sad we are loosing you.",
					});
			}
		} else {
			res.status(401).json({
				success: false,
				message: "You are not authorized to perform this action",
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);

			res.status(503).json({
				success: false,
				message: "An error occured on our side, try again later.",
			});
		}
	}
}
