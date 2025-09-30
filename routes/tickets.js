import express from "express";
import Ticket from "../models/Ticket.js";

const router = express.Router();

// Crear ticket
router.post("/ticket", (req, res) => {
  const { title, description } = req.body;
  const ticket = {
    id: "TICKET-" + Math.floor(Math.random() * 10000),
    title,
    description,
    priority: "Medium",
    status: "Open"
  };

  tickets.push(ticket);
  res.json(ticket);
});

// Listar todos los tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ver ticket por ID
router.get("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar ticket
router.put("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar ticket
router.delete("/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json({ message: "Ticket deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Eliminar todos los tickets
router.delete("/", async (req, res) => {
  try {
    await Ticket.deleteMany({});
    res.json({ message: "All tickets deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
