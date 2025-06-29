import petModel from "./models/pet.model.js";

export default class PetMongo {
  constructor() {}

  async create(pet) {
    try {
      const newPet = await petModel.create(pet);
      return newPet;
    } catch (error) {
      throw error;
    }
  }

  async createMany(pets) {
    try {
      const newPets = await petModel.insertMany(pets);
      return newPets;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const pets = await petModel.find();
      return pets;
    } catch (error) {
      throw error;
    }
  }

  async getById(pid) {
    try {
      const pet = await petModel.findById(pid);
      return pet;
    } catch (error) {
      throw error;
    }
  }

  async update(pid, pet) {
    try {
      const updatedPet = await petModel.findByIdAndUpdate(pid, pet);
      return updatedPet;
    } catch (error) {
      throw error;
    }
  }

  async delete(pid) {
    try {
      const deletedPet = await petModel.findByIdAndDelete(pid);
      return deletedPet;
    } catch (error) {
      throw error;
    }
  }
}
