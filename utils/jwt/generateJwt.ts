import jwt from "jsonwebtoken";

interface Payload {
	active: string;
	iat: number;
}

export default function generateJwt(
	id: string,
	secret: string = "zyNfmToxd03"
): string {
	if (!secret) {
		return "";
	}
	const payload: Payload = {
		active: id,
		iat: Date.now() / 1000,
	};
	const webToken = jwt.sign(payload, secret, {expiresIn: "30min"});
	return webToken;
}
