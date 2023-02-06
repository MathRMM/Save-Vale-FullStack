import app, { init } from "@/app";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import {
  createCategory,
  createInstituteCategory,
  createInstituteFactory,
  createSession,
  createUser,
  findInstituteCategory,
} from "../factories";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /category", () => {
  it("should respond 200", async () => {
    const category = await createCategory();

    const response = await server.get("/api/category");
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([
      expect.objectContaining({
        id: category.id,
        name: category.name,
      }),
    ]);
  });
});

describe("POST /category", () => {
  it("should respond 201 when create InstituteCategory", async () => {
    const category = await createCategory();
    const user = await createUser();
    const token = await generateValidToken(user);
    await createSession(token);
    const institute = await createInstituteFactory(user);
    const body = {
      instituteId: institute.id,
      categoryId: category.id,
    };

    const response = await server
      .post("/api/category")
      .set("Authorization", "Bearer " + token)
      .send(body);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body).toEqual(expect.objectContaining(body));
  });
});

describe("DELETE /category", () => {
  it("Should respond 200 when delete InstituteCategory", async () => {
    const category = await createCategory();
    const user = await createUser();
    const token = await generateValidToken(user);
    await createSession(token);
    const institute = await createInstituteFactory(user);
    const instituteCategory = await createInstituteCategory(category, institute);
    const body = {
      id: instituteCategory.id,
      instituteId: institute.id
    };

    const response = await server
      .delete("/api/category")
      .set("Authorization", "Bearer " + token)
      .send(body);

    expect(response.status).toBe(httpStatus.OK);
    expect(await findInstituteCategory(instituteCategory)).toBeNull();
  });
});
