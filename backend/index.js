import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import professionalRoutes from "./src/routes/professionalRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/profissionais", professionalRoutes);

app.listen(3000, () => {
  console.log("Backend rodando na porta 3000");
});
