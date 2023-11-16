import express from "express";
import { PdfDetails } from "../Models/PdfDetails.js";
import { isAuthenticated } from "../auth.js";

export const pdfRouter = express.Router();

pdfRouter.get("/get-files", isAuthenticated, async (req, res) => {
  try {
    const pdf = await PdfDetails.find({ creator: req.user._id });
    res.status(200).json({ pdf });
  } catch (error) {
    console.log(error);
  }
});

pdfRouter.post("/upload-files", isAuthenticated, async (req, res) => {
  console.log(req.headers);
  try {
    const file = await new PdfDetails({
      file: req.body.file,
      fileUrl: req.body.fileUrl,
      creator: req.user._id,
    }).save();
    if (file) {
      res.status(200).json({ message: "File uploaded successfully", file });
    } else {
      res.status(400).json({ message: "unable to process file" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

pdfRouter.delete("/delete-file/:id", isAuthenticated, async (req, res) => {
  try {
    const deletePdf = await PdfDetails.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!deletePdf) {
      res;
      res.status(400).json({ message: "Unable to Delete File" });
      return;
    } else {
      res.status(200).json({ message: "File Deleted Successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
});
