import { faker } from "@faker-js/faker";
import { prisma } from "@/config";
import { InstituteCategory, Category, Institute } from "@prisma/client";

export function createInstituteCategory(category: Category, institute: Institute) {
  const data: CreateInstituteCategory = {
    categoryId: category.id,
    instituteId: institute.id,
  };

  return prisma.instituteCategory.create({
    data,
  });
}

export function createCategory() {
  const data = { name: "Roupas" };
  return prisma.category.create({ data });
}

export function findInstituteCategory(data: InstituteCategory) {
  return prisma.instituteCategory.findUnique({
    where: {
      id: data.id,
    },
  });
}

type CreateInstituteCategory = Omit<InstituteCategory, "id" | "createdAt" | "updatedAt">;
