import { notFoundError, unauthorizedError } from "@/errors";
import {
  categoryRepository,
  InstituteCategoryParams,
  InstituteCategoryDelete,
  instituteRepository,
} from "@/repositories";

async function findCategory() {
  return await categoryRepository.findMany();
}

async function createInstituteCategory(data: CreateInstituteCategory) {
  const institute = await instituteRepository.find(data.instituteId);
  if (!institute) throw notFoundError();
  if (institute.userId !== data.userId) {
    throw unauthorizedError();
  }
  delete data.userId;
  return await categoryRepository.createInstituteCategory(data);
}

async function deleteInstituteCategory(data: InstituteCategoryDelete) {
  const institute = await instituteRepository.find(data.instituteId);
  const category = await categoryRepository.find(data.id);
  if (!institute || !category) throw notFoundError();

  if (institute.userId !== data.userId) {
    throw unauthorizedError();
  }

  return await categoryRepository.deleteInstituteCategory(data.id);
}

export type CreateInstituteCategory = InstituteCategoryParams & { userId: number };

const categoryService = {
  findCategory,
  createInstituteCategory,
  deleteInstituteCategory,
};

export { categoryService };
