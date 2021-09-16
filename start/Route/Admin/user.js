"use strict";
const Route = use("Route");

// need middleware
Route.get(
  "/app/admin/get_users",
  "Admin/UserController.getAllUsers"
).middleware(["admin"]);
Route.post(
  "/app/admin/update_user",
  "Admin/UserController.updateUser"
).middleware(["admin"]);
Route.post(
  "/app/admin/delete_user",
  "Admin/UserController.deleteUser"
).middleware(["admin"]);
