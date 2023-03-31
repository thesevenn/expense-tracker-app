import parseBoolean from "../utils/parseBoolean";

describe("a function to parse string, numbers to boolean value", () => {
	describe("given a non empty string or number", () => {
		it("should return true", () => {
			expect(parseBoolean("non empty string")).toBeTruthy;
			expect(parseBoolean(12)).toBeTruthy;
		});
	});

	describe("given a empty string or number 0,or 'false'", () => {
		it("should return false", () => {
			expect(parseBoolean("")).toBeFalsy;
			expect(parseBoolean(0)).toBeFalsy;
			expect(parseBoolean("false")).toBeFalsy;
		});
	});
});
