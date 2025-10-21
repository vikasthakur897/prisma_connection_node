import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
app.use(express.json());

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// ✅ Home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Server using Prisma" });
});

// ✅ Get all users
app.get("/user", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ✅ Create new user (POST)
app.post("/user", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// ✅ Update user (PUT)
app.put("/user/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { name, email, password } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, password },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// ✅ Delete user (DELETE)
app.delete("/user/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.user.delete({
      where: { id },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
