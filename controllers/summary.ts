import {Response} from "express";

import RequestWithUser from "../types/custom/request.type";
import isValidUser from "../utils/verifyUser";
import {query} from "../database";

export default async function summary(
	req: RequestWithUser,
	res: Response
): Promise<void> {
	const {user, name} = req;

	if (user && (await isValidUser(user))) {
		const {rows} = await query("SELECT ");
	}
}

/* 
updated_on field - updates on every update of summary route .
check if update has been done in last 7 new records 

if not, select entries from records after the time of last update and them to summary to update the summary table
else return the summary as it is.

opt 1 - use last added records count or once per day.

*/
