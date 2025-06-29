import PetMongo from "../dao/mongo/pet.mongo.js";

const petMongo = new PetMongo();

export default class PetRepository {
  constructor() {}

  async createPet(pet) {
    try {
      const newPet = await petMongo.create(pet);
      return newPet;
    } catch (error) {
      throw error;
    }
  }

  async createManyPets(pets) {
    try {
      const newPets = await petMongo.createMany(pets);
      return newPets;
    } catch (error) {
      throw error;
    }
  }

  async getAllPets() {
    try {
      const pets = await petMongo.getAll();
      return pets;
    } catch (error) {
      throw error;
    }
  }

  async getPetById(pid) {
    try {
      const pet = await petMongo.getById(pid);
      return pet;
    } catch (error) {
      throw error;
    }
  }

  async updatePet(pid, pet) {
    try {
      const updatedPet = await petMongo.update(pid, pet);
      return updatedPet;
    } catch (error) {
      throw error;
    }
  }

  async deletePet(pid) {
    try {
      const deletedPet = await petMongo.delete(pid);
      return deletedPet;
    } catch (error) {
      throw error;
    }
  }
}
