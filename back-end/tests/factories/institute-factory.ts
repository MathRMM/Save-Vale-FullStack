import { faker } from "@faker-js/faker";
import { prisma } from "@/config";
import { Institute, User } from "@prisma/client";

export async function createInstituteFactory(user: User) {
  const params = fakeInstitute();
  const userId = user.id;
  const data = { userId, ...params };

  return prisma.institute.create({ data });
}

export function fakeInstitute() {
  return {
    name: faker.name.fullName(),
    withdraw: faker.datatype.boolean(),
    description: faker.lorem.paragraph(),
    image: faker.internet.url(),
  };
}

export async function findInstituteFactory(enroll: Institute) {
  return prisma.institute.findUnique({
    where: { id: enroll.id },
  });
}
