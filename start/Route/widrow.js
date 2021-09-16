"use strict";
const Route = use("Route");

// need middleware
Route.group(() => {
  Route.post("/app/create_new_widrow", "WithdrawController.create_new_widrow");
  Route.get("/app/get_all_widrow", "WithdrawController.get_all_widrow");
  Route.get(
    "/app/get_all_widrow_single/:id",
    "WithdrawController.get_all_widrow_single"
  );
}).middleware(["loggedIn"]);
