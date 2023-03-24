import {Request, Response} from "express";
export default function logout(req: Request, res: Response) {
	try {
		res
			.clearCookie("accessToken")
			.clearCookie("refreshToken")
			.clearCookie("user")
			.json({
				success: true,
				message: "user logged out",
			});
	} catch (error) {
		if (error instanceof Error) {
			res.status(503).json({
				success: false,
				message: "An error occured on our side, try again later.",
			});
		}
	}
}
