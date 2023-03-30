import errorResponse from "../utils/errorResponse";
import {Messages40_} from "../types/errors/message.type";

describe("Error responses with message", () => {
	describe("given a error type of fields cannot be empty", () => {
		it("should return a json object with success as false and message according to error occured", () => {
			expect(
				errorResponse({
					message: Messages40_.fields_cannot_empty,
					success: false,
				})
			).toMatchObject({
				success: false,
				message: Messages40_.fields_cannot_empty,
			});
		});
	});
});
