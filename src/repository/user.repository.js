import UserMongo from "../dao/mongo/user.mongo.js";

const userMongo = new UserMongo();

export default class UserRepository {
  constructor() {}

  createUser = async (user) => {
    try {
      let result = await userMongo.create(user);
      return result;
    } catch (error) {
      throw error;
    }
  };

  createManyUsers = async (users) => {
    try {
      const newUsers = await userMongo.createMany(users);
      return newUsers;
    } catch (error) {
      throw error;
    }
  };

  async getAllUsers() {
    try {
      const users = await userMongo.getAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(uid) {
    try {
      const user = await userMongo.getById(uid);
      return user;
    } catch (error) {
      throw error;
    }
  }

  getByEmail = async (email) => {
    try {
      const user = await userMongo.getByEmail(email);
      return user;
    } catch (error) {
      throw error;
    }
  };

  updateOneUser = async (uid, user) => {
    try {
      const updatedUser = await userMongo.update(uid, user);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  deleteOneUser = async (uid) => {
    try {
      const deletedUser = await userMongo.delete(uid);
      return deletedUser;
    } catch (error) {
      throw error;
    }
  };
}
