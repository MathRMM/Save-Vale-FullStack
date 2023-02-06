import { instituteSchema } from "@/schemas";
import { faker } from "@faker-js/faker";

describe("InstituteSchema", () => {
  const validInstitute = () => ({
    name: faker.name.fullName(),
    withdraw: faker.datatype.boolean(),
    description: faker.lorem.paragraph(),
    image: faker.internet.url(),
  });

  describe("when institute is not valid", () => {
    it("should return error if name not present", () => {
      const input = validInstitute();
      delete input.name;

      const { error } = instituteSchema.validate(input);
      expect(error).toBeDefined();
    });
    it("should return error if withdraw not present", () => {
      const input = validInstitute();
      delete input.withdraw;

      const { error } = instituteSchema.validate(input);
      expect(error).toBeDefined();
    });
    it("should return error if description not present", () => {
      const input = validInstitute();
      delete input.description;

      const { error } = instituteSchema.validate(input);
      expect(error).toBeDefined();
    });
    it("should return error if image is not url", () => {
      const input = validInstitute();
      input.image = faker.random.numeric();

      const { error } = instituteSchema.validate(input);
      expect(error).toBeDefined();
    });

    it("should return no error if input is valid", () => {
      const input = validInstitute();
  
      const { error } = instituteSchema.validate(input);
  
      expect(error).toBeUndefined();
    });
  });
});
