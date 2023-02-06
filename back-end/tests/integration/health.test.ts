import app, { init } from "@/app";
import supertest from "supertest";
import httpStatus from "http-status";

beforeAll(async () => {
  await init();
});

const server = supertest(app);

describe("POST /health", () => {
  it("should respond with status 200", async () => {
    const response = await server.get("/health");

    expect(response.status).toBe(httpStatus.OK);
  });
});
