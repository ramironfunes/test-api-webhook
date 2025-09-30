const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Esto debería validarse contra DB
  if (email === "admin@empresa.com" && password === "1234") {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || "supersecret", { expiresIn: "1h" });
    return res.json({ token });
  }
  res.status(401).json({ error: "Credenciales inválidas" });
});

module.exports = router;
