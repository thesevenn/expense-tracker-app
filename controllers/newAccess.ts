import {Request, Response} from "express";

import verifyResfreshTokenReturnUser from "../utils/jwt/verifyJwtReturnUser";
import signJwtToken from "../utils/jwt/signJwtToken";
import {Token} from "../types/utils/token.type";
import {durations} from "../types/utils/durations.type";

export default function newAccess(req: Request, res: Response) {
	const {refreshToken} = req.cookies;
	try {
		if (!refreshToken) {
			res.status(400).json({
				success: false,
				message: "token required",
			});
		}
		const user: string = verifyResfreshTokenReturnUser(refreshToken);
		if (user) {
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
