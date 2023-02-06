import { Response } from "express";
import { AuthenticatedRequest } from "@/middleware";
import { addressService } from "@/services";
import httpStatus from "http-status";

export async function postAddress(req: AuthenticatedRequest, res: Response) {
  const { userId, body } = req;
  body.userId = userId;

  try {
    const result = await addressService.postAddress({ address: body, userId });
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send({ message: error.message });
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function updateAddress(req: AuthenticatedRequest, res: Response) {
  const { userId, body } = req;
  body.userId = userId;

  try {
    const result = await addressService.postAddress(body);
    return res.send(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send({ message: error.message });
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getAddressFromCEP(req: AuthenticatedRequest, res: Response) {
  const { cep } = req.query as Record<string, string>;

  try {
    const result = await addressService.getAddressFromCEP(cep);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "cannotAddressError") {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function findAddressByUserId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const result = await addressService.findAddressByUserId(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send({ message: error.message });
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
