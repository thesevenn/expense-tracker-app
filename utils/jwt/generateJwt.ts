import jwt from "jsonwebtoken";

import {env} from "../../constants/_env";
import {Type} from "../../types/token.type";

interface Payload {
	active: string;
	iat: number;
}

interface options {
	type: Type;
	expiresIn: string;
}

export default function generateJwt(
	id: string,
	{type, expiresIn = "30min"}: options
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
