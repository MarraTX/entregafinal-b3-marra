import AdoptionRepository from "../repository/adoption.repository.js";

const adoptionRepository = new AdoptionRepository();

export default class AdoptionService {
  constructor() {}

  async createAdoption(adoption) {
    try {
      const newAdoption = await adoptionRepository.createAdoption(adoption);
      return newAdoption;
    } catch (error) {
      throw error;
    }
  }

  async getAllAdoptions() {
    try {
      const adoptions = await adoptionRepository.getAllAdoptions();
      return adoptions;
    } catch (error) {
      throw error;
    }
  }

  async getOneAdoption(aid) {
    try {
      const adoption = await adoptionRepository.getOneAdoption(aid);
      return adoption;
    } catch (error) {
      throw error;
    }
  }

  async updateOneAdoption(aid, adoption) {
    try {
      const updatedAdoption = await adoptionRepository.updateOneAdoption(
        aid,
        adoption
      );
      return updatedAdoption;
    } catch (error) {
      throw error;
    }
  }

  async deleteOneAdoption(aid) {
    try {
      const deletedAdoption = await adoptionRepository.deleteOneAdoption(aid);
      return deletedAdoption;
    } catch (error) {
      throw error;
    }
  }
}
