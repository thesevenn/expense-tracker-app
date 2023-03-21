import reqeust from "supertest";
import app from "../app";

describe("sign up of new user", () => {
	describe("given no email or password is provided", () => {
		it("should send status code of 400: bad request", async () => {
			const res = await reqeust(app).post("/api/v1/auth/signup");
			expect(res.status).toBe(400);
		});
	});
});
