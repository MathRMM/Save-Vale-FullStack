import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middleware";
import httpStatus from "http-status";
import { responsibleService } from "@/services";

export async function postResponsible(req: AuthenticatedRequest, res: Response) {
  const { body } = req;

  try {
    const result = await responsibleService.upsertResponsible(body);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    console.log(error);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function deleteResponsible(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const responsibleId = Number(req.params.responsibleId);
  if(isNaN(responsibleId)) res.sendStatus(httpStatus.BAD_REQUEST);
  
  try {
    const result = await responsibleService.deleteResponsible({
      userId, responsibleId
    });
    return res.status(httpStatus.OK).send({});
  } catch (error) {
    console.log(error);
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
    }
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send({ message: error.message });
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
