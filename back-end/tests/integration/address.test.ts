import app, { init } from "@/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import { addressFactory, createInstituteFactory, createSession, createUser } from "../factories";
import { prisma } from "@/config";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /api/address/cep", () => {
  it("should respond 403 when ddd is not allowed", async () => {
    const CEP = 13566590;

    const response = await server.get("/api/address/cep").query({ cep: CEP });
    expect(response.status).toBe(httpStatus.FORBIDDEN);
  });

  it("should respond 200 when ddd is not allowed", async () => {
    const CEP = 12308052;
    const ddd = 12;
    await addressFactory.createDDD(ddd);

    const response = await server.get("/api/address/cep").query({ cep: CEP });
    expect(response.status).toBe(httpStatus.OK);
  });
});

describe("POST /api/address/", () => {
  it("should respond 200 when create Address", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createSession(token);
    const institute = await createInstituteFactory(user);
    const address = await addressFactory.fakeAddress(institute);

    const response = await server
      .post("/api/address")
      .set("Authorization", "Bearer " + token)
      .send(address);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(expect.objectContaining({ street: address.street }));
  });
});
