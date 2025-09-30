const axios = require("axios");

let webhookURL = null;

function setWebhook(url) {
  webhookURL = url;
  console.log("✅ Webhook registrado:", webhookURL);
}

async function triggerWebhook(event, data) {
  if (!webhookURL) return;
  try {
    await axios.post(webhookURL, { event, ...data });
    console.log("📡 Webhook enviado:", event, data);
  } catch (err) {
    console.error("❌ Error enviando webhook:", err.message);
  }
}

module.exports = { setWebhook, triggerWebhook };
