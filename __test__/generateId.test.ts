import {Varient} from "../types/idvarient.type";
import generateId from "../utils/generateId";

describe("Genrate ids with target user string", () => {
	describe("given a string from user and Varient as tiny", () => {
		it("should return a full varient => unique id", () => {
			console.log(generateId("hello", Varient.full));

			expect(generateId("hello", Varient.full)).toMatch(/[a-zA-Z0-9]{3,100}/);
		});
	});

	describe("given a string from user and Varient as tiny", () => {
		it("should return tiny varient => unique id", () => {
			console.log(generateId("hello", Varient.tiny));

			expect(generateId("hello", Varient.tiny)).toMatch(/[a-zA-Z0-9]{3,100}/);
		});
	});
});
