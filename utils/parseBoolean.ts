export default function parseBoolean(target: string | number): boolean {
	let boolean: boolean = false;
	if (
		target &&
		target != 0 &&
		target != undefined &&
		target != null &&
		target != "" &&
		target != "false"
	) {
		boolean = true;
	}
	return boolean;
}
