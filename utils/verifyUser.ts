import {query} from "../database/index";

export default async function isValidUser(userId: string): Promise<boolean> {
	let isValidUser: boolean = false;

	const result = await query("SELECT * FROM users WHERE id=$1", [userId]);
	if (result.rowCount == 1) {
		isValidUser = true;
	}

	return isValidUser;
}
