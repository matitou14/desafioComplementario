import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "879779b1c1f9b9",
    pass: "e2f4bcd9deec43"
  }
});
export default transporter;