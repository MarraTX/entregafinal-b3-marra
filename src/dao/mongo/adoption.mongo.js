import adoptionModel from "./models/adoption.model.js";

export default class AdoptionMongo {
  constructor() {}

  async create(adoption) {
    try {
      const newAdoption = await adoptionModel.create(adoption);
      return newAdoption;
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const adoptions = await adoptionModel.find();
      return adoptions;
    } catch (error) {
      throw error;
    }
  }

  async getOne(aid) {
    try {
      const adoption = await adoptionModel.findById(aid);
      return adoption;
    } catch (error) {
      throw error;
    }
  }

  async updateOne(aid, adoption) {
    try {
      const updatedAdoption = await adoptionModel.findByIdAndUpdate(
        aid,
        adoption
      );
      return updatedAdoption;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(aid) {
    try {
      const deletedAdoption = await adoptionModel.findByIdAndDelete(aid);
      return deletedAdoption;
    } catch (error) {
      throw error;
    }
  }
}
