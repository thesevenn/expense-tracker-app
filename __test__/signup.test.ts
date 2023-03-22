import reqeust from "supertest";
import app from "../app";

describe("sign up of new user", () => {
	describe("given no email or password is provided", () => {
		it("should send status code of 400: bad request", async () => {
			const res = await reqeust(app).post("/api/v1/auth/sign-up");
			expect(res.status).toBe(400);
		});
	});
	describe("given valid email and password is provided", () => {
		it("should send status code of 200: success", async () => {
			const res = await reqeust(app)
				.post("/api/v1/auth/sign-up")
				.send({email: "test@test.com", password: "pass123"});
			expect(res.status).toBe(200);
		});
	});
	describe("given a valid email already in use is provided", () => {
		it("should send status code of 400: bad request", async () => {
			const res = await reqeust(app)
				.post("/api/v1/auth/sign-up")
				.send({email: "test1@test.com", password: "pass123"});
			expect(res.status).toBe(400);
		});
	});
});
