"use strict";
const Route = use("Route");

// kyc related data
// need middleware
Route.group(() => {
  Route.post("/app/update_kyc", "KycsController.update_kyc");
  Route.get("/app/get_all_kyc", "KycsController.get_all_kyc");
  Route.get(
    "/app/get_all_kyc_single/:id",
    "KycsController.get_all_kyc_single"
  );
}).middleware(["loggedIn"]);
