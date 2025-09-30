// Datos iniciales con más cuerpo
let tasks = [
  {
    id: 1,
    title: "Configurar servidor de producción",
    description: "Montar instancia en AWS EC2 con balanceador y auto-scaling.",
    project: "Infraestructura",
    priority: "alta",
    status: "en progreso",
    assignee: {
      id: 101,
      name: "Diego Bresciani",
      email: "diego.b@empresa.com"
    },
    createdAt: "2025-09-20T10:15:00Z",
    updatedAt: "2025-09-21T09:00:00Z",
    dueDate: "2025-09-30T23:59:00Z",
    tags: ["aws", "devops", "infra"],
    comments: [
      { user: "Ramiro Funes", message: "Ya armé la VPC.", date: "2025-09-21T10:00:00Z" }
    ]
  },
  {
    id: 2,
    title: "Diseñar modelo de base de datos",
    description: "Definir entidades principales, relaciones y normalización para el sistema de reservas.",
    project: "Backend",
    priority: "media",
    status: "pendiente",
    assignee: {
      id: 102,
      name: "Jimena López",
      email: "jimena.l@empresa.com"
    },
    createdAt: "2025-09-22T14:30:00Z",
    updatedAt: null,
    dueDate: "2025-10-05T18:00:00Z",
    tags: ["db", "arquitectura"],
    comments: []
  },
  {
    id: 3,
    title: "Implementar autenticación JWT",
    description: "Agregar registro/login con JWT y roles de usuario.",
    project: "API",
    priority: "alta",
    status: "pendiente",
    assignee: {
      id: 103,
      name: "Ramiro Funes",
      email: "ramiro.f@empresa.com"
    },
    createdAt: "2025-09-23T08:45:00Z",
    updatedAt: null,
    dueDate: "2025-10-01T20:00:00Z",
    tags: ["security", "backend"],
    comments: [
      { user: "Diego Bresciani", message: "Revisar refresh tokens también.", date: "2025-09-24T11:20:00Z" }
    ]
  },
  {
    id: 4,
    title: "Diseñar dashboard de métricas",
    description: "Crear tablero en Grafana para monitoreo de SLA y KPIs de soporte.",
    project: "Monitoreo",
    priority: "alta",
    status: "en progreso",
    assignee: {
      id: 104,
      name: "Catalina Fúnez",
      email: "catalina.f@empresa.com"
    },
    createdAt: "2025-09-25T12:00:00Z",
    updatedAt: "2025-09-26T08:30:00Z",
    dueDate: "2025-10-10T23:59:00Z",
    tags: ["grafana", "reporting", "sla"],
    comments: []
  },
  {
    id: 5,
    title: "Integrar Jira Service Management",
    description: "Conectar API de JSM con sistema de tickets interno.",
    project: "Integraciones",
    priority: "alta",
    status: "pendiente",
    assignee: {
      id: 105,
      name: "Hernán Pérez",
      email: "hernan.p@empresa.com"
    },
    createdAt: "2025-09-26T09:15:00Z",
    updatedAt: null,
    dueDate: "2025-10-15T18:00:00Z",
    tags: ["jira", "itsm", "api"],
    comments: []
  }
];

module.exports = tasks;
