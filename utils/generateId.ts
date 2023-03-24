import crypto from "crypto";

export default function generateId(target: string): string {
	const time: string = String(Date.now());
	const specs = ["xc", "tr", "aq", "fz", "nj"];
	return `
		${
			specs[Math.floor(Math.random() * specs.length)] +
			time.substring(0, time.length / 2)
		}-${target.substring(0, 2) + time.substring(time.length / 2 + 1)}-${crypto
		.randomBytes(4)
		.toString("hex")}
		`;
}
