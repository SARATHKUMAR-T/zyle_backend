import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnection from "./dbconnection.js";
import { AdminRouter } from "./Routers/AdminRoute.js";
import { leadRouter } from "./Routers/LeadRoute.js";
import { isAuthenticated } from "./auth.js";
import { mailRouter } from "./Routers/MailRouter.js";
import multer from "multer";
// Initializing the server
const app = express();
app.use(express.json());
app.use(cors());

// Connecting to MongoDB
dbConnection();

// Listening on port
app.listen(9000, () => {
  console.log("Server Running Successfully!");
});

// Separate Routers
app.use("/api", AdminRouter);
app.use("/api", mailRouter);

// Route is protected with Authentication Middleware
app.use("/api", isAuthenticated, leadRouter);
