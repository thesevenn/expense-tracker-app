import jwt from "jsonwebtoken";

import {env} from "../../constants/_env";

/* 
sign with => secret + payload + algo-header

payload expire with 30min, user - id, date curr,
{
    active - "",
    activated - Date.now()

    1679512039869
    1679512039
}
*/

interface Payload {
	active: string;
	iat: number;
}

export default function generateJwt(id: string): string {
	const payload: Payload = {
		active: id,
		iat: Date.now() / 1000,
	};
	const secret: string = env.JWTSECRET || "fehre/fej234dsf''e23-=";
	const webToken = jwt.sign(payload, secret, {expiresIn: "30min"});
	return webToken;
}
