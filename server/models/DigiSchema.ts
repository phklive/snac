import mongoose, { Schema } from "mongoose";

export const DigiSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    image: String,
    creator: String,
    owner: String,
    likes: Number,
  },
  { timestamps: true }
);

const Digi = mongoose.model("Digi", DigiSchema);

export default Digi;
