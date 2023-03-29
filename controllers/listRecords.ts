import {Response} from "express";
import {QueryResult} from "pg";

import RequestWithUser from "../types/custom/request.type";
import {query} from "../database";
import isValidUser from "../utils/verifyUser";

export default async function listRecords(
	req: RequestWithUser,
	res: Response
): Promise<void> {
	const {user} = req;
	if (user && (await isValidUser(user))) {
		const {rows}: QueryResult = await query(
			"SELECT * FROM records WHERE u_id=$1 ORDER BY added_at DESC",
			[user]
		);
		res.status(200).json({
			success: true,
			records: rows,
		});
	}
}

/* 
for every year -> query of month;
if no year provided month are of current year 
filter for month and year with query and asc or desc
pagination for 10-20 records per req.
*/
