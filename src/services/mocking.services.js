import { faker } from "@faker-js/faker/locale/es";
import { generateHash } from "../utils/utils.js";

export default class MockingServices {
  constructor() {}

  static async generateUsers(quantity) {
    const users = [];
    for (let i = 0; i < quantity; i++) {
      const user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: await generateHash("coder123"),
        role: faker.helpers.arrayElement(["user", "admin"]),
        pets: [],
      };
      users.push(user);
    }
    return users;
  }

  static async generatePets(quantity) {
    const pets = [];
    for (let i = 0; i < quantity; i++) {
      const pet = {
        name: faker.person.firstName(),
        specie: faker.animal.type(),
        birthDate: faker.date.past().toISOString(),
        adopted: faker.datatype.boolean(),
        owner: null,
        image: [{ name: faker.image.url(), reference: faker.image.url() }],
      };
      pets.push(pet);
    }
    return pets;
  }

  static async generateData(users, pets) {
    const usersMock = await this.generateUsers(users);
    const petsMock = await this.generatePets(pets);
    return { users: usersMock, pets: petsMock };
  }
}
