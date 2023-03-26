import {Request, Response} from "express";

import verifyJwtToken from "../utils/jwt/verifyJwtReturnUser";
import signJwtToken from "../utils/jwt/signJwtToken";
import {Token} from "../types/utils/token.type";
import {durations} from "../types/utils/durations.type";
import Decoded from "../types/utils/decoded.type";

export default function newAccess(req: Request, res: Response) {
	const {refreshToken} = req.cookies;
	try {
		if (!refreshToken) {
			res.status(400).json({
				success: false,
				message: "token required",
			});
		}
		const {user, expired, invalid} = verifyJwtToken(refreshToken);
		if (user && !expired && !invalid) {
			const accessToken = signJwtToken(user, {
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
					message: "access provided",
				});
		}
	} catch (error) {
		if (error instanceof Error) {
			if (error.name == "JsonWebTokenError") {
				res.status(401).clearCookie("refreshToken").json({
					success: false,
					auth: false,
					message: "refresh token is invalid",
				});
			} else {
				res.status(503).json({
					success: false,
					message: "An error occured on our side, try again later.",
				});
			}
		}
	}
}
