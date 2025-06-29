import mongoose from "mongoose";
import { generateHash } from "../../../utils/utils.js";
import moment from "moment";
const collection = "users";

const schema = new mongoose.Schema({
  last_connection: {
    type: String,
    default: moment().format("DD-MM-YYYY HH:mm:ss"),
  },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  pets: {
    type: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "pets",
        },
      },
    ],
    default: [],
  },
  document: {
    type: [
      {
        name: { type: String, required: true },
        reference: { type: String, required: true },
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "documents",
        },
      },
    ],
    default: [],
  },
});

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await generateHash(this.password);
  }
  next();
});

const userModel = mongoose.model(collection, schema);

export default userModel;
