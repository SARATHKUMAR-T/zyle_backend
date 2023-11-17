import express from "express";
import nodemailer from "nodemailer";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
export const mailRouter = express.Router();

// Get the directory path using 'import.meta.url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const destinationPath = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

mailRouter.post("/mail", upload.single("file"), async (req, res) => {
  console.log(req.body);
  try {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "spellbee931@gmail.com",
        pass: "iyodaocmlnjdrhkj",
      },
    });

    var mailOptions = {
      from: "spellbee931@gmail.com",
      to: req.body.mailTo,
      subject: req.body.subject || "Default Subject",
      replyTo: req.body.from,
      text: req.body.message,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(info);
        console.log(error);
        res.status(500).json({
          message: "We are Facing some problem with this service",
          error,
        });
      } else {
        res.status(200).json({ message: "Email sent successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "internal server error", error });
  }
});
