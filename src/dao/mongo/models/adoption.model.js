import mongoose from "mongoose";

const collection = "adoption";
const schema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true,
  },
});

const adoptionModel = mongoose.model(collection, schema);

export default adoptionModel;
