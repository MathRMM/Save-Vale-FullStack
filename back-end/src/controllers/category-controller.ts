import { AuthenticatedRequest } from "@/middleware";
import { categoryService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getCategories(req: Request, res: Response) {
  try {
    const result = await categoryService.findCategory();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postInstituteCategory(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const body = req.body;
  body.userId = userId;

  try {
    const result = await categoryService.createInstituteCategory(body);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send({ message: error.message });
    }
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
    }
    console.log(error);

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteInstituteCategory(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const body = req.body;
  body.userId = userId; 

  try {
    const result = await categoryService.deleteInstituteCategory(body);
    return res.status(httpStatus.OK).send({ message: "DELETED" });
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
