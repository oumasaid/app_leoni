import nodemailer from "nodemailer";

// Function to send email
export async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    host: "gmail",
    port: 587,
    auth: {
      user: "oumaimasaid51@gmail.com",
      pass: "ashy pwys nmss axpb",
    },
  });

  await transporter.sendMail({
    from: "oumaimasaid51@gmail.com",
    to: to,
    subject: subject,
    text: text,
  });
}
