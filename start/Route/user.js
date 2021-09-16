"use strict";
const Route = use("Route");

Route.post("/app/createUser", "UserController.createUser");
Route.post("/app/login", "UserController.login");

// need middleware
Route.post("/app/update_user", "UserController.updateUser").middleware(
  ["loggedIn"]
);
