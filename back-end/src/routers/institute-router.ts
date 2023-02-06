import { Router } from "express";
import { authenticateToken, validateBody } from "@/middleware";
import { instituteSchema } from "@/schemas";
import { 
  deleteInstitute, 
  postInstitute, 
  getInstitute, 
  getManyInstitutes, 
  getManyInstitutesByUser, 
  putInstitute } from "@/controllers";

const enrollRouter = Router();

enrollRouter
  .get("/institute/:instituteId", getInstitute)
  .get("/institute", getManyInstitutes)
  .all("/*", authenticateToken)
  .post("/institute", validateBody(instituteSchema), postInstitute)
  .put("/institute", validateBody(instituteSchema), putInstitute)
  .delete("/institute/:instituteId", deleteInstitute)
  .get("/user/institute", getManyInstitutesByUser);

export { enrollRouter };
