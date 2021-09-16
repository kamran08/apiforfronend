"use strict";
const Route = use("Route");

// asset related data
Route.group(() => {
  Route.post(
    "/app/admin/create_new_widrow",
    "AssetController.create_new_widrow"
  );
  Route.post("/app/admin/update_widrow", "Admin/AssetController.update_widrow");
  Route.post("/app/admin/delete_widrow", "Admin/AssetController.delete_widrow");
  Route.get("/app/admin/get_all_widrow", "Admin/AssetController.get_all_widrow");
  Route.get(
    "/app/admin/get_all_widrow_single/:id",
    "Admin/AssetController.get_all_widrow_single"
  );
}).middleware(["admin"]);
