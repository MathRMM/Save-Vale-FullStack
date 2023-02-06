import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB, prisma } from "@/config";
loadEnv();

import {
  usersRouter,
  authenticationRouter,
  enrollRouter,
  responsibleRouter,
  categoryRouter,
  addressRouter,
} from "@/routers";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", async (_req, res) => {
    try {
      await prisma.user.findMany();
      res.send("ok!");
    } catch {
      res.send("off");
    }
  })
  .use("/api/users", usersRouter)
  .use("/api/auth", authenticationRouter)
  .use("/api/enroll", enrollRouter)
  .use("/api/category", categoryRouter)
  .use("/api/responsible", responsibleRouter)
  .use("/api/address", addressRouter);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
