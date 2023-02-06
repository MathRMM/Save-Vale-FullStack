import { prisma } from "@/config";
import { Address, City, State } from "@prisma/client";
import { requestError } from "@/errors";
import httpStatus from "http-status";

async function find(id: number) {
  const where = { id };
  return prisma.address.findUnique({ where });
}

async function findByUserId(id: number) {
  return prisma.address.findFirst({
    where: {
      Institute: {
        userId: id,
      },
    },
    include: {
      City: {
        include: {
          State: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

async function upsert(data: CreateAddressParams) {
  return await prisma.$transaction(async (_tx) => {
    const state = await prisma.state.upsert({
      create: {
        name: data.state.name,
      },
      update: {},
      where: {
        name: data.state.name,
      },
    });

    if (!state) {
      throw requestError(httpStatus.BAD_REQUEST, httpStatus["400_MESSAGE"]);
    }

    let city = await prisma.city.findFirst({
      where: {
        name: data.city.name,
        stateId: state.id,
      },
    });

    if (!city) {
      city = await prisma.city.create({
        data: {
          name: data.city.name,
          stateId: state.id,
          zoneId: data.city.zoneId,
        },
      });
    }

    return await prisma.address.upsert({
      create: {
        number: data.number,
        neighborhood: data.neighborhood,
        street: data.street,
        zipCode: data.zipCode,
        addressDetail: data.addressDetail,
        cityId: city.id,
        instituteId: data.instituteId,
        lat: data.lat,
        lng: data.lng,
      },
      update: {
        number: data.number,
        neighborhood: data.neighborhood,
        street: data.street,
        zipCode: data.zipCode,
        addressDetail: data.addressDetail,
        cityId: city.id,
      },
      where: {
        id: data.id || 0,
      },
    });
  });
}

async function findZones(ddd: number) {
  return prisma.zone.findFirst({
    where: {
      ddd,
    },
  });
}

const addressRepository = {
  find,
  upsert,
  findZones,
  findByUserId,
};

export { addressRepository };

export type CreateAddressParams = Omit<Address, "createdAt" | "updatedAt" | "stateId" | "cityId"> & {
  city: Pick<City, "name" | "zoneId">;
  state: Pick<State, "name">;
};
