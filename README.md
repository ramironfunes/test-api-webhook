# 📌 Task API Webhook

API REST en **Node.js + Express + MongoDB** con soporte para **Webhooks**, lista para correr en **Docker**.  
Incluye colección de Postman para testear y script de seeding automático de tareas.

---

## 🚀 Features
- CRUD completo de tareas.
- Registro y notificación a Webhooks externos.
- Seeding inicial con **50 tareas realistas en inglés** (solo si la colección está vacía).
- Endpoint para borrar todas las tareas.
- Configuración lista para **Docker Compose** o **Docker Hub**.
- Postman collection + environment listos para testing.
- Soporte para **Newman** (tests automatizados desde la terminal).

---

## 🔧 Requisitos

Antes de comenzar, asegurate de tener instalado:

- [Node.js](https://nodejs.org/) (si querés correrlo sin Docker)  
- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  
- [Postman](https://www.postman.com/downloads/) o [Newman](https://www.npmjs.com/package/newman) para testing  

---

## ▶️ Cómo correr la aplicación

### 1. Usando la imagen en Docker Hub (más rápido)

```bash
docker pull tuusuario/task-api-webhook:latest
docker run -p 3000:3000 tuusuario/task-api-webhook
La API estará disponible en:
👉 http://localhost:3000

2. Usando Docker Compose (modo desarrollo)
bash
Copy code
docker-compose up --build
Esto levanta:

task-api → API Node.js en puerto 3000

mongo-db → MongoDB en puerto 27017

3. Usando Node.js (sin Docker)
bash
Copy code
npm install
npm start
📡 Endpoints principales
Método	Endpoint	Descripción
GET	/tasks	Listar todas las tareas
POST	/tasks	Crear una nueva tarea
PUT	/tasks/:id	Editar una tarea existente
DELETE	/tasks/:id	Eliminar una tarea
DELETE	/tasks	Eliminar todas las tareas
POST	/webhook	Registrar un webhook externo

Ejemplo de registro de webhook:

json
Copy code
POST /webhook
{
  "url": "https://webhook.site/xxxxx"
}
🧪 Testing con Postman y Newman
Importar en Postman
Importá postman_environment.json

Importá postman_collection.json

Ejecutar tests con Newman
bash
Copy code
newman run postman_collection.json -e postman_environment.json
📦 Imagen Docker en Docker Hub
La imagen oficial está disponible en:

bash
Copy code
docker pull ra1984/task-api-webhook:latest
docker run -p 3000:3000 ra1984/task-api-webhook

📄 Documentación extra
En el repo encontrarás también un PDF paso a paso con:

Instalación de dependencias.

Comandos npm necesarios.

Montaje con Docker y Docker Compose.

Ejecución de tests con Newman.

🛠 Stack Tecnológico
Node.js + Express

MongoDB (con Mongoose ODM)

Docker & Docker Compose

Postman / Newman

Webhooks

👨‍💻 Autor
Proyecto desarrollado por Ramiro Funes
