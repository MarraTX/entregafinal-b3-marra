import Router from "./class/route.js";
import {
  createAdoption,
  getAllAdoptions,
  getOneAdoption,
  updateOneAdoption,
  deleteOneAdoption,
} from "../controllers/adoption.controller.js";

export default class AdoptionRouter extends Router {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.post("/createAdoption/:uid/:pid", ["USER", "ADMIN"], createAdoption);
    this.get(
      "/getAllAdoptions/all",
      ["USER", "ADMIN", "PUBLIC"],
      getAllAdoptions
    );
    this.get(
      "/getOneAdoption/:aid",
      ["USER", "ADMIN", "PUBLIC"],
      getOneAdoption
    );
    this.put(
      "/updateOneAdoption/:aid/:uid/:pid",
      ["USER", "ADMIN"],
      updateOneAdoption
    );
    this.delete(
      "/deleteOneAdoption/:aid",
      ["USER", "ADMIN"],
      deleteOneAdoption
    );
  }
}
