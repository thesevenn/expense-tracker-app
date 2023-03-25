import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

import verifyTokenReturnUser from "../utils/jwt/verifyJwtReturnUser";
import {env} from "../constants/_env";
import RequestWithUser from "../types/request.type";

export default async function isAuthenticated(
	req: RequestWithUser,
	res: Response,
	next: NextFunction
): Promise<void> {
	const {accessToken} = req.cookies;
	try {
		if (!accessToken) {
			res.send("not found");
		} else if (accessToken) {
			if (env.ACCESS_SECRET) {
				const verify = jwt.verify(accessToken, env.ACCESS_SECRET);
				if (verify instanceof Object && verify.active) {
					req.user = verify.active;
				}
				res.send("ok");
			}
		}
		console.log(accessToken);
		next();
	} catch (error) {}
}
