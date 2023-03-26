import jwt, {JwtPayload} from "jsonwebtoken";

import {env} from "../../constants/_env";
import Decoded from "../../types/utils/decoded.type";
import {Token} from "../../types/utils/token.type";

function verifyRefreshTokenReturnUser(token: string): string {
	if (env.REFRESH_SECRET) {
		const payload = jwt.verify(token, env.REFRESH_SECRET);
		if (payload instanceof Object) {
			return payload.active;
		}
	}
	return "";
}

export default function verifyJwtToken(
	token: string,
	type: Token = Token.access
): Decoded {
	const secret: string | undefined =
		type == "access" ? env.ACCESS_SECRET : env.REFRESH_SECRET;
	const decoded: Decoded = {
		invalid: true,
		expired: true,
		user: null,
		error: null,
	};
	try {
		if (secret) {
			const verifiedPayload: string | JwtPayload = jwt.verify(token, secret);
			if (verifiedPayload instanceof Object && verifiedPayload.active) {
				decoded.user = verifiedPayload.active;
				decoded.expired = false;
				decoded.invalid = false;
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			decoded.error = error.name;
		}
	}

	return decoded;
}
