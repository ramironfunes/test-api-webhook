# Task API Webhook 🚀

REST API built with **Node.js**, **Express** and **MongoDB**, with support for webhooks, metrics (Prometheus / AppDynamics simulation) and ticketing (ITSM simulation). Ready to run with Docker or locally.  

---

## 🔍 Table of Contents

1. [Features](#features)  
2. [Requirements](#requirements)  
3. [Installation & Running](#installation--running)  
   - Docker Hub  
   - Docker Compose  
   - Local (Node.js)  
4. [Endpoints](#endpoints)  
   - Tasks  
   - Webhook  
   - Metrics  
   - ITSM / Tickets  
5. [Postman / Testing](#postman--testing)  
6. [License & Author](#license--author)  

---

## 🛠 Features

- CRUD for tasks  
- Webhook registration (notify external URLs)  
- Initial seeding of 50 tasks (only first run)  
- Endpoints for metrics:  
  - `/metrics/prometheus` → output compatible with Prometheus (plain text)  
  - `/metrics/appdynamics` → JSON simulation of AppDynamics data  
- ITSM / Ticketing simulation: `/itsm/ticket` and `/itsm/tickets`  
- Docker & Docker Compose setup  
- Postman collection + environment provided for ease of testing  
- Support for automated tests with Newman  

---

## 📋 Requirements

- Node.js (version 18 or above recommended)  
- npm  
- Docker & Docker Compose (for containerized mode)  
- Postman / Newman (for API testing)  

---

## ▶ Installation & Running

### 1. Using Docker Hub (quick start)

```bash
docker pull ra1984/test-api-webhook:latest
docker run -p 3000:3000 ra1984/test-api-webhook
Visit: http://localhost:3000

2. Using Docker Compose (development)
bash
Copy code
docker-compose up --build
This will start two containers:

task-api on port 3000

mongo-db on port 27017

3. Local (Node.js mode)
bash
Copy code
npm install
npm start
📬 Endpoints
Tasks
Method	URL	Description
GET	/tasks	List all tasks
GET	/tasks/:id	Get a task by ID
POST	/tasks	Create a new task
PUT	/tasks/:id	Update a task
DELETE	/tasks/:id	Delete a task
DELETE	/tasks	Delete all tasks

Webhook
Method	URL	Description
POST	/webhook	Register a webhook URL

Body:

json
Copy code
{ "url": "https://your-webhook.site/id" }
Metrics
Method	URL	Description
GET	/metrics/prometheus	Metrics in Prometheus text format
GET	/metrics/appdynamics	JSON-like simulation of APM metrics

ITSM / Tickets (simulation)
Method	URL	Description
POST	/itsm/ticket	Create a new ticket
GET	/itsm/tickets	List all tickets

POST Body Example:

json
Copy code
{
  "title": "Database latency alert",
  "description": "High latency noticed in Mongo calls",
  "priority": "High"
}
🧪 Postman / Testing
Import collection JSON (Task-API-Webhook Collection)

Import environment JSON (Task API Webhooks - Local)

Use variables: {{baseUrl}}, {{taskId}}, {{ticketId}}

After creating a task or ticket, store its ID into taskId or ticketId for subsequent requests

You can run automated tests using Newman:

bash
Copy code
newman run Task-API-Webhook.postman_collection.json -e Task-API-Webhooks.postman_environment.json
🧾 License & Author
Licensed under the MIT License.
Developed by Ramiro Funes
