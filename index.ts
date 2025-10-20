import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", async(req, res) => {
  res.json({ message : "Welcome to Server using prisma"})
})


app.get("/user", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
