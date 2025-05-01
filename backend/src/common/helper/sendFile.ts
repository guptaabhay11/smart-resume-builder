import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Basic send email function

// Function to send email with file attachment
export const sendFile = async ({
  email,
  subject,
  html,
  filePath,
  fileName,
}: {
  email: string;
  subject: string;
  html: string;
  filePath: string;  
  fileName: string;  
}) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    console.log("EMAIL CONFIG 1", process.env.MAIL_USER, process.env.MAIL_PASSWORD);

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject,
      html,
      attachments: [
        {
          filename: fileName, 
          path: filePath, 
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.log("Error sending email with attachment:", err);
    return false;
  }
};
