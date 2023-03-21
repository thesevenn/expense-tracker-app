import {sanitize} from "../utils/validations/sanitize";

describe("sanitization test for inputs", () => {
	describe("given a input string", () => {
		it("should return sanitized output", () => {
			expect(sanitize("hello ")).toBe(" hello ".trim());
		});
	});

	describe("given no input string is provided or undefined", () => {
		it("should return undefined", () => {
			expect(sanitize("")).toBe("");
		});
	});
});
