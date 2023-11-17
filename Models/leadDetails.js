import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const leadDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  gst: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
  creator: {
    type: ObjectId,
    ref: "user",
  },
});

export const LeadDetails = mongoose.model("LeadDetails", leadDetailsSchema);
