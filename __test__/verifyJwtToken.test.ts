import {verifyJwtToken} from "../utils/jwt/verifyJwtReturnUser";
import Decoded from "../types/utils/decoded.type";

describe("Jwt Token verification and return of appropriate Object", () => {
	describe("given a valid JWT token", () => {
		it("should return a decoded object with valid user and other parameters as false", () => {
			const validDecoded: Decoded = {
				expired: false,
				invalid: false,
				user: "sdfsd",
				error: null,
			};
			expect(verifyJwtToken("erefeerr3f")).toEqual(validDecoded);
		});
	});
	describe("given an invalid JWT token", () => {
		it("should return a decoded object with null as user and other parameters as true", () => {
			const invalidDecoded: Decoded = {
				expired: true,
				invalid: true,
				user: null,
				error: "JsonWebTokenError",
			};
			expect(verifyJwtToken("fjjeirjre")).toEqual(invalidDecoded);
		});
	});
});
