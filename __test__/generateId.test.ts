import generateId from "../utils/generateId";

describe("Genrate ids with target user string", () => {
	describe("given a string from user", () => {
		it("should return a unique id string", () => {
			expect(generateId("hello")).toMatch(/[a-zA-Z0-9]{3,100}/);
		});
	});
});
