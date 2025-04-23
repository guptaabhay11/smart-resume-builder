import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const sendEmail = async ({
  email,
  subject,
  html,
  url,
}: {
  email: string;
  subject: string;
  html: string;
  url?: string;
}) => {
  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    console.log("EMAIL CONFIG 2", process.env.EMAIL_USER, process.env.EMAIL_PASS);

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

