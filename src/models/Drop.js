import mongoose from "mongoose";

const DropSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    dropDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ["upcoming", "live", "ended"],
      default: "upcoming",
    },
  },
  { timestamps: true }
);

const Drop = mongoose.models.Drop || mongoose.model("Drop", DropSchema);

export default Drop;
