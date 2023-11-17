import express from "express";
import { LeadDetails } from "../Models/leadDetails.js";
import { isAuthenticated } from "../auth.js";

export const leadRouter = express.Router();

leadRouter.get("/get-leads", isAuthenticated, async (req, res) => {
  try {
    const lead = await LeadDetails.find({ creator: req.user._id });
    res.status(200).json({ lead });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

leadRouter.post("/upload-lead", isAuthenticated, async (req, res) => {
  try {
    const newLead = await new LeadDetails({
      ...req.body,
      creator: req.user._id,
    }).save();
    if (newLead) {
      res.status(200).json({ message: "Lead uploaded successfully", newLead });
    } else {
      res.status(400).json({ message: "unable to process newLead" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

// updating-status
leadRouter.patch("/update-status/:id", isAuthenticated, async (req, res) => {
  try {
    const updateLead = await LeadDetails.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { status: req.body.status } },
      { new: true }
    );

    if (updateLead) {
      res.status(200).json({ message: "Status Updated Successfully" });
    } else {
      res.status(400).json({ message: "Unbale to Update Status" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

leadRouter.delete("/delete-lead/:id", isAuthenticated, async (req, res) => {
  try {
    const deleteLead = await LeadDetails.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!deleteLead) {
      res;
      res.status(400).json({ message: "Unable to Delete Lead" });
      return;
    } else {
      res.status(200).json({ message: "Lead Deleted Successfully!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
});
