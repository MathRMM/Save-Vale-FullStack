import app, { init } from "@/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import { createInstituteFactory, createResponsible, createSession, createUser, fakeResponsible } from "../factories";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /responsible", () => {
  it("should respond 200 when create Responsible", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createSession(token);
    const institute = await createInstituteFactory(user);
    const responsible = fakeResponsible(institute);

    const response = await server
      .post("/api/responsible")
      .set("Authorization", "Bearer " + token)
      .send(responsible);

    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(expect.objectContaining(responsible));
  });
});

describe("DELETE /responsible", () => {
  it("should respond 200 when delete Responsible", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createSession(token);
    const institute = await createInstituteFactory(user);
    const responsible = await createResponsible(institute);

    const response = await server
      .delete(`/api/responsible/${responsible.id}`)
      .set("Authorization", "Bearer " + token);

    expect(response.status).toBe(httpStatus.OK);
  });
});
