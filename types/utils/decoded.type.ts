export default interface Decoded {
	expired: boolean;
	invalid: boolean;
	user: string | null;
	error: Error["name"] | null;
}
