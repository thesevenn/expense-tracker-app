import crypto from "crypto";

import {Varient} from "../types/utils/idvarient.type";

export default function generateId(target: string, varient: Varient): string {
	const time: string = String(Date.now());
	const specs = ["xc", "tr", "aq", "fz", "nj", "en"];
	if (varient == Varient.full) {
		return `
		${
			specs[Math.floor(Math.random() * specs.length)] +
			time.substring(0, time.length / 2)
		}-${target.substring(0, 2) + time.substring(time.length / 2 + 1)}-${crypto
			.randomBytes(4)
			.toString("hex")}
		`;
	} else {
		return `
		${specs[Math.floor(Math.random() * specs.length)] + time.substring(0, 5)}-${
			target.substring(0, 2) + time.substring(time.length / 2 + 2)
		}
		`;
	}
}

// tiny => [en]34892x-e14489[tr]
// full => [en]192303-[ej]892831-[rt]139041
