import { prisma } from "@/config";
import { Prisma, Institute, User } from "@prisma/client";

function create(data: InstituteParams) {
  return prisma.institute.create({ data });
}

function update(data: InstituteUpdateParams) {
  return prisma.institute.update({
    data,
    where: {
      id: data.id,
    },
  });
}

function remove(id: number) {
  const where = { id };
  return prisma.institute.delete({ where });
}

function find(id: number) {
  const where = { id };
  return prisma.institute.findUnique({
    where,
    include: {
      Address: {
        include: {
          City: {
            select: {
              name: true,
              State: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      Responsible: true,
      InstituteCategory: {
        include: {
          Category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

function findMany() {
  return prisma.institute.findMany({
    include: {
      Address: {
        include: {
          City: {
            select: {
              name: true,
              State: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      Responsible: true,
      InstituteCategory: {
        select: {
          Category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

function findManyByUser(userId: number) {
  const where = { id: userId };
  return prisma.institute.findFirst({ where });
}

function findManyByLocale(locale: string) {
  return prisma.institute.findMany({
    where: {
      Address: {
        every: {
          City: {
            name: locale,
          },
        },
      },
    },
    include: {
      Responsible: true,
      Address: true,
      InstituteCategory: {
        select: {
          Category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

export const instituteRepository = {
  create,
  remove,
  update,
  find,
  findMany,
  findManyByUser,
  findManyByLocale,
};

export type InstituteParams = Omit<Institute, "id" | "createdAt" | "updatedAt">;
export type InstituteUpdateParams = Omit<Institute, "createdAt" | "updatedAt">;
export type InstituteDelete = {
  userId: number;
  instituteId: number;
};
