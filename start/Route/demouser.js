"use strict";
const Route = use("Route");

// demouser related data
Route.post(
  "/app/create_new_demouser",
  "DemoUserController.create_new_demouser"
);

// middleware
Route.group(() => {
  Route.post(
    "/app/update_demouser",
    "DemoUserController.update_demouser"
  );
  Route.get(
    "/app/get_all_demouser_single/:id",
    "DemoUserController.get_all_demouser_single"
  );
}).middleware(["loggedIn"]);
