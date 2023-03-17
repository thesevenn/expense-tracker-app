import {env} from "../constants/_env";

describe("start of test for app", () => {
	it("should return a PORT number", () => {
		expect(env.PORT).not.toBeUndefined();
	});
});
