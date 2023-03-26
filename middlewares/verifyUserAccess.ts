import {Response, NextFunction} from "express";

import RequestWithUser from "../types/custom/request.type";
import verifyJwtToken from "../utils/jwt/verifyJwtToken";
import {Token} from "../types/utils/token.type";

export default async function isAuthenticated(
	req: RequestWithUser,
	res: Response,
	next: NextFunction
): Promise<void> {
	const {accessToken} = req.cookies;
	try {
		if (!accessToken) {
			res.status(401).json({
				success: false,
				auth: false,
				message: "Not Authorized",
			});
		} else if (accessToken) {
			const {user, invalid, expired} = verifyJwtToken(
				accessToken,
				Token.access
			);
			if (user && !invalid && !expired) {
				req.user = user;
				res.send("ok");
				next();
			} else if (invalid || expired) {
				res.status(401).json({
					success: false,
					auth: false,
					message: "Token is not valid or expired",
				});
			}
		}
	} catch (error) {
		if (error instanceof Error && error.name == "JsonWebTokenError") {
			res.status(401).json({
				success: false,
				auth: false,
				message: "Invalid Credentials",
			});
		} else {
			res.status(503).json({
				success: false,
				auth: false,
				message: "An error occured on our side, try again later.",
			});
		}
	}
}
