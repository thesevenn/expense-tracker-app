import request from "supertest";

import app from "../app";

describe("handler for summary at: /user/summary", () => {
	describe("given an unauthenticated user", () => {
		it("should respond with 401 - unauothorized", async () => {
			const response = await request(app).get("/api/v1/users/summary");
			expect(response.status).toBe(401);
		});
	});
});
