import crypto from "crypto";

export default function generateId(target: string): string {
	return (
		Date.now() + target.substring(0, 4) + crypto.randomBytes(5).toString("hex")
	);
}
