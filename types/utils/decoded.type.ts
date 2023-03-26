export default interface Decoded {
	expired: boolean;
	invalid: boolean;
	user: string | null;
	name: string | null;
	error: Error["name"] | null;
}
