"use strict";
const Route = use("Route");

// asset related data
Route.group(() => {
  Route.post("/app/admin/create_new_asset", "Admin/AssetController.create_new_asset");
  Route.post("/app/admin/update_asset", "Admin/AssetController.update_asset");
  Route.post("/app/admin/delete_asset", "Admin/AssetController.delete_asset");
  Route.get("/app/admin/get_all_asset", "Admin/AssetController.get_all_asset");
  Route.get(
    "/app/admin/get_all_asset_single/:id",
    "AssetController.get_all_asset_single"
  );
}).middleware(["admin"]);
