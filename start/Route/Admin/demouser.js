"use strict";
const Route = use("Route");

// demouser related data
Route.group(() => {
  Route.post(
    "/app/admin/create_new_demouser",
    "Admin/DemoUserController.create_new_demouser"
  );
  Route.post(
    "/app/admin/update_demouser",
    "Admin/DemoUserController.update_demouser"
  );
  Route.post(
    "/app/admin/delete_demouser",
    "Admin/DemoUserController.delete_demouser"
  );
  Route.get(
    "/app/admin/get_all_demouser",
    "Admin/DemoUserController.get_all_demouser"
  );
  Route.get(
    "/app/admin/get_all_demouser_single/:id",
    "Admin/DemoUserController.get_all_demouser_single"
  );
}).middleware(["admin"]);
