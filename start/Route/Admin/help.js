"use strict";
const Route = use("Route");

// help related data
Route.group(() => {
  Route.post("/app/admin/create_new_help", "Admin/HelpController.create_new_help");
  Route.post("/app/admin/update_help", "Admin/HelpController.update_help");
  Route.post("/app/admin/delete_help", "Admin/HelpController.delete_help");
  Route.get("/app/admin/get_all_help", "Admin/HelpController.get_all_help");
  Route.get(
    "/app/admin/get_all_help_single/:id",
    "Admin/HelpController.get_all_help_single"
  );
}).middleware(["admin"]);
