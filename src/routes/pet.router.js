import Router from "./class/route.js";
import {
  getAllPets,
  getPetById,
  addImage,
  createPetWithImage,
  createPet,
  updateOnePet,
  deleteOnePet,
} from "../controllers/pet.controller.js";

export default class PetRouter extends Router {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.get("/all", ["PUBLIC"], getAllPets);
    this.get("/:pid", ["USER", "ADMIN"], getPetById);
    this.post("/:pid/imagePet", ["USER", "ADMIN"], addImage);
    this.post(
      "/withImage",
      ["USER", "ADMIN"],
      { multer: "image" },
      createPetWithImage
    );
    this.post("/", ["USER", "ADMIN"], createPet);
    this.put(
      "/updateOnePet/:pid",
      ["USER", "ADMIN"],
      { multer: "image" },
      updateOnePet
    );
    this.delete("/deleteOnePet/:pid", ["USER", "ADMIN"], deleteOnePet);
  }
}
