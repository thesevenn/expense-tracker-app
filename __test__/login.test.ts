import request from "supertest";

import app from "../app";
import {pool} from "../database";

describe("user login at /auth/login", () => {
	afterAll(async () => {
		pool.end();
	});
	describe("given correct email and password", () => {
		it("should respond with status 201: successful", async () => {
			const res = await request(app)
				.post("/api/v1/auth/login")
				.send({email: "test@test.com", password: "pass123"});
			expect(res.status).toBe(201);
		});
	});

	describe("given incorrect email or password", () => {
		it("should responsd with status 401: unauthorized", async () => {
			const res = await request(app)
				.post("/api/v1/auth/login")
				.send({email: "invalid@test.com", password: "wrongpass"});
			expect(res.status).toBe(401);
		});
	});

	describe("given no email or password is provided", () => {
		it("should respond with status 400: bad request", async () => {
			const res = await request(app).post("/api/v1/auth/login").send({});
			expect(res.status).toBe(400);
		});
	});
});
