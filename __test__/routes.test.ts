import request from "supertest";

import app from "../app";

describe("Check For Routes in auth", () => {
	it("should have status code 200", async () => {
		const res = await request(app).get("/v1/");
		expect(res.statusCode).toBe(404);
	});
	it("sould return content type as text/html", async () => {
		const res = await request(app).get("/v1/");
		expect(res.header["content-type"]).toContain("text/html");
	});
});
