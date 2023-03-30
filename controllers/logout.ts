import {Request, Response} from "express";

import responseMessage from "../utils/errorResponse";
import {Messages, ServerMessages} from "../types/messages/message.type";

export default function logout(req: Request, res: Response) {
	try {
		res
			.clearCookie("accessToken")
			.clearCookie("refreshToken")
			.clearCookie("user")
			.json(responseMessage({message: Messages.logout_success, success: true}));
	} catch (error) {
		if (error instanceof Error) {
			res
				.status(503)
				.json(responseMessage({message: ServerMessages.service_unavailable}));
		}
	}
}
