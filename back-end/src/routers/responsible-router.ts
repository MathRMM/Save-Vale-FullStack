import { Router } from "express";
import { authenticateToken, validateBody } from "@/middleware";
import { responsibleSchema } from "@/schemas";
import { deleteResponsible, postResponsible } from "@/controllers";

const responsibleRouter = Router();

responsibleRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(responsibleSchema), postResponsible)
  .delete("/:responsibleId", deleteResponsible);

export { responsibleRouter };
