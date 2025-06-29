import AdoptionMongo from "../dao/mongo/adoption.mongo.js";

const adoptionMongo = new AdoptionMongo();

export default class AdoptionRepository {
  constructor() {}

  async createAdoption(adoption) {
    try {
      const newAdoption = await adoptionMongo.create(adoption);
      return newAdoption;
    } catch (error) {
      throw error;
    }
  }

  async getAllAdoptions() {
    try {
      const adoptions = await adoptionMongo.getAll();
      return adoptions;
    } catch (error) {
      throw error;
    }
  }

  async getOneAdoption(aid) {
    try {
      const adoption = await adoptionMongo.getOne(aid);
      return adoption;
    } catch (error) {
      throw error;
    }
  }

  async updateOneAdoption(aid, adoption) {
    try {
      const updatedAdoption = await adoptionMongo.updateOne(aid, adoption);
      return updatedAdoption;
    } catch (error) {
      throw error;
    }
  }

  async deleteOneAdoption(aid) {
    try {
      const deletedAdoption = await adoptionMongo.deleteOne(aid);
      return deletedAdoption;
    } catch (error) {
      throw error;
    }
  }
}
