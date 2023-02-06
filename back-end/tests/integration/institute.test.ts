import app, { init } from "@/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { 
  createUser, 
  createSession, 
  createInstituteFactory, 
  fakeInstitute, 
  findInstituteFactory } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";
import { exclude } from "@/utils/prisma-utils";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /enroll/institute", () => {
  it("should  respond with status 401 if no token is given", async () => {
    const response = await server.post("/api/enroll/institute");
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/api/enroll/institute").set("Authorization", "Bearer " + token);
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should respond with status 401 if given token is not valid", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const response = await server.post("/api/enroll/institute").set("Authorization", "Bearer " + token);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });
  describe("When token is valid", () => {
    it("should respond with 400 when body is not present", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createSession(token);

      const response = await server
        .post("/api/enroll/institute")
        .set("Authorization", "Bearer " + token)
        .send({});

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with 400 when body is not valid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createSession(token);
      const enroll = fakeInstitute();
      delete enroll.name;

      const response = await server
        .post("/api/enroll/institute")
        .set("Authorization", "Bearer " + token)
        .send(enroll);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 200", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createSession(token);
      const enroll = fakeInstitute();

      const response = await server
        .post("/api/enroll/institute")
        .set("Authorization", "Bearer " + token)
        .send(enroll);

      //console.log(response.body);

      expect(response.status).toBe(httpStatus.CREATED);
    });
  });
});

describe("PUT /enroll/institute", () => {
  it("should respond with 200", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createSession(token);
    const enroll = await createInstituteFactory(user);
    enroll.name = faker.name.fullName();
    const sendEnroll = exclude(enroll, "userId", "updatedAt", "createdAt");

    const response = await server
      .put("/api/enroll/institute")
      .set("Authorization", "Bearer " + token)
      .send(sendEnroll);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: enroll.id,
        userId: user.id,
        name: enroll.name,
        withdraw: enroll.withdraw,
        description: enroll.description,
        image: enroll.image,
      }),
    );
  });
});

describe("DELETE /enroll/institute", () => {
  it("should respond with 200", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createSession(token);
    const enroll = await createInstituteFactory(user);

    const response = await server.delete(`/api/enroll/institute/${enroll.id}`).set("Authorization", "Bearer " + token);

    const find = await findInstituteFactory(enroll);

    expect(response.status).toBe(httpStatus.OK);
    expect(find).toBeNull();
  });
});
