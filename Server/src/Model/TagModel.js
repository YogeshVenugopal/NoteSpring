import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    color: {
      type: String,
      default: "#3B82F6",
    },

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

tagSchema.index(
  { user: 1, name: 1 },
  { unique: true }
);

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;