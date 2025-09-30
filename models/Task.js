import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    // en lugar de booleano, usamos string con valores permitidos
    status: {
      type: String,
      enum: ["pending", "in progress", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);