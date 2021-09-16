"use strict";
const Route = use("Route");

// logs

Route.group(() => {
  Route.post("/create_new_log", "Admin/LogController.create_new_log");
  Route.post("/delete_log", "Admin/LogController.delete_log");
  Route.get("/get_all_log", "Admin/LogController.get_all_log");
  Route.get("/get_all_log_single/:id", "Admin/LogController.get_all_log_single");
}).prefix("/app/admin/log").middleware(["admin"]);