import { Decimal } from "@prisma/client/runtime";

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ddd: number
};

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Geometry {
  location: {
    lat: Decimal;
    lng: Decimal;
  };
  location_type: string;
  viewport: {
    northeast: {
      lat: Decimal;
      lng: Decimal;
    };
    southwest: {
      lat: Decimal;
      lng: Decimal;
    };
  };
}

interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

export type GeocodingResponse = {
  results: Result[];
  status: string;
}
