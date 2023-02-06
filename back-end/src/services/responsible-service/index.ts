import { notFoundError, unauthorizedError } from "@/errors";
import { responsibleRepository, ResponsibleDelete, ResponsibleUpsertParams } from "@/repositories";

async function findResponsible(id: number) {
  return await responsibleRepository.find(id);
}

async function upsertResponsible(data: ResponsibleUpsertParams) {
  return await responsibleRepository.upsert(data);
}

async function deleteResponsible(data: ResponsibleDelete) {
  const responsible = await findResponsible(data.responsibleId);
  if (!responsible) throw notFoundError();
  if (data.userId !== responsible.Institute.userId) {
    throw unauthorizedError();
  }

  return await responsibleRepository.remove(data.responsibleId);
}

const responsibleService = {
  upsertResponsible,
  deleteResponsible,
  findResponsible,
};

export { responsibleService };
