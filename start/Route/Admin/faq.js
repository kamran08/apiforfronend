"use strict";
const Route = use("Route");

// faq related data
Route.group(() => {
  Route.post("/app/admin/create_new_faq", "Admin/FaqController.create_new_faq");
  Route.post("/app/admin/update_faq", "Admin/FaqController.update_faq");
  Route.post("/app/admin/delete_faq", "Admin/FaqController.delete_faq");
  Route.get("/app/admin/get_all_faq", "Admin/FaqController.get_all_faq");
  Route.get(
    "/app/admin/get_all_faq_single/:id",
    "Admin/FaqController.get_all_faq_single"
  );
}).middleware(["admin"]);
