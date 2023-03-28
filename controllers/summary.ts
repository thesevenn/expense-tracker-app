import {Response} from "express";

import RequestWithUser from "../types/custom/request.type";
import isValidUser from "../utils/verifyUser";

export default async function summary(req: RequestWithUser, res: Response) {
	const {user, name} = req;
	if (user && (await isValidUser(user))) {
	}
}
