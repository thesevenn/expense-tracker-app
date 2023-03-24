import jwt from "jsonwebtoken";

import {env} from "../../constants/_env";

export default function verifyTokenReturnUser(token: string): string {
	if (env.REFRESH_SECRET) {
		const payload = jwt.verify(token, env.REFRESH_SECRET);
		if (payload instanceof Object) {
			return payload.active;
		}
	}
	return "";
}
