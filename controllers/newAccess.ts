import {Request, Response} from "express";

import verifyJwtToken from "../utils/jwt/verifyJwtToken";
import signJwtToken from "../utils/jwt/signJwtToken";
import {Token} from "../types/utils/token.type";
import {durations} from "../types/utils/durations.type";
import responseMessage from "../utils/errorResponse";
import {Messages, ServerMessages} from "../types/messages/message.type";

export default function newAccess(req: Request, res: Response) {
	const {refreshToken} = req.cookies;
	try {
		if (!refreshToken) {
			res.status(400).json(responseMessage({message: Messages.token_required}));
		}
		const {user, name, expired, invalid} = verifyJwtToken(
			refreshToken,
			Token.refresh
		);
		if (user && name && !expired && !invalid) {
			const accessToken = signJwtToken(user, name, {
				type: Token.access,
				expiresIn: durations.short,
			});
			res
				.status(200)
				.cookie("accessToken", accessToken, {
					httpOnly: true,
					maxAge: 1800000,
				})
				.json({
					success: true,
					message: Messages.access_granted,
				});
		} else {
			res.status(401).clearCookie("refreshToken").json({
				success: false,
				auth: false,
				message: Messages.token_expired,
			});
		}
	} catch (error) {
		console.log(error instanceof Error);
		if (error instanceof Error) {
			if (error.name == "JsonWebTokenError") {
				res.status(401).clearCookie("refreshToken").json({
					success: false,
					auth: false,
					message: Messages.token_expired,
				});
			} else {
				res
					.status(503)
					.json(responseMessage({message: ServerMessages.service_unavailable}));
			}
		}
	}
}
