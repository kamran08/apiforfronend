"use strict";
const Route = use("Route");

// deposite related data
Route.group(() => {
  Route.post(
    "/app/admin/create_new_deposite",
    "Admin/DepositController.create_new_deposite"
  );
  Route.post("/app/admin/update_deposite", "Admin/DepositController.update_deposite");
  Route.post("/app/admin/delete_deposite", "Admin/DepositController.delete_deposite");
  Route.get(
    "/app/admin/get_all_deposite",
    "Admin/DepositController.get_all_deposite"
  );
  Route.get(
    "/app/admin/get_all_deposite_single/:id",
    "Admin/DepositController.get_all_deposite_single"
  );
}).middleware(["admin"]);
