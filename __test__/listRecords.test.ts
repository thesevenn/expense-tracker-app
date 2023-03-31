import request from "supertest";

import app from "../app";

describe("handler for records listing at - /user/records", () => {
	describe("given an unauthenticated user", () => {
		it("should respond with status code 401 - unauothorized", async () => {
			const response = await request(app).get("/api/v1/users/records");
			expect(response.status).toBe(401);
		});
	});
});
