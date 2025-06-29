import {
  getAllUsers,
  getUserById,
  updateOneUser,
  deleteUser,
  addDocument,
} from "../controllers/user.controller.js";
import Router from "./class/route.js";

export default class UserRouter extends Router {
  constructor() {
    super();
    this.init();
  }

  init() {
    this.get("/all", ["USER", "ADMIN"], getAllUsers);
    this.get("/current", ["USER", "ADMIN"], (req, res) => {
      res.status(200).send({ status: "success", payload: req.user });
    });
    this.get("/:uid", ["USER", "ADMIN"], getUserById);
    this.put("/updateOneUser/:uid", ["USER", "ADMIN"], updateOneUser);
    this.delete("/deleteOneUser/:uid", ["USER", "ADMIN"], deleteUser);
    this.post(
      "/uploadDocument/:uid",
      ["USER", "ADMIN"],
      { multer: "document" },
      addDocument
    );
  }
}
