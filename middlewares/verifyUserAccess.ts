import {Response, NextFunction} from "express";

import RequestWithUser from "../types/custom/request.type";
import verifyJwtToken from "../utils/jwt/verifyJwtToken";
import {Token} from "../types/utils/token.type";
import {Messages, ServerMessages} from "../types/messages/message.type";

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
				message: Messages.not_authenticated,
			});
		} else if (accessToken) {
			const {user, invalid, expired, name} = verifyJwtToken(
				accessToken,
				Token.access
			);
			if (user && name && !invalid && !expired) {
				req.user = user;
				req.name = name;
				next();
			} else if (invalid || expired) {
				res.status(401).json({
					success: false,
					auth: false,
					message: Messages.token_expired,
				});
			}
		}
	} catch (error) {
		if (error instanceof Error && error.name == "JsonWebTokenError") {
			res.status(401).json({
				success: false,
				auth: false,
				message: Messages.token_expired,
			});
		} else {
			res.status(503).json({
				success: false,
				auth: false,
				message: ServerMessages.service_unavailable,
			});
		}
	}
}
