import express from "express";
import { Admin } from "../Models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const AdminRouter = express.Router();

// Login Route
AdminRouter.post("/login", async (req, res) => {
  try {
    // checking for valid user
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(400).json({ message: "admin doesn't exist" });
    }
    // valid users only allowed for password verification
    const validatePassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!validatePassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    } else {
      // after password validation token will be provided in the response
      const token = jwt.sign({ id: admin._id }, process.env.SECRET);
      return res
        .status(200)
        .json({ message: "Admin Logged In  Successfully", token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
});

// Signup Route
AdminRouter.post("/signup", async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const newAdmin = await new Admin({
      ...req.body,
      password: hashedPassword,
    }).save();
    const token = jwt.sign({ id: newAdmin._id }, process.env.SECRET);
    return res
      .status(200)
      .json({ message: "Admin Created Successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error", error });
  }
});
