import request from "supertest";

import app from "../app";
import {pool} from "../database";

describe("user login at /auth/login", () => {
	afterEach(async () => {
		pool.end();
	});
	describe("given correct email and password", () => {
		it("should respond with status 201", async () => {
			const res = await request(app)
				.post("/api/v1/auth/login")
				.send({email: "test@test.com", password: "pass123"});
			expect(res.status).toBe(201);
		});
	});
});
