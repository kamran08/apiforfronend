"use strict";
const Route = use("Route");

// language related data
Route.group(() => {
  Route.post(
    "/app/admin/create_new_language",
    "Admin/LanguageController.create_new_language"
  );
  Route.post(
    "/app/admin/update_language",
    "Admin/LanguageController.update_language"
  );
  Route.post(
    "/app/admin/delete_language",
    "Admin/LanguageController.delete_language"
  );
  Route.get(
    "/app/admin/get_all_language",
    "Admin/LanguageController.get_all_language"
  );
  Route.get(
    "/app/admin/get_all_language_single/:id",
    "Admin/LanguageController.get_all_language_single"
  );
}).middleware(["admin"]);
