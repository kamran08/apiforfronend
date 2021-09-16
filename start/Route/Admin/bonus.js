"use strict";
const Route = use("Route");

// bonus related data
Route.group(() => {
  Route.post("/app/admin/create_new_bonus", "Admin/BonusController.create_new_bonus");
  Route.post("/app/admin/update_bonus", "Admin/BonusController.update_bonus");
  Route.post("/app/admin/delete_bonus", "Admin/BonusController.delete_bonus");
  Route.get("/app/admin/get_all_bonus", "Admin/BonusController.get_all_bonus");
  Route.get(
    "/app/admin/get_all_bonus_single/:id",
    "BonusController.get_all_bonus_single"
  );
}).middleware(["admin"]);
