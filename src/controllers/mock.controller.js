import MockingServices from "../services/mocking.services.js";
import userModel from "../dao/mongo/models/user.model.js";
import petModel from "../dao/mongo/models/pet.model.js";

export const getUserMock = async (req, res) => {
  try {
    const users = await MockingServices.generateUsers(10);
    res.status(201).send({ status: "success", payload: users });
    res.logger.info({ "Usuarios generados exitosamente": users });
  } catch (error) {
    res.logger.error({ error });
    res
      .status(400)
      .send({ status: "error", error: "Error al generar usuarios" });
  }
};

export const getPetMock = async (req, res) => {
  try {
    const pets = await MockingServices.generatePets(10);
    res.status(201).send({ status: "success", payload: pets });
    res.logger.info({ "Mascotas generadas exitosamente": pets });
  } catch (error) {
    req.logger.error({ error });
    res
      .status(400)
      .send({ status: "error", error: "Error al generar mascotas" });
  }
};

export const generateData = async (req, res) => {
  try {
    const { users, pets } = req.body;
    if (typeof users !== "number" || typeof pets !== "number") {
      return res.status(400).send({
        status: "error",
        error: "Debes especificar la cantidad de usuarios y mascotas",
      });
    }
    if (users < 0 || pets < 0) {
      return res.status(400).send({
        status: "error",
        error: "Debes especificar una cantidad positiva de usuarios y mascotas",
      });
    }
    if (users === 0 || pets === 0) {
      return res.status(400).send({
        status: "error",
        error:
          "Debes especificar una cantidad mayor a 0 de usuarios y mascotas",
      });
    }
    const { users: usersMock, pets: petsMock } =
      await MockingServices.generateData(users, pets);
    const insertedUsers = await userModel.insertMany(usersMock);
    const insertedPets = await petModel.insertMany(petsMock);

    res.status(201).send({
      status: "success",
      message: "Datos generados exitosamente",
      insertedUsers: insertedUsers.length,
      insertedPets: insertedPets.length,
    });
  } catch (error) {
    res.status(400).json({ status: "error", error: "Error al generar datos" });
    res.logger.error({ error });
  }
};
