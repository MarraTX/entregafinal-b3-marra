import PetRepository from "../repository/pet.repository.js";

const petRepository = new PetRepository();

export default class PetServices {
  constructor() {}

  async createPet(pet) {
    try {
      const newPet = await petRepository.createPet(pet);
      return newPet;
    } catch (error) {
      throw error;
    }
  }

  async createPetWithImage(pet) {
    try {
      const newPet = await petRepository.createPet(pet);
      return newPet;
    } catch (error) {
      throw error;
    }
  }

  async createManyPets(pets) {
    try {
      const newPets = await petRepository.createManyPets(pets);
      return newPets;
    } catch (error) {
      throw error;
    }
  }

  async getAllPets() {
    try {
      const pets = await petRepository.getAllPets();
      return pets;
    } catch (error) {
      throw error;
    }
  }

  async getPetById(pid) {
    try {
      const pet = await petRepository.getPetById(pid);
      return pet;
    } catch (error) {
      throw error;
    }
  }

  async updateOnePet(pid, pet) {
    try {
      const updatedPet = await petRepository.updatePet(pid, pet);
      return updatedPet;
    } catch (error) {
      throw error;
    }
  }

  async deletePet(pid) {
    try {
      const deletedPet = await petRepository.deletePet(pid);
      return deletedPet;
    } catch (error) {
      throw error;
    }
  }
}
