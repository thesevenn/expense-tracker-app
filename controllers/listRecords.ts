import {Response} from "express";
import {QueryResult} from "pg";

import RequestWithUser from "../types/custom/request.type";
import {query} from "../database";
import isValidUser from "../utils/verifyUser";
import createQuery from "../database/createQuery";

export default async function listRecords(
	req: RequestWithUser,
	res: Response
): Promise<void> {
	const {user} = req;
	const userQueries = req.query;
	try {
		const date = new Date();
		const page = (userQueries.page as string) || "1";
		const count = (userQueries.count as string) || "10";

		const offset = "" + (parseInt(page) - 1) * parseInt(count);

		if (user && (await isValidUser(user))) {
			let records: QueryResult;

			if (userQueries.month) {
				const date = new Date();
				const year = (userQueries.year || date.getFullYear()) as string;
				const month = userQueries.month as string;
				const fetchQuery = createQuery({month, year});
				records = await query(fetchQuery, [user, year, month, offset, count]);
			} else if (userQueries.year && !userQueries.month) {
				const year = userQueries.year as string;
				const fetchQuery = createQuery({year});
				records = await query(fetchQuery, [user, year, offset, count]);
			} else {
				const fetchQuery = createQuery();
				records = await query(fetchQuery, [user, offset, count]);
			}
			res.status(200).json({
				success: true,
				total: records.rowCount,
				records: records.rows,
			});
		}
	} catch (error) {
		console.log(error);
		res.send("not ok");
	}
}
/*

"SELECT * FROM records WHERE u_id=$1 ORDER BY added_at DESC OFFSET $2 ROWS FETCH NEXT $1 ROWS ONLY" 
*/
/* 
for every year -> query of month;
if no year provided month are of current year 
filter for month and year with query and asc or desc
pagination for 10-20 records per req.
*/
