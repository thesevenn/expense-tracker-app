import jwt from "jsonwebtoken";

import {env} from "../../constants/_env";
import {Token} from "../../types/utils/token.type";
import {durations} from "../../types/utils/durations.type";
import Payload from "../../types/utils/payload.type";

interface options {
	type: Token;
	expiresIn: string;
}

export default function signJwtToken(
	id: string,
	{type, expiresIn = durations.short}: options
): string | boolean {
	const secret = type == "access" ? env.ACCESS_SECRET : env.REFRESH_SECRET;
	if (secret) {
		const payload: Payload = {
			active: id,
			iat: Date.now() / 1000,
		};
		const webToken = jwt.sign(payload, secret, {expiresIn: expiresIn});
		return webToken;
	} else {
		return false;
	}
}
