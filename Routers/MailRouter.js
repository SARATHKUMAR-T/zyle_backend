import express from "express";
import nodemailer from "nodemailer";
export const mailRouter = express.Router();

mailRouter.post("/mail", async (req, res) => {
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
      subject: req.body.subject || "Greeting From zyle",
      replyTo: req.body.from,
    };

    if (req.body.file.url) {
      mailOptions.attachments = [
        {
          filename: req.body.file.name,
          path: req.body.file.url,
        },
      ];
    }

    const htmlMessage = `
    <html>
      <body>
      <h2>${
        req.body.subject ? `${req.body.subject}` : "Greetings from Zyle"
      }</h2>
      <p>${req.body.message}</p>
       
      </body>
    </html>
  `;

    mailOptions.html = htmlMessage;

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
