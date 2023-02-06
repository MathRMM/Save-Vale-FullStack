import { prisma } from "@/config";
import { Responsible } from "@prisma/client";

function upsert(data: ResponsibleUpsertParams) {
  return prisma.responsible.upsert({
    where: {
      id: data.id || 0
    },
    create: {
      name: data.name,
      phone: data.phone,
      instituteId: data.instituteId
    },
    update: {
      name: data.name,
      phone: data.phone,
    }
  });
}

function remove(id: number) {
  const where = { id };
  return prisma.responsible.delete({ where });
}

function find(id: number) {
  const where = { id };
  return prisma.responsible.findUnique({
    where,
    include: {
      Institute: {
        select: {
          userId: true,
        },
      },
    },
  });
}

export const responsibleRepository = {
  remove,
  upsert,
  find,
};
export type ResponsibleUpsertParams = Omit<Responsible, "createdAt" | "updatedAt"> & 
{ userId: number };
export type ResponsibleDelete = {
  userId: number;
  responsibleId: number;
};
