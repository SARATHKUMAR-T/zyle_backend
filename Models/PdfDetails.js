import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const pdfDetailsSchema = new mongoose.Schema({
  file: String,
  fileUrl: String,
  creator: {
    type: ObjectId,
    ref: "user",
  },
});

export const PdfDetails = mongoose.model("PdfDetails", pdfDetailsSchema);
