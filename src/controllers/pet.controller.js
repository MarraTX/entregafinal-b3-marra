import PetServices from "../services/pet.services.js";

const petServices = new PetServices();

export const getAllPets = async (req, res) => {
  try {
    const pets = await petServices.getAllPets();
    res.status(200).send({ status: "success", payload: pets });
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .send({ status: "error", error: "Error al obtener mascotas" });
  }
};

export const getPetById = async (req, res) => {
  try {
    const { pid } = req.params;
    const pet = await petServices.getPetById(pid);
    res.status(200).send({ status: "success", payload: pet });
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .send({ status: "error", error: "Error al obtener mascota" });
  }
};

export const addImage = async (req, res) => {
  try {
    const { pid } = req.params;

    if (!pid) {
      return res.status(400).json({
        status: "error",
        error: "El id de la mascota es requerido",
      });
    }

    const pet = await petServices.getPetById(pid);
    if (!pet) {
      return res.status(404).json({
        status: "error",
        error: "Mascota no encontrada",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: "error",
        error: "No se ha subido ningún archivo",
      });
    }

    pet.image.push({
      reference: req.file.path,
    });

    await pet.save();

    res.status(201).json({
      status: "success",
      message: "Archivo subido correctamente",
      image: {
        reference: req.file.path,
      },
    });
  } catch (error) {
    req.logger.error(error);
    res.status(400).json({
      status: "error",
      error: "Error al procesar el archivo",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const createPet = async (req, res) => {
  try {
    const pet = {
      name: req.body.name,
      specie: req.body.specie,
      birthDate: req.body.birthDate,
    };
    const result = await petServices.createPet(pet);
    res.status(201).json({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message || "Error al registrar mascota",
    });
  }
};

export const createPetWithImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        error: "No se ha subido ningún archivo",
      });
    }

    const pet = {
      name: req.body.name,
      specie: req.body.specie,
      birthDate: req.body.birthDate,
      adopted: req.body.adopted || false,
      owner: req.body.owner || null,
      image: [
        {
          reference: req.file.path.replace(/\\/g, "/"),
        },
      ],
    };

    const result = await petServices.createPet(pet);

    res.status(201).json({
      status: "success",
      payload: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message || "Error al registrar mascota",
    });
  }
};

export const updateOnePet = async (req, res) => {
  try {
    const { pid } = req.params;
    const pet = await petServices.getPetById(pid);
    if (!pet) {
      return res.status(404).json({
        status: "error",
        error: "Mascota no encontrada",
      });
    }
    const updatedPet = await petServices.updateOnePet(pid, req.body);
    res.status(201).json({ status: "success", payload: updatedPet });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: "error", error: "Error al actualizar mascota" });
  }
};

export const deleteOnePet = async (req, res) => {
  try {
    const { pid } = req.params;
    const pet = await petServices.getPetById(pid);
    if (!pet) {
      return res.status(404).json({
        status: "error",
        error: "Mascota no encontrada",
      });
    }
    const deletedPet = await petServices.deletePet(pid);
    res.status(201).json({ status: "success", payload: deletedPet });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ status: "error", error: "Error al eliminar mascota" });
  }
};
