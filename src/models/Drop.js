import mongoose from "mongoose";

const DropSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    products: [
      {
        type: mongoose.Schema.Type.ObjectId,
        ref: "Product",
      },
    ],
    dropDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["upcoming", "live", "ended"],
      default: "upcoming",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Drop = mongoose.models.Drop || mongoose.model("Drop", DropSchema);

export default Drop;
