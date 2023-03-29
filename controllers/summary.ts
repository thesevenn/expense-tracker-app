import {Response} from "express";
import {QueryResult} from "pg";

import RequestWithUser from "../types/custom/request.type";
import isValidUser from "../utils/verifyUser";
import {query} from "../database";

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
			res.status(404).json({
				success: false,
				message: "Cannot find what you are looking for",
			});
		}
	} catch (error) {
		if (error instanceof Error) {
			res.status(403).json({
				success: false,
				message: "An error occured on Our side, try again later",
			});
		}
	}
}

/* 
updated_on field - updates on every update of summary route .
check if update has been done in last 7 new records 

if not, select entries from records after the time of last update and them to summary to update the summary table
else return the summary as it is.

opt 1 - use last added records count or once per day.

*/
