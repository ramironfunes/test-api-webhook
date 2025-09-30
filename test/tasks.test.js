import { test, expect } from "@playwright/test";

test("GET /tasks should return tasks", async ({ request }) => {
  const res = await request.get("/tasks");
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(Array.isArray(body)).toBeTruthy();
});

test("POST /tasks should create a task", async ({ request }) => {
  const res = await request.post("/tasks", {
    data: { title: "New task from Playwright", description: "Check reporting", completed: false }
  });
  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body.title).toBe("New task from Playwright");
});
