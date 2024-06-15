import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post("/send-email", async (req, res) => {
  const data = req.body;

  try {
    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${process.env.MAILERSEND_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      res.status(200).send({ message: "Correo enviado con éxito" });
    } else {
      res
        .status(response.status)
        .send({ message: "Error al enviar el correo" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error al enviar el correo", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
