import { Request, Response } from "express";
import { AuthenticatedRequest } from "@/middleware";
import httpStatus from "http-status";
import { instituteService } from "@/services";

export async function postInstitute(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const body = { ...req.body, userId };

  try {
    const result = await instituteService.createInstitute(body);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getInstitute(req: Request, res: Response) {
  const instituteId = Number(req.params.instituteId);
  if (isNaN(instituteId)) return res.sendStatus(400);

  try {
    const result = await instituteService.findInstitute(instituteId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getManyInstitutes(req: Request, res: Response) {
  const locale = String(req.query.city);

  try {
    const result = await instituteService.findManyInstitutes(locale);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getManyInstitutesByUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const result = await instituteService.findManyInstitutesByUser(userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send({ message: error.message });
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function putInstitute(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const body = req.body;

  try {
    const result = await instituteService.updateInstitute(body, userId);
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

export async function deleteInstitute(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const instituteId = Number(req.params.instituteId);
  if (isNaN(instituteId)) return res.sendStatus(400);

  const body = { userId, instituteId };

  try {
    const result = await instituteService.deleteInstitute(body);
    return res.status(httpStatus.OK).send({});
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send({ message: error.message });
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
