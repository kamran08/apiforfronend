"use strict";
const Route = use("Route");

Route.post("/app/admin/login", "Admin/AuthController.login");
