import jwt, {JwtPayload} from "jsonwebtoken";

import {env} from "../../constants/_env";
import Decoded from "../../types/utils/decoded.type";
import {Token} from "../../types/utils/token.type";

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
		name: null,
		error: null,
	};
	try {
		if (secret) {
			const verifiedPayload: string | JwtPayload = jwt.verify(token, secret);
			if (verifiedPayload instanceof Object && verifiedPayload.active) {
				decoded.user = verifiedPayload.active;
				decoded.name = verifiedPayload.name;
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
