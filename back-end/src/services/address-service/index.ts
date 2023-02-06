import { notFoundError, unauthorizedError } from "@/errors";
import { addressRepository, CreateAddressParams, instituteRepository } from "@/repositories";
import { getAddress, getLocation } from "@/utils";
import { cannotAddressError } from "./cannot-address-error";

async function postAddress(data: Address) {
  const institute = await instituteRepository.find(data.address.instituteId);
  if (!institute) throw notFoundError();
  if (institute.userId !== data.userId) {
    throw unauthorizedError();
  }
  const { lat, lng } = await getLocation({
    number: data.address.number,
    street: data.address.street,
    zipCode: data.address.zipCode,
  });
  const result: CreateAddressParams = { ...data.address, lat, lng };

  return await addressRepository.upsert(result);
}

async function updateAddress(data: Address) {
  const institute = await instituteRepository.find(data.address.instituteId);
  if (!institute) throw notFoundError();
  if (institute.userId !== data.userId) {
    throw unauthorizedError();
  }
  const { lat, lng } = await getLocation({
    number: data.address.number,
    street: data.address.street,
    zipCode: data.address.zipCode,
  });
  const result: CreateAddressParams = { ...data.address, lat, lng };

  return await addressRepository.upsert(result);
}

async function getAddressFromCEP(CEP: string) {
  const result = await getAddress(CEP);

  if (!result) throw notFoundError();

  const zone = await addressRepository.findZones(Number(result.ddd));
  if (!zone) throw cannotAddressError();

  const address = {
    zipCode: CEP,
    street: result.logradouro,
    neighborhood: result.bairro,
    addressDetail: result.complemento,
    city: {
      name: result.localidade,
      zoneId: zone.id,
    },
    state: {
      name: result.uf,
    },
  };
  return address;
}

async function findAddressByUserId(id: number) {
  const response = await addressRepository.findByUserId(id);
  console.log(response);
  return response;
}

const addressService = {
  postAddress,
  getAddressFromCEP,
  updateAddress,
  findAddressByUserId
};

export { addressService };

type Address = {
  address: Omit<CreateAddressParams, "lat" | "lgn">;
  userId: number;
};
