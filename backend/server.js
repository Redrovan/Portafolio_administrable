import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import qs from "qs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ======= PRUEBA BÁSICA =======
app.get("/test-whatsapp", (req, res) => {
  res.send(" Backend funcionando en Render");
});

// ======= EMAIL =======
import nodemailer from "nodemailer";

app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_SENDER,
      to,
      subject,
      html,
    });

    res.json({ ok: true, msg: "Correo enviado" });
  } catch (error) {
    console.log("Error Email:", error);
    res.json({ ok: false, error });
  }
});

// ======= WHATSAPP (Twilio Sandbox) =======
app.post("/send-whatsapp", async (req, res) => {
  try {
    const { to, message } = req.body;

    const data = qs.stringify({
      To: to,
      From: process.env.TWILIO_NUMBER,
      Body: message,
    });

    const twilioURL = `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ID}/Messages.json`;

    const response = await axios.post(twilioURL, data, {
      auth: {
        username: process.env.TWILIO_ID,
        password: process.env.TWILIO_TOKEN,
      },
    });

    res.json({ ok: true, data: response.data });
  } catch (error) {
    console.log("Error WhatsApp:", error.response?.data || error);
    res.json({ ok: false, error });
  }
});

// ======= PUERTO =======
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Backend listo en puerto " + PORT);
});
