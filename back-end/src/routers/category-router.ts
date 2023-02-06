import { Router } from "express";
import { authenticateToken, validateBody } from "@/middleware";
import { getCategories, deleteInstituteCategory, postInstituteCategory } from "@/controllers";

const categoryRouter = Router();

categoryRouter
  .get("/", getCategories)
  .all("/*", authenticateToken)
  .post("/", postInstituteCategory)
  .delete("/", deleteInstituteCategory);

export { categoryRouter };
