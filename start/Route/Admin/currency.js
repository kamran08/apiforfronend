"use strict";
const Route = use("Route");

// currency related data
Route.group(() => {
  Route.post(
    "/app/admin/create_new_currency",
    "Admin/CurrencyController.create_new_currency"
  );
  Route.post(
    "/app/admin/update_currency",
    "Admin/CurrencyController.update_currency"
  );
  Route.post(
    "/app/admin/delete_currency",
    "Admin/CurrencyController.delete_currency"
  );
  Route.get(
    "/app/admin/get_all_currency",
    "Admin/CurrencyController.get_all_currency"
  );
  Route.get(
    "/app/admin/get_all_currency_single/:id",
    "Admin/CurrencyController.get_all_currency_single"
  );
}).middleware(["admin"]);
