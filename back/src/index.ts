import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// ⚠️ Carregue as variáveis de ambiente antes de qualquer uso
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("e-volui API");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
