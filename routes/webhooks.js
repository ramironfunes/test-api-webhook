import express from "express";

const router = express.Router();

// simulamos almacenamiento en memoria (puedes guardar en Mongo si querés)
let webhookUrl = null;

// Registrar webhook
router.post("/", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: "Falta la URL del webhook" });

  webhookUrl = url;
  console.log("✅ Webhook registrado:", webhookUrl);
  res.json({ message: "Webhook registrado correctamente", url: webhookUrl });
});

// Probar disparo del webhook
router.post("/send", async (req, res) => {
  if (!webhookUrl) return res.status(400).json({ message: "No hay webhook registrado" });

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || { test: "Hello from API" }),
    });

    res.json({ message: "Webhook disparado", status: response.status });
  } catch (error) {
    console.error("❌ Error al enviar al webhook:", error.message);
    res.status(500).json({ message: "Error al enviar al webhook" });
  }
});

export default router;
