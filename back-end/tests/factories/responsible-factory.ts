import { faker } from "@faker-js/faker";
import { prisma } from "@/config";
import { Institute, Responsible } from "@prisma/client";

export function createResponsible(institute: Institute) {
  const data = fakeResponsible(institute);

  return prisma.responsible.create({
    data,
  });
}

export function fakeResponsible(institute: Institute) {
  return {
    name: faker.name.fullName(),
    phone: faker.phone.number(),
    instituteId: institute.id,
  };
}

export function findResponsible(data: Responsible) {
  return prisma.responsible.findUnique({
    where: {
      id: data.id,
    },
  });
}
