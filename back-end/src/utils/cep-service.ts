import { ViaCEPAddress } from "@/protocols";
import { request } from "./request";

async function getAddress(cep: string): Promise<ViaCEPAddress> {
  const response = await request.get(`https://viacep.com.br/ws/${cep}/json/`);
  const result: Promise<ViaCEPAddress> = await response.json();
  return result;
}

export {
  getAddress,
};
