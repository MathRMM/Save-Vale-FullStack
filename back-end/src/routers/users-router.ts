import { Router } from "express";

import { createUserSchema } from "@/schemas";
import { validateBody } from "@/middleware";
import { usersPost } from "@/controllers";

const usersRouter = Router();

usersRouter.post("/", validateBody(createUserSchema), usersPost);

export { usersRouter };
