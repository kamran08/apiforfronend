"use strict";
const Route = use("Route");

// admin related data
Route.post("/app/admin/createUser", "Admin/UserController.createUser").middleware([
  "admin",
]);
