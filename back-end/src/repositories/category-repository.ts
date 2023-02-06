import { prisma } from "@/config";
import { InstituteCategory } from "@prisma/client";

async function findMany() {
  return prisma.category.findMany();
}

async function createInstituteCategory(data: InstituteCategoryParams) {
  return prisma.instituteCategory.create({
    data,
  });
}

async function deleteInstituteCategory(id: number) {
  return prisma.instituteCategory.delete({
    where: { id },
  });
}

async function find(id: number) {
  const where = { id };
  return prisma.instituteCategory.findUnique({ where });
}

const categoryRepository = {
  findMany,
  createInstituteCategory,
  deleteInstituteCategory,
  find
};

export { categoryRepository };

export type InstituteCategoryParams = Omit<InstituteCategory, "id" | "createdAt" | "updatedAt">;

export type InstituteCategoryDelete = {
  id: number;
  userId: number;
  instituteId: number
};
