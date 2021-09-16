"use strict";
const Route = use("Route");

// kyc related data
Route.group(() => {
  Route.post("/app/admin/create_new_kyc", "Admin/KycsController.create_new_kyc");
  Route.post("/app/admin/update_kyc", "Admin/KycsController.update_kyc");
  Route.post("/app/admin/delete_kyc", "Admin/KycsController.delete_kyc");
  Route.get("/app/admin/get_all_kyc", "Admin/KycsController.get_all_kyc");
  Route.get(
    "/app/admin/get_all_kyc_single/:id",
    "Admin/KycsController.get_all_kyc_single"
  );
}).middleware(["admin"]);
