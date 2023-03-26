import verifyJwtToken from "../utils/jwt/verifyJwtToken";
import Decoded from "../types/utils/decoded.type";

describe("Jwt Token verification and return of appropriate Object", () => {
	describe("given a valid JWT token", () => {
		it("should return a decoded object with valid user and other parameters as false", () => {
			const validDecoded: Decoded = {
				expired: false,
				invalid: false,
				user: "valid user",
				error: null,
			};
			expect(verifyJwtToken("valid token"));
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
			expect(verifyJwtToken("invalid token")).toEqual(
				expect.objectContaining(invalidDecoded)
			);
		});
	});
});
