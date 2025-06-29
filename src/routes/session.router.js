import {
  login,
  registerUser,
  logout,
} from "../controllers/session.controller.js";
import Router from "./class/route.js";

export default class SessionRouter extends Router {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.post("/login", ["PUBLIC"], login);
    this.post("/register", ["PUBLIC"], registerUser);
    this.post("/logout", ["USER", "ADMIN"], logout);
  }
}
