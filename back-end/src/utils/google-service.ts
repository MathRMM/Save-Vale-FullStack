import { Address } from "@prisma/client";
import { GeocodingResponse } from "@/protocols";

export async function getLocation(data: Location) {
  const API_URL = process.env.API_URL_GOOGLE;
  const location = encodeURIComponent(`${data.street}/${data.number}/${data.zipCode}`);

  try {
    const response = await fetch(API_URL.replace("ADDRESS", location), { method: "GET" });
    const data: GeocodingResponse = await response.json();
    const result = {
      lat: data.results[0].geometry.location.lat,
      lng: data.results[0].geometry.location.lng,
    };
    return result;
  } catch (error) {
    throw { message: "deu ruim com google maps" };
  }
}

type Location = Pick<Address, "number" | "street" | "zipCode">;
