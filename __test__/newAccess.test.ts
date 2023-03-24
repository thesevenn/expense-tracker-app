import request from "supertest";

import app from "../app";
import {pool} from "../database";

describe("new access token with refresh token", () => {
	afterAll(() => {
		pool.end();
	});
	describe("given no refresh token", () => {
		it("should respond with no cookies, and status code 400 : bad request", async () => {
			const res = await request(app).get("/api/v1/auth/new-access");
			expect(res.headers["set-cookies"]).toBeUndefined();
			expect(res.status).toBe(400);
		});
	});
});
