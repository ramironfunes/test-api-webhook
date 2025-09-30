import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import taskRoutes from "./routes/tasks.js";
import Task from "./models/Task.js";
import axios from "axios";
import ticketRoutes from "./routes/tickets.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/itsm/tickets", ticketRoutes);

let webhookUrl = null;

// Endpoint para registrar webhook
app.post("/webhook", (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: "Se requiere una URL" });
  webhookUrl = url;
  res.json({ message: "Webhook registrado", url });
});

// Middleware para pasar webhook
app.use((req, res, next) => {
  req.webhookUrl = webhookUrl;
  next();
});

// Rutas
app.use("/tasks", taskRoutes);

// Conexión Mongo
mongoose
  .connect(process.env.MONGO_URL, { dbName: "taskdb" })
  .then(async () => {
    console.log("✅ Conectado a MongoDB");

    // 👉 Seed realista de tareas SOLO si está vacío
    const count = await Task.countDocuments();
    if (count === 0) {
      console.log("🌱 Seeding initial 50 tasks...");

      const seedTasks = [
        { title: "Set up project repository", description: "Initialize GitHub repository with main branch and base README", completed: true },
        { title: "Define project requirements", description: "Gather functional and non-functional requirements from stakeholders", completed: false },
        { title: "Create database schema", description: "Design MongoDB schema for tasks, users, and projects", completed: false },
        { title: "Implement authentication", description: "Add JWT-based authentication and authorization system", completed: false },
        { title: "Develop user registration API", description: "Create POST /users endpoint for new registrations", completed: false },
        { title: "Build login API", description: "Create POST /auth/login endpoint with email and password", completed: false },
        { title: "Set up CI/CD pipeline", description: "Integrate GitHub Actions for automated builds and testing", completed: false },
        { title: "Write unit tests for Task model", description: "Cover create, update, and delete logic with Jest", completed: false },
        { title: "Implement error handling middleware", description: "Centralize Express error responses", completed: true },
        { title: "Deploy MongoDB container", description: "Run MongoDB instance using Docker Compose", completed: true },
        { title: "Configure environment variables", description: "Store DB credentials and JWT secret in .env file", completed: true },
        { title: "Enable CORS", description: "Allow requests from Postman and frontend app", completed: true },
        { title: "Create tasks CRUD API", description: "Implement GET, POST, PUT, DELETE endpoints for tasks", completed: true },
        { title: "Add validation to Task schema", description: "Ensure required fields and correct data types", completed: true },
        { title: "Implement pagination for tasks", description: "Support query params limit and offset", completed: false },
        { title: "Add search filter", description: "Enable search by task title and status", completed: false },
        { title: "Design frontend wireframes", description: "Sketch initial layout for dashboard and task list", completed: false },
        { title: "Integrate frontend with API", description: "Connect React app to Express task API", completed: false },
        { title: "Write integration tests with Newman", description: "Run Postman collections in CI/CD pipeline", completed: false },
        { title: "Document API with Swagger", description: "Expose OpenAPI documentation at /docs", completed: false },
        { title: "Implement role-based access control", description: "Add admin and regular user roles", completed: false },
        { title: "Add password reset functionality", description: "Generate secure tokens for forgotten passwords", completed: false },
        { title: "Optimize MongoDB indexes", description: "Add index on userId and completed fields", completed: false },
        { title: "Create Dockerfile for API", description: "Containerize Node.js API with production config", completed: true },
        { title: "Set up staging environment", description: "Deploy API and DB to staging server", completed: false },
        { title: "Enable HTTPS in production", description: "Configure SSL with Let's Encrypt certificates", completed: false },
        { title: "Add logging middleware", description: "Log all requests and responses with Morgan", completed: true },
        { title: "Monitor server health", description: "Integrate Prometheus metrics for uptime and performance", completed: false },
        { title: "Prepare user manual", description: "Write documentation for end users", completed: false },
        { title: "Conduct UAT testing", description: "Run acceptance tests with business users", completed: false },
        { title: "Plan release schedule", description: "Define versioning strategy and release cycles", completed: false },
        { title: "Fix bug in task deletion", description: "Ensure DELETE /tasks/:id returns correct response", completed: true },
        { title: "Improve API response times", description: "Optimize queries and middleware", completed: false },
        { title: "Integrate Slack notifications", description: "Send webhook alerts for task creation", completed: false },
        { title: "Set up Redis cache", description: "Cache frequently accessed tasks", completed: false },
        { title: "Create analytics dashboard", description: "Show task completion rates and trends", completed: false },
        { title: "Add dark mode to frontend", description: "Toggle UI theme between light and dark", completed: false },
        { title: "Write end-to-end tests with Cypress", description: "Simulate user workflows on frontend", completed: false },
        { title: "Implement file upload", description: "Allow attaching documents to tasks", completed: false },
        { title: "Configure email notifications", description: "Send reminders for overdue tasks", completed: false },
        { title: "Improve accessibility", description: "Ensure WCAG compliance on all pages", completed: false },
        { title: "Conduct performance testing with k6", description: "Simulate 1000 concurrent users", completed: false },
        { title: "Deploy production version", description: "Push final stable version to production server", completed: false },
        { title: "Prepare backup strategy", description: "Automated daily backups of MongoDB", completed: false },
        { title: "Implement 2FA login", description: "Enable Google Authenticator codes on login", completed: false },
        { title: "Review security vulnerabilities", description: "Run npm audit and patch dependencies", completed: true },
        { title: "Train support team", description: "Prepare materials for technical support staff", completed: false },
        { title: "Gather user feedback", description: "Survey first 50 users for improvements", completed: false },
        { title: "Plan roadmap for v2", description: "Define new features for next release cycle", completed: false },
        { title: "Close project documentation", description: "Finalize technical and business docs", completed: false },
      ];

      await Task.insertMany(seedTasks);
      console.log("✅ Inserted 50 real tasks");
    }

    app.listen(PORT, () =>
      console.log(`🚀 API escuchando en http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Error de conexión:", err));

// Endpoint para crear ticket en ITSM
app.post("/itsm/ticket", async (req, res) => {
  const { summary, description, priority } = req.body;

  try {
    // Ejemplo con JIRA Service Management
    const response = await axios.post(
      "https://TU_DOMINIO.atlassian.net/rest/api/3/issue",
      {
        fields: {
          project: { key: "IT" }, // Cambia el proyecto según tu instancia
          summary: summary || "Task API issue detected",
          description: description || "Generated automatically from Task API",
          issuetype: { name: "Bug" },
          priority: { name: priority || "Medium" },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            "TU_USUARIO:TU_API_TOKEN"
          ).toString("base64")}`,
        },
      }
    );

    res.json({
      message: "✅ Ticket created successfully in ITSM",
      ticket: response.data,
    });
  } catch (error) {
    console.error("❌ Error creating ITSM ticket:", error.response?.data || error.message);
    res.status(500).json({
      message: "Error creating ITSM ticket",
      error: error.response?.data || error.message,
    });
  }
});



  // =======================
// Integraciones externas
// =======================

// Prometheus (simulación)
app.get("/metrics/prometheus", (req, res) => {
  res.type("text/plain").send(`# HELP task_count Number of tasks
# TYPE task_count gauge
task_count ${Math.floor(Math.random() * 100)}
`);
});

// AppDynamics (simulación)
app.get("/metrics/appdynamics", (req, res) => {
  res.json({
    app: "task-api-webhook",
    health: "green",
    responseTimeMs: Math.floor(Math.random() * 500),
    errors: Math.floor(Math.random() * 5),
    timestamp: new Date(),
  });
});

// ITSM - Jira/ServiceNow (simulación)
app.post("/itsm/ticket", (req, res) => {
  const { title, description, priority } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }
  res.json({
    message: "Ticket created (simulated)",
    id: `TICKET-${Math.floor(Math.random() * 10000)}`,
    title,
    description,
    priority: priority || "Medium",
    status: "Open",
  });
});
