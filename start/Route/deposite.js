"use strict";
const Route = use("Route");

// deposite related data
Route.post(
  "/app/create_new_deposite",
  "DepositController.create_new_deposite"
);
// need middleware
Route.group(() => {
  Route.post(
    "/app/update_deposite",
    "DepositController.update_deposite"
  );
  Route.get(
    "/app/get_all_deposite",
    "DepositController.get_all_deposite"
  );
  Route.get(
    "/app/get_all_deposite_single/:id",
    "DepositController.get_all_deposite_single"
  );
}).middleware(["loggedIn"]);
