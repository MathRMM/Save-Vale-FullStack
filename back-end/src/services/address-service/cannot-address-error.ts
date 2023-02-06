import { ApplicationError } from "@/protocols";

export function cannotAddressError(): ApplicationError {
  return {
    name: "cannotAddressError",
    message: "Your region is not supported yet",
  };
}
