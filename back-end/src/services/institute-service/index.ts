import { unauthorizedError, notFoundError } from "@/errors";
import { 
  instituteRepository, 
  InstituteParams, 
  InstituteUpdateParams, 
  InstituteDelete 
} from "@/repositories";

async function createInstitute(data: InstituteParams) {
  return await instituteRepository.create(data);
}

async function findInstitute(id: number) {
  const result = await instituteRepository.find(id);
  if (!result) {
    throw notFoundError();
  }

  return result;
}

async function findManyInstitutes(locale?: string) {
  let result;
  if (locale !== "undefined") {
    result = await instituteRepository.findManyByLocale(locale);
  } else {
    result = await instituteRepository.findMany();
  }
  if (!result[0]) {
    throw notFoundError();
  }

  return result;
}

async function findManyInstitutesByUser(userId: number) {
  return await instituteRepository.findManyByUser(userId);
}

async function updateInstitute(data: InstituteUpdateParams, userId: number) {
  const institute = await findInstitute(data.id);
  if(!institute) throw notFoundError();
  if(institute.userId !== userId) throw unauthorizedError();

  return await instituteRepository.update(data);
}

async function deleteInstitute(data: InstituteDelete) {
  const institute = await instituteRepository.find(data.instituteId);

  if (institute.userId !== data.userId) {
    throw unauthorizedError();
  }

  return await instituteRepository.remove(data.instituteId);
}

export const instituteService = {
  createInstitute,
  updateInstitute,
  deleteInstitute,
  findInstitute,
  findManyInstitutes,
  findManyInstitutesByUser,
};
