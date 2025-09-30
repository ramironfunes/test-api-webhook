const mongoose = require("mongoose");

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/taskdb";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado a MongoDB en", mongoUrl))
.catch(err => console.error("❌ Error de conexión MongoDB:", err));
