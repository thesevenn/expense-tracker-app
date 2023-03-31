import errorResponse from "../utils/errorResponse";
import {Messages, ServerMessages} from "../types/messages/message.type";

describe("Error responses with message", () => {
	describe("given a error type of (fields cannot be empty)", () => {
		it("should return a json object with success as false and message according to error occured", () => {
			expect(
				errorResponse({
					message: Messages.fields_cannot_empty,
					success: false,
				})
			).toMatchObject({
				success: false,
				message: Messages.fields_cannot_empty,
			});
		});
	});

	describe("given a error of server type (Service Unavailable) with qoute", () => {
		it("should return a object with success as false and quote,message", () => {
			expect(
				errorResponse({
					message: ServerMessages.service_unavailable,
					quote: "Servers are down",
				})
			).toMatchObject({
				message: ServerMessages.service_unavailable,
				success: false,
				quote: "Servers are down",
			});
		});
	});
});
