import { Router } from "express";
import { authenticateToken, validateBody } from "@/middleware";
import { getAddressFromCEP, postAddress, findAddressByUserId } from "@/controllers";
import { addressSchema } from "@/schemas";

const addressRouter = Router();

addressRouter
  .get("/cep", getAddressFromCEP)
  .get("/", authenticateToken, findAddressByUserId)
  .post("/", authenticateToken, validateBody(addressSchema), postAddress);

export { addressRouter };
