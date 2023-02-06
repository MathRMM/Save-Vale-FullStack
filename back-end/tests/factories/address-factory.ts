import { prisma } from "@/config";
import { Institute } from "@prisma/client";
import { getAddress, getLocation } from "@/utils";
import { ViaCEPAddress } from "@/protocols";

async function createDDD(ddd: number) {
  const data = { ddd };
  return prisma.zone.create({ data });
}

async function createAddress(institute: Institute) {
  const cep = "12308052";
  const viaCEPAddress = await getAddress(cep);
  const city = await createCity(viaCEPAddress);
  const number = "400";
  const { lat, lng } = await getLocation({
    number: number,
    street: viaCEPAddress.logradouro,
    zipCode: cep,
  });

  return prisma.address.create({
    data: {
      neighborhood: viaCEPAddress.bairro,
      number: "9999",
      street: viaCEPAddress.logradouro,
      zipCode: cep,
      addressDetail: viaCEPAddress.complemento,
      cityId: city.id,
      instituteId: institute.id,
      lat,
      lng
    },
  });
}

async function fakeAddress(institute: Institute) {
  const cep = "13566590";
  const viaCEPAddress = await getAddress(cep);
  const city = await createCity(viaCEPAddress);
  return {
    neighborhood: viaCEPAddress.bairro,
    number: "400",
    street: viaCEPAddress.logradouro,
    zipCode: cep,
    addressDetail: viaCEPAddress.complemento || "",
    city: {
      name: viaCEPAddress.localidade,
      zoneId: Number(viaCEPAddress.ddd),
    },
    state: {
      name: viaCEPAddress.uf,
    },
    instituteId: institute.id,
  };
}

async function createCity(data: ViaCEPAddress) {
  const state = await prisma.state.create({
    data: {
      name: data.uf,
    },
  });

  const ddd = await createDDD(Number(data.ddd));

  return prisma.city.create({
    data: {
      name: data.localidade,
      stateId: state.id,
      zoneId: ddd.id,
    },
  });
}

const addressFactory = {
  createDDD,
  createCity,
  createAddress,
  fakeAddress,
};

export { addressFactory };
